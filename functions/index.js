require("dotenv").config();

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");
const OpenAI = require("openai");

admin.initializeApp();
const db = admin.firestore();

setGlobalOptions({ maxInstances: 10 });

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      const {
        relative,
        age,
        purpose,
        type,
        context,
        minPrice,
        maxPrice,
      } = req.body || {};

      let query = db.collection("products");

      if (typeof minPrice === "number")
        query = query.where("price", ">=", minPrice);

      if (typeof maxPrice === "number")
        query = query.where("price", "<=", maxPrice);

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
