import { addDoc, collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

const SearchProductCard = ({ product }) => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "";

  const getCurrencySymbol = (currency) => {
    const symbols = {
      EUR: "€", GBP: "£", USD: "$",
      CAD: "C$", AUD: "A$", JPY: "¥"
    };
    return symbols[currency] || "";
  };

  const isLiked = wishlistIds.includes(product.product_id);
  const priceSymbol = getCurrencySymbol(product.currency);

  const toggleWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to save wishlist!");

    const itemRef = doc(db, "users", user.uid, "wishlist", productId);
    const exists = wishlistIds.includes(productId);

    try {
      if (exists) {
        await deleteDoc(itemRef);
        setWishlistIds(prev => prev.filter(id => id !== productId));
      } else {
        await setDoc(itemRef, { addedAt: new Date() });
        setWishlistIds(prev => [...prev, productId]);
        toast.success("Added to wishlist", { icon: '❤️', duration: 1500 });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const loadWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = collection(db, "users", user.uid, "wishlist");
      const snap = await getDocs(ref);
      setWishlistIds(snap.docs.map(d => d.id));
    };
    loadWishlist();
  }, []);

  const handleClick = async () => {
    try {
      // Background tracking
      addDoc(collection(db, "clicks"), {
        productId: product.product_id,
        timeStamp: new Date(),
        merchant: product.merchant,
      });

      // Update LocalStorage
      const existing = JSON.parse(localStorage.getItem("recently_viewed")) || [];
      localStorage.setItem("recently_viewed", JSON.stringify([
        product.product_id,
        ...existing.filter(id => id !== product.product_id)
      ].slice(0, 20)));

      fetch(`${BASE_URL}/api/click`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.product_id }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      navigate(`/product/${product.product_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        group relative w-full bg-white 
        rounded-2xl border border-gray-100 shadow-sm
        hover:shadow-xl hover:border-[#44A77D]/20 hover:-translate-y-1
        transition-all duration-400 ease-out cursor-pointer 
        flex flex-row p-3 gap-4 sm:p-5 sm:gap-6
      "
    >
      {/* IMAGE CONTAINER */}
      <div
        className="
          relative w-[100px] h-[100px] sm:w-[160px] sm:h-[160px]
          bg-gradient-to-br from-gray-50 to-gray-100
          flex items-center justify-center 
          rounded-xl overflow-hidden flex-shrink-0
        "
      >
        <img
          src={product.images?.[0]}
          alt={product.product_name}
          className="
            w-4/5 h-4/5 object-contain 
            group-hover:scale-110 transition-transform duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow min-w-0 py-1">
        <div className="flex-grow">
          {/* MERCHANT BADGE */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600  text-[10px] font-bold uppercase tracking-wider rounded-full">
              {product.merchant}
            </span>
          </div>

          <h3 className="
            text-base sm:text-xl font-bold text-gray-800
            leading-tight line-clamp-2 group-hover:text-[#44A77D] transition-colors
          ">
            {product.product_name}
          </h3>

          <p
          className="hidden sm:block text-sm text-gray-500 mt-2 font-light leading-snug overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </p>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium uppercase">Price</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#44A77D] leading-none">
              {product.price 
                ? `${priceSymbol}${product.price.toFixed(2)}` 
                : <span className="text-sm font-normal text-gray-300">Unavailable</span>
              }
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* FAVORITE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.product_id);
              }}
              className={`
                p-2.5 rounded-xl border transition-all duration-300
                ${isLiked 
                  ? "bg-red-50 border-red-100 shadow-inner" 
                  : "bg-white border-gray-200 hover:border-red-200 hover:bg-red-50"
                }
              `}
            >
              <Heart 
                className={`w-5 h-5 transition-transform duration-300 ${isLiked ? "text-red-500 fill-red-500 scale-110" : "text-gray-400 group-hover:scale-110"}`} 
              />
            </button>

            {/* ACTION BUTTON */}
            <button
              className="
                hidden sm:flex items-center gap-2
                bg-[#44A77D] text-white px-5 py-2.5
                rounded-xl font-semibold text-sm
                hover:bg-[#388e68] shadow-md shadow-[#44A77D]/20
                transition-all active:scale-95
              "
            >
              Details
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductCard;