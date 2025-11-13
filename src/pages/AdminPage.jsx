import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Tech Gifts",
    price: "",
    currency: "EUR",
    affiliateId: "",
    affiliateLink: "",
    platform: "Bol.com",
    image: "",
    tags: "",
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        currency: formData.currency,
        affiliateId: formData.affiliateId,
        affiliateLink: formData.affiliateLink,
        platform: formData.platform,
        image: formData.image,
        isFeatured: formData.isFeatured,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag !== ""),
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        category: "Tech Gifts",
        price: "",
        currency: "EUR",
        affiliateId: "",
        affiliateLink: "",
        platform: "Bol.com",
        image: "",
        tags: "",
        isFeatured: false,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Er ging iets mis bij het toevoegen!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Unwrapza Admin</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <input
          name="name"
          placeholder="Productnaam"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Beschrijving"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full h-24"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option>For Her</option>
          <option>For Him</option>
          <option>Tech Gifts</option>
          <option>Home & Living</option>
          <option>Funny Gifts</option>
          <option>Luxury Picks</option>
          <option>Gadgets</option>
          <option>Personalized</option>
          <option>Gift Cards</option>
        </select>

        <div className="flex gap-2">
          <input
            name="price"
            type="number"
            placeholder="Prijs"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="currency"
            placeholder="Valuta (bv. EUR)"
            value={formData.currency}
            onChange={handleChange}
            className="border p-2 rounded w-24"
          />
        </div>

        <input
          name="affiliateId"
          placeholder="Affiliate ID (EAN-code)"
          value={formData.affiliateId}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="affiliateLink"
          placeholder="Affiliate-link (Amazon/Bol)"
          value={formData.affiliateLink}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option>Bol.com</option>
          <option>Amazon</option>
          <option>Coolblue</option>
          <option>AliExpress</option>
        </select>

        <input
          name="image"
          placeholder="Afbeeldings-URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        <input
          name="tags"
          placeholder="Tags (komma-gescheiden, bijv. for him, tech, music)"
          value={formData.tags}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <span>Uitgelicht product</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Toevoegen..." : "Product toevoegen"}
        </button>

        {success && (
          <p className="text-green-600 font-semibold text-center">
            ✅ Product succesvol toegevoegd!
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminPage;
