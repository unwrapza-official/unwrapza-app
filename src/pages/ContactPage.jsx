import { useState } from "react";
// Optional: npm install lucide-react
import { Send, Mail, HelpCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { useUserCountry } from "../hooks/useUserCountry";

const ContactPage = () => {
  const { ip } = useUserCountry();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
    ip: ip || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const BASE_API = import.meta.env.DEV ? "http://localhost:3000" : "";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch(`${BASE_API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if(res.status === 429){
        setError("You’ve reached the daily message limit. Try again tomorrow.");
      }

      if (!res.ok) {
        throw new Error("Something went wrong while sending your message.");
      }

      setSuccess(true);
      setForm({
        ip: "",
        name: "",
        email: "",
        topic: "general",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 ">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-3xl font-bold mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Questions about a product, pricing issues, or something not working as expected? 
            Send us a message and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Info & FAQ */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
              <h3 className="flex items-center text-gray-900 font-semibold mb-6 text-lg">
                <HelpCircle className="w-5 h-5 mr-3 text-[#44A77D]" />
                Good to know
              </h3>
              <ul className="space-y-5 text-sm md:text-base text-gray-600">
                <li className="flex gap-4">
                  <span className="text-[#44A77D] font-bold text-xl leading-none">•</span>
                  <span>We link to external stores to complete your purchases.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#44A77D] font-bold text-xl leading-none">•</span>
                  <span>Prices and availability are subject to change.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#44A77D] font-bold text-xl leading-none">•</span>
                  <span>Unwrapza is completely free to use for everyone.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-[#44A77D]/5 border border-[#44A77D]/10 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#44A77D]">Direct Support</span>
              <div className="flex items-center gap-3 text-gray-800">
                <Mail className="w-5 h-5 text-[#44A77D]" />
                <span className="font-medium">contact@unwrapza.com</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-8">
            {success && (
              <div className="flex items-center gap-3 border border-green-200 bg-green-50 text-green-700 rounded-xl p-5 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <CheckCircle2 className="w-6 h-6" />
                <div>
                    <p className="font-bold">Message received!</p>
                    <p className="text-sm opacity-90">We've received your request and will reach out shortly.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-3 border border-red-200 bg-red-50 text-red-700 rounded-xl p-5 mb-8">
                <AlertCircle className="w-6 h-6" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/40 rounded-3xl p-8 md:p-12 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#44A77D]/20 focus:border-[#44A77D] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#44A77D]/20 focus:border-[#44A77D] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Topic
                </label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#44A77D]/20 focus:border-[#44A77D] transition-all appearance-none cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="pricing">Pricing & Billing</option>
                  <option value="technical">Technical Issue</option>
                  <option value="business">Partnership / Business</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#44A77D]/20 focus:border-[#44A77D] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto min-w-[200px] bg-[#44A77D] cursor-pointer text-white px-5 py-3 rounded-xl font-bold hover:bg-[#368664] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:transform-none shadow-lg shadow-[#44A77D]/25"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;