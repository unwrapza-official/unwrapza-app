import { useState } from "react";
import { db } from "../../firebase";
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
    images: "",
    tags: "",
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Preview main image
  const mainImagePreview = formData.image?.trim().length > 5 ? formData.image : null;

  // Handle all changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form validation
  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (!formData.image.trim()) return "Main image URL is required.";
    if (!formData.affiliateLink.trim()) return "Affiliate link is required.";
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0)
      return "Price must be a valid number greater than 0.";

    if (
      formData.image &&
      !formData.image.startsWith("http")
    )
      return "Main image URL must start with http or https.";

    if (
      formData.affiliateLink &&
      !formData.affiliateLink.startsWith("http")
    )
      return "Affiliate link must start with http or https.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const errorMessage = validate();
    if (errorMessage) {
      alert(errorMessage);
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        currency: formData.currency,
        affiliateId: formData.affiliateId.trim(),
        affiliateLink: formData.affiliateLink.trim(),
        platform: formData.platform,
        image: formData.image.trim(),
        images: formData.images
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url !== ""),
        isFeatured: formData.isFeatured,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag !== ""),
        clickCount: 0,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      // Reset form
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
        images: "",
        tags: "",
        isFeatured: false,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Er ging iets mis bij het toevoegen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Unwrapza Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg space-y-4"
      >
        {/* NAME */}
        <input
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full h-24"
        />

        {/* CATEGORY */}
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
          <option>For Kids</option>
        </select>

        {/* PRICE + CURRENCY */}
        <div className="flex gap-2">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="currency"
            placeholder="EUR / USD / etc."
            value={formData.currency}
            onChange={handleChange}
            className="border p-2 rounded w-24"
          />
        </div>

        {/* AFFILIATE ID */}
        <input
          name="affiliateId"
          placeholder="Affiliate ID (EAN)"
          value={formData.affiliateId}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* AFFILIATE LINK */}
        <input
          name="affiliateLink"
          placeholder="Affiliate link (Bol/Amazon)"
          value={formData.affiliateLink}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        {/* PLATFORM */}
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

        {/* MAIN IMAGE */}
        <input
          name="image"
          placeholder="Main image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        {/* IMAGE PREVIEW */}
        {mainImagePreview && (
          <img
            src={mainImagePreview}
            alt="preview"
            className="w-32 h-32 object-contain mx-auto rounded-lg shadow-md mt-2"
          />
        )}

        {/* EXTRA IMAGES */}
        <input
          name="images"
          placeholder="Extra image URLs (comma separated)"
          value={formData.images}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* TAGS */}
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* FEATURED */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <span>Featured product</span>
        </label>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#44A77D] text-white py-2 rounded-lg font-semibold hover:bg-[#3b936e] transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

        {success && (
          <p className="text-green-600 font-semibold text-center mt-2">
            ✅ Product added successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminPage;
