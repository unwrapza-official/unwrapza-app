import { addDoc, collection, updateDoc, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Heart } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);
  const API_BASE = import.meta.env.DEV ? "http://localhost:3000" : "";

  const getCurrencySymbol = (currency) => {
    const symbols = { EUR: "€", GBP: "£", USD: "$", CAD: "C$", AUD: "A$", JPY: "¥" };
    return symbols[currency] || "";
  };

  const displayPrice = product.price ?? null;
  const priceSymbol = getCurrencySymbol(product.currency);

  const toggleWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to save wishlist!");

    const itemRef = doc(db, "users", user.uid, "wishlist", productId);
    const exists = wishlistIds.includes(productId);

    if (exists) {
      await deleteDoc(itemRef);
      setWishlistIds(prev => prev.filter(id => id !== productId));
      toast.success("Removed from wishlist");
    } else {
      await setDoc(itemRef, { addedAt: new Date() });
      setWishlistIds(prev => [...prev, productId]);
      toast.success("Added to wishlist");
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
      await addDoc(collection(db, "clicks"), {
        productId: product.product_id,
        timeStamp: new Date(),
        platform: product.platform,
        merchant: product.merchant,
      });

      fetch(`${API_BASE}/api/click`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.product_id }),
      }).catch(() => {});
      
      // Recent viewed logic...
      navigate(`/product/${product.product_id}`);
    } catch (error) {
      console.error("Error:", error);
      navigate(`/product/${product.product_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col w-full bg-white transition-all duration-500 cursor-pointer"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-[#F9F9F9] border border-gray-50 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gray-200 group-hover:-translate-y-1">
        
        {/* De Afbeelding */}
        <img
          src={product.images?.[0]}
          alt={product.product_name}
          className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
        />

        {/* WISHLIST BUTTON - Nu met een mooiere schaduw en blur */}
        <button
          className="absolute top-4 right-4 z-20 bg-white/70 backdrop-blur-md rounded-full p-2.5 shadow-sm border border-white/50 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-90"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.product_id);
          }}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              wishlistIds.includes(product.product_id)
                ? "text-red-500 fill-red-500"
                : "text-gray-400 group-hover:text-red-400"
            }`}
          />
        </button>
      </div>

      {/* TEXT SECTION */}
      <div className="mt-5 px-1">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <p className="text-[10px] font-black text-[#44A77D] uppercase tracking-[0.15em] mb-1">
              {product.merchant}
            </p>
            <h3 className="font-bold text-gray-800 text-[15px] leading-tight line-clamp-2 transition-colors group-hover:text-black">
              {product.product_name}
            </h3>
          </div>
        </div>

        {/* PRIJS & EXTRA'S */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#44A77D] font-dmsans">
              {!displayPrice ? "..." : `${priceSymbol}${displayPrice?.toFixed(2)}`}
            </span>
          </div>
          
          {/* Subtiel pijltje dat verschijnt op hover */}
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <span className="text-gray-400 text-sm">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;