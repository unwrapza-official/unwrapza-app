import { useState } from "react";
import { db, auth } from "../../firebase";
import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    asin: "",
    affiliateLink: "",
    platform: "Amazon",
    image: "",
    images: "",
    tags: "",
    isFeatured: false,

    // NEW EU marketplace prices
    prices: {
      nl: "",
      de: "",
      fr: "",
      it: "",
      es: "",
      couk: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const mainImagePreview =
    formData.image?.trim().length > 5 ? formData.image : null;

  // Handle input change (supports nested prices)
  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    // Handle marketplace price change
    if (dataset.marketplace) {
      const market = dataset.marketplace;
      setFormData((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [market]: value,
        },
      }));
      return;
    }

    // Normal fields
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation
  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (!formData.image.trim()) return "Main image URL is required.";
    if (!formData.affiliateLink.trim()) return "Affiliate link is required.";

    // Validate the 6 EU prices
    for (const [market, value] of Object.entries(formData.prices)) {
      if (value === "" || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
        return `Invalid price for marketplace: ${market.toUpperCase()}`;
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in as an admin!");
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists() || snap.data().role !== "admin") {
      toast.error("Unauthorized access!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const errorMessage = validate();
    if (errorMessage) {
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        asin: formData.asin.trim(),
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

        // Save EU prices as numbers
        prices: {
          nl: parseFloat(formData.prices.nl),
          de: parseFloat(formData.prices.de),
          fr: parseFloat(formData.prices.fr),
          it: parseFloat(formData.prices.it),
          es: parseFloat(formData.prices.es),
          couk: parseFloat(formData.prices.couk),
        },

        pricesLastUpdated: {
          nl: serverTimestamp(),  
          de: serverTimestamp(),
          fr: serverTimestamp(),
          it: serverTimestamp(),
          es: serverTimestamp(),
          couk: serverTimestamp(),
        }
    });

      setSuccess(true);

      // Reset
      setFormData({
        name: "",
        description: "",
        category: "",
        asin: "",
        affiliateLink: "",
        platform: "Amazon",
        image: "",
        images: "",
        tags: "",
        isFeatured: false,
        prices: { nl: "", de: "", fr: "", it: "", es: "", couk: "" },
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product.");
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
          className="border p-2 rounded w-full"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
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

        {/* EU MARKETPLACE PRICES */}
        <div className="grid grid-cols-2 gap-2">
          {["nl", "de", "fr", "it", "es", "couk"].map((mkt) => (
            <input
              key={mkt}
              data-marketplace={mkt}
              placeholder={`Price (${mkt.toUpperCase()})`}
              value={formData.prices[mkt]}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        {/* AFFILIATE ID */}
        <input
          name="asin"
          placeholder="ASIN"
          value={formData.asin}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* AFFILIATE LINK */}
        <input
          name="affiliateLink"
          placeholder="Affiliate link"
          value={formData.affiliateLink}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* PLATFORM */}
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option>Amazon</option>
        </select>

        {/* MAIN IMAGE */}
        <input
          name="image"
          placeholder="Main image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

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
          placeholder="Extra images (comma separated)"
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

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#44A77D] text-white py-2 rounded-lg font-semibold hover:bg-[#3b936e]"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

        {success && <p className="text-green-600 text-center mt-2">✅ Product added!</p>}
      </form>
    </div>
  );
};

export default AdminPage;
