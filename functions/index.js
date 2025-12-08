require("dotenv").config();

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const { Resend } = require("resend");

const admin = require("firebase-admin");
const OpenAI = require("openai");

admin.initializeApp();
const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

setGlobalOptions({ maxInstances: 10 });

// OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});

// ----- Helper: API spam prevention ----

function getClientId(req) {
  const uid = req.headers["x-user-id"];
  if (uid) return `user_${uid}`;

  const ip = req.headers["x-forwarded-for"] || req.ip || "unknown";
  return `ip_${ip.replace(/[^a-zA-Z0-9]/g, "_")}`;
}

// ----- Helper: embedding -----
async function embedText(text) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// ----- Helper: cosine similarity -----
function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return 0;

  let dot = 0,
    normA = 0,
    normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (!normA || !normB) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// =======================================================
//  🚀 ADDITION: SEND VERIFICATION CODE
// =======================================================

exports.sendVerificationCode = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Generate 6 digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Save code in Firestore
      try {
        await db.collection("emailVerification").add({
          email,
          code,
          expiresAt: Date.now() + 10 * 60 * 1000,
          used: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Write success");
      } catch (err) {
        console.error("Firestore WRITE ERROR:", err);
      }

      // Send code via email
      await resend.emails.send({
        from: "Unwrapza <onboarding@resend.dev>",
        to: email,
        subject: "Your Unwrapza verification code",
        html: `
          <p>Your verification code:</p>
          <h1 style="font-size: 32px; letter-spacing:3px;">${code}</h1>
          <p>This code expires in 10 minutes.</p>
        `,
      });

      return res.status(200).json({ success: true });

    } catch (err) {
      console.error("Error sending code:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });
});

// =======================================================
//  🚀 ADDITION: VERIFY CODE + CREATE ACCOUNT
// =======================================================

exports.verifyCode = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email, password, username, code } = req.body;

      if (!email || !password || !username || !code) {
        return res.status(400).json({ error: "Missing fields" });
      }

      // Lookup verification code
      const snap = await db.collection("emailVerification")
        .where("email", "==", email)
        .where("code", "==", code)
        .where("used", "==", false)
        .get();

      if (snap.empty) {
        return res.status(400).json({ error: "Invalid or expired verification code" });
      }

      const docRef = snap.docs[0].ref;
      const data = snap.docs[0].data();

      // Expired?
      if (Date.now() > data.expiresAt) {
        return res.status(400).json({ error: "Verification code expired" });
      }

      // Mark code as used
      await docRef.update({ used: true });

      // Create Firebase Auth user
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: username,
      });

      // Save user info
      await db.collection("users").doc(userRecord.uid).set({
        uid: userRecord.uid,
        email,
        username,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        verified: true,
      });

      return res.status(200).json({ success: true });

    } catch (err) {
      console.error("Error verifying code:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });
});

// ---------- 1. Product embeddings genereren ----------
exports.generateProductEmbeddings = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("products").get();

      if (snapshot.empty) return res.status(200).send("No products found.");

      let updatedCount = 0;

      for (const doc of snapshot.docs) {
        const data = doc.data();

        const text = `
          Name: ${data.name || ""}
          Description: ${data.description || ""}
          Type: ${data.type || ""}
          Category: ${data.category || ""}
        `;

        if (!text.trim()) continue;

        const embedding = await embedText(text);

        await doc.ref.update({ embedding });
        updatedCount++;
      }

      return res
        .status(200)
        .send(`Done. Updated embeddings for ${updatedCount} products.`);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error generating embeddings.");
    }
  });
});

// ---------- 2. GiftFinder ----------
exports.giftFinder = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const clientId = getClientId(req);
      const usageRef = db.collection("usage").doc(clientId);

      const now = Date.now();
      const oneHourAgo = now - 60 * 60 * 1000;
      const oneDayAgo = now - 24 * 60 * 60 * 1000;

      const usageSnap = await usageRef.get();
      let usage = usageSnap.exists? usageSnap.data().requests || [] : [];

      const lastHour = usage.filter(t => t > oneHourAgo);
      const lastDay = usage.filter(t => t > oneDayAgo);
      const lastRequest = usage.length > 0 ? usage[usage.length - 1] : null;

      const cooldown = 10 * 1000;
      const hourlyLimit = 20;
      const dailyLimit = 50;

      if(lastRequest && now - lastRequest < cooldown){
        return res.status(429).json({
          error: "too fast! Wait a couple seconds" 
        })
      }

      if(lastHour.length >= hourlyLimit){
         return res.status(429).json({
          error: "Too many requests. Wait for an hour before trying again."
        });
      }

       // Daily limit
      if (lastDay.length >= dailyLimit) {
        return res.status(429).json({
          error: "Daily limit reached."
        });
      }

      usage = lastDay;
      usage.push(now);
      await usageRef.set({requests: usage});

      const {
        relative,
        age,
        purpose,
        type,
        context,
        minPrice,
        maxPrice,
        marketplace
      } = req.body || {};

      let query = db.collection("products");

      const priceField = `prices.${marketplace}`;

      if (typeof minPrice === "number" && !isNaN(minPrice))
        query = query.where(priceField, ">=", minPrice);

      if (typeof maxPrice === "number" && !isNaN(minPrice))
        query = query.where(priceField, "<=", maxPrice);

      const snap = await query.get();
      if (snap.empty) return res.status(200).json({ productIds: [] });

      const products = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((p) => Array.isArray(p.embedding));

      if (products.length === 0)
        return res.status(200).json({ productIds: [] });

      const userText = `
        Gift for: ${relative}
        Age: ${age}
        Purpose: ${purpose}
        Type: ${type}
        Context: ${context}
      `;

      const userEmbedding = await embedText(userText);

      const scored = products.map((p) => ({
        id: p.id,
        score: cosineSimilarity(userEmbedding, p.embedding),
      }));

      scored.sort((a, b) => b.score - a.score);

      const top = scored.slice(0, 10).map((x) => x.id);

      return res.status(200).json({ productIds: top });

    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
  });
});
