require("dotenv").config();

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const cors = require("cors")({ origin: true });
const { Resend } = require("resend");
const admin = require("firebase-admin");
const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");

admin.initializeApp();
const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

setGlobalOptions({ maxInstances: 10 });

// OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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
  return  response.data[0].embedding;
}

async function embedBatch(texts) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  return response.data.map(d => d.embedding);
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
      const { data: products, error } = await supabase
        .from("products")
        .select("product_id, product_name, description, categories")
        .is("embedding", null)
        .limit(100);

      if (error) throw error;

      if (!products || products.length === 0) {
        return res.status(200).json({ message: "No products to embed" });
      }

      // 1️⃣ Bouw embedding-teksten
      const texts = products.map(p =>
        `Name: ${p.product_name || ""}
Description: ${p.description || ""}
Categories: ${p.categories || ""}`.trim()
      );

      // 2️⃣ 1 OpenAI call → 100 embeddings
      const embeddings = await embedBatch(texts);

      // 3️⃣ Bulk payload
      const updates = products.map((p, i) => ({
        product_id: p.product_id,
        embedding: embeddings[i],
      }));

      // 4️⃣ 1 bulk upsert
      const { error: updateError } = await supabase
        .from("products")
        .upsert(updates, { onConflict: "product_id" });

      if (updateError) throw updateError;

      return res.status(200).json({
        message: `Embedded ${products.length} products successfully`,
      });

    } catch (err) {
      console.error("Error generating embeddings:", err);
      return res.status(500).json({ error: "Server error" });
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
      } = req.body || {};

      const MAX_ALLOWED_PRICE = 1500;

      const safeMinPrice = minPrice != null ? Math.max(Number(minPrice), 0) : null;
      const safeMaxPrice = maxPrice != null ? Math.min(Number(maxPrice), MAX_ALLOWED_PRICE) : null;
      
      const userText = `Gift for ${relative || "someone"}, age ${age || "unknown"}, purpose: ${purpose || "unspecified"}, type: ${type || "unspecified"}, context: ${context || "unspecified"}. Budget between ${minPrice || "any"} and ${maxPrice || "any"} euros.`.trim();
      
      const userEmbedding = await embedText(userText);

      const {data, error} = await supabase.rpc("gift_match_products",{
        query_embedding: userEmbedding,
        min_price: safeMinPrice,
        max_price: safeMaxPrice,
        currency_filter: "EUR",
        limit_count: 10,
      });

      if (error) {
        console.error("Supabase AI error:", error);
        return res.status(500).json({ error: "AI search failed" });
      }

      const productIds = data.map(row => row.product_id);
      
      return res.status(200).json({ productIds });

      
    } catch (err) {
      console.error("GiftFinder error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });
});
