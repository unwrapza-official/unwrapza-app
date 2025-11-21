/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

require("dotenv").config();

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
const OpenAI = require("openai");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

setGlobalOptions({ maxInstances: 10 });

// OpenAI client met goedkope modellen
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---------- Helpers ----------

// 1) Embedding helper (goedkoop model)
async function embedText(text) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding; // array van numbers
}

// 2) Cosine similarity
function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (!normA || !normB) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ---------- 1) Embedding generator voor producten ----------
// LET OP: call je zelf 1x (of af en toe) om je producten te voorzien van embeddings
exports.generateProductEmbeddings = onRequest(async (req, res) => {
  try {
    logger.info("Starting product embedding generation");

    const snapshot = await db.collection("products").get();

    if (snapshot.empty) {
      return res.status(200).send("No products found.");
    }

    let updatedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();

      // Pas dit aan naar jouw echte velden
      const name = data.name || "";
      const description = data.description || "";
      const type = data.type || "";
      const category = data.category || "";

      const text = `
        Name: ${name}
        Description: ${description}
        Type: ${type}
        Category: ${category}
      `;

      if (!text.trim()) {
        logger.warn(`Skipping product ${doc.id}, empty text`);
        continue;
      }

      logger.info(`Creating embedding for product ${doc.id}`);

      const embedding = await embedText(text);

      await doc.ref.update({
        embedding, // array van numbers
      });

      updatedCount++;
    }

    return res
      .status(200)
      .send(`Done. Updated embeddings for ${updatedCount} products.`);

  } catch (err) {
    console.error("generateProductEmbeddings error:", err);
    return res.status(500).send("Error generating embeddings.");
  }
});

// ---------- 2) Goedkope AI giftFinder ----------
// Geen GPT-call per request, alleen 1 embedding + cosine similarity
exports.giftFinder = onRequest(async (req, res) => {
  try {
    logger.info("giftFinder request received");

    const form = req.body || {};

    const {
      relative,
      age,
      purpose,
      type,
      context,
      minPrice,
      maxPrice,
    } = form;

    // 1) Basic Firestore filtering (voor zover je velden hebt)
    let query = db.collection("products");

    // Prijsfilter (als je 'price' veld hebt in Firestore)
    if (typeof minPrice === "number") {
      query = query.where("price", ">=", minPrice);
    }
    if (typeof maxPrice === "number") {
      query = query.where("price", "<=", maxPrice);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.status(200).json({ productIds: [] });
    }

    const products = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!Array.isArray(data.embedding)) return; // alleen producten met embedding
      products.push({ id: doc.id, ...data });
    });

    if (products.length === 0) {
      return res.status(200).json({ productIds: [] });
    }

    // 2) Embedding maken van user input (1 goedkope call)
    const userText = `
      Gift for: ${relative}
      Age: ${age}
      Purpose: ${purpose}
      Type: ${type}
      Context: ${context}
    `;

    const userEmbedding = await embedText(userText);

    // 3) Cosine similarity berekenen t.o.v. alle product embeddings
    const scored = products.map((p) => ({
      id: p.id,
      score: cosineSimilarity(userEmbedding, p.embedding),
    }));

    // 4) Sorteren op score en top N teruggeven
    scored.sort((a, b) => b.score - a.score);

    const TOP_N = 10;
    const top = scored.slice(0, TOP_N).map((p) => p.id);

    return res.status(200).json({
      productIds: top,
    });
  } catch (err) {
    console.error("giftFinder error:", err);
    return res.status(500).send("Server error");
  }
});