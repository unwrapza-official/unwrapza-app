import { createClient } from "@supabase/supabase-js";
import {rateLimit } from "../lib/rateLimit.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress; 
  
    if(!rateLimit(ip, 20, 60000)) {
      return res.status(429).json({ error: "Too many requests" });
    }
  
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "productId required" });
  }

  // ✅ atomische increment
  const { error } = await supabase.rpc("increment_click_count", {
    pid: productId,
  });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to increment click" });
  }

  return res.status(200).json({ success: true });
}
