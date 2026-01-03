import { createClient } from "@supabase/supabase-js";
import {rateLimit } from "../lib/rateLimit.js";

/**
 * Server-only Supabase client
 * ❗ NOOIT importeren in frontend
 */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// --------------------
// Hard limits (security)
// --------------------
const DEFAULT_LIMIT = 15;
const MAX_LIMIT = 24;
const MAX_PAGE = 50; // max 50 * limit = 1200 items max bereikbaar

export default async function handler(req, res) {

  // ✅ CORS headers TIJDELIJK voor localhost frontend
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress; 

  if(!rateLimit(ip, 60, 60000)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Alleen GET
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const {
      type = "trending",
      limit = DEFAULT_LIMIT,
      page = 0,

      // search
      q,

      // category
      category,

      // budget
      min,
      max,

      // ids (recently viewed, wishlist)
      ids,
    } = req.query;

    const safeLimit = Math.min(Number(limit) || DEFAULT_LIMIT, MAX_LIMIT);
    const safePage = Math.min(Number(page) || 0, MAX_PAGE);
    const from = safePage * safeLimit;
    const to = from + safeLimit - 1;

    // ❗ Altijd expliciete velden (NO select *)
    let query = supabase
      .from("products")
      .select(
        `
        product_id,
        product_name,
        price,
        currency,
        affiliate_url,
        description,
        images,
        merchant,
        click_count,
        categories,
        platform  
      `
      )
      .eq("currency", "EUR");

    // --------------------
    // Routing op intent
    // --------------------
    switch (type) {
      // -------- TRENDING --------
      case "trending":
        query = query.order("click_count", { ascending: false });
        break;

      // -------- CATEGORY --------
      case "category":
        if (!category) {
          return res.status(400).json({ error: "category is required" });
        }
        query = query
          .contains("categories", [category])
          .order("click_count", { ascending: false });
        break;

      // -------- SEARCH --------
      case "search":
        if (!q) {
          return res.status(400).json({ error: "search query is required" });
        }
        query = query
          .ilike("product_name", `%${q}%`)
          .order("click_count", { ascending: false });
        break;

      // -------- BUDGET ROW --------
      case "budget": {
        const minPrice = Number(min);
        const maxPrice = Number(max);

        if (isNaN(minPrice)) {
          return res.status(400).json({ error: "min price is required" });
        }

        query = query
          .gte("price", minPrice)
          .order("click_count", { ascending: false });

        if (!isNaN(maxPrice)) {
          query = query.lte("price", maxPrice);
        }
        break;
      }

      // -------- IDS (wishlist / recently viewed) --------
      case "ids": {
        if (!ids) {
          return res.status(200).json({ products: [] });
        }

        const idList = ids
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
          .slice(0, MAX_LIMIT);

        if (idList.length === 0) {
          return res.status(200).json({ products: [] });
        }

        query = query.in("product_id", idList);
        break;
      }

      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    // --------------------
    // Execute query
    // --------------------
    const { data, error } = await query.range(from, to);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database query failed" });
    }

    // --------------------
    // Caching (zeer belangrijk)
    // --------------------
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );

    return res.status(200).json({
      page: safePage,
      limit: safeLimit,
      count: data.length,
      products: data,
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
