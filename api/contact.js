import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, topic, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: "Missing fields" });

  const key = email.toLowerCase();

  // 🔐 Count past 24h
  const { count, error: countError } = await supabase
    .from("contact_limit")
    .select("*", { count: "exact", head: true })
    .eq("email", key)
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (countError) {
    console.error(countError);
    return res.status(500).json({ error: "Rate limit lookup failed" });
  }

  if (count >= 3) {
    return res.status(429).json({
      error: "You have reached the daily message limit. Please try again tomorrow."
    });
  }

  // 🧾 log attempt
  await supabase.from("contact_limit").insert({ email: key });

  try {
    await resend.emails.send({
      from: "Unwrapza <noreply@notifications.unwrapza.com>",
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Contact form: ${topic || "General"}`,
      html: `
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic || "-"}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
