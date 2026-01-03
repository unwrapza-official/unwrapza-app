import { useNavigate } from "react-router-dom";
import { Heart, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

const CategoryProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);
  const BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "";

  const getCurrencySymbol = (currency) => {
    const symbols = { EUR: "€", GBP: "£", USD: "$", CAD: "C$", AUD: "A$" };
    return symbols[currency] || "";
  };

  const isLiked = wishlistIds.includes(product.product_id);
  const priceSymbol = getCurrencySymbol(product.currency);

  const toggleWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to save products");

    const ref = doc(db, "users", user.uid, "wishlist", productId);
    try {
      if (isLiked) {
        await deleteDoc(ref);
        setWishlistIds(prev => prev.filter(id => id !== productId));
      } else {
        await setDoc(ref, { addedAt: new Date() });
        setWishlistIds(prev => [...prev, productId]);
        toast.success("Saved to wishlist ❤️");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    const loadWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
      setWishlistIds(snap.docs.map(d => d.id));
    };
    loadWishlist();
  }, []);

  const handleClick = () => {
    fetch(`${BASE_URL}/api/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.product_id }),
    }).catch(() => {});
    navigate(`/product/${product.product_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        group cursor-pointer bg-white rounded-3xl border border-gray-100
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] bg-[#fafafa]">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.product_name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.product_id);
          }}
          className={`
            absolute top-3 right-3 p-2 rounded-full backdrop-blur
            ${isLiked ? "bg-red-500 text-white" : "bg-white/80 text-gray-400 hover:text-red-500"}
          `}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Merchant */}
        <span className="absolute bottom-0 md:bottom-3 left-3 text-[9px] font-bold uppercase tracking-widest bg-white/90 px-2 py-1 rounded-md line-clamp-1">
          {product.merchant}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1 group-hover:text-[#44A77D]">
          {product.product_name}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-[#44A77D]">
            {product.price
              ? `${priceSymbol}${product.price.toFixed(2)}`
              : "Unavailable"}
          </span>

          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-[#44A77D] group-hover:text-white transition">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductCard;
