import { addDoc, collection, increment, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Heart } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserCountry } from "../../hooks/useUserCountry"; 
import { supabase } from "../../supabaseClient";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);

  const {marketplace, currency, loadingCountry} = useUserCountry();

  const getCurrencySymbol = (currency) => {
    switch(currency){
      case "EUR": return "€";
      case "GBP": return "£";
      default: return "€";
    }
  }

  const displayPrice = product.price ?? null;

  const priceSymbol = getCurrencySymbol(currency);

  const toggleWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to save products to your favorites!");

    const itemRef = doc(db, "users", user.uid, "wishlist", productId);

    const exists = wishlistIds.includes(productId);

    if (exists) {
      await deleteDoc(itemRef);
      setWishlistIds(prev => prev.filter(id => id !== productId));
      toast.success("Removed from wishlist") // UI direct updaten
    } else {
      await setDoc(itemRef, {
        addedAt: new Date()
      },
       toast.success("Added to from wishlist"));
      setWishlistIds(prev => [...prev, productId]); // UI direct updaten
    }
  };

  useEffect(() => {
    const loadWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = collection(db, "users", user.uid, "wishlist");
      const snap = await getDocs(ref);

      const ids = snap.docs.map(d => d.id);
      setWishlistIds(ids);
    };

    loadWishlist();
  }, []);

  const handleClick = async () => {
    try {
      // 1. Kliklog naar Firestore (dit mag blijven)
      await addDoc(collection(db, "clicks"), {
        productId: product.product_id,
        timeStamp: new Date(),
        platform: product.platform,
      });

      // 2. ClickCount verhogen in SUPABASE (niet meer in Firestore!)
      await supabase
        .from("products")
        .update({ click_count: (product.click_count ?? 0) + 1 })
        .eq("id", product.product_id);

    } catch (error) {
      console.error("Error tracking click:", error);
    } finally {
      // 3. Navigeren MOET ALTIJD doorgaan
      navigate(`/product/${product.product_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col items-center rounded-1xl bg-white hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#F5FAF7] flex items-center justify-center">
        <img
          src={product.images?.[0]}
          alt={product.product_name}
          className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* HEART BUTTON RECHTSBOVEN */}
        <button
          className="absolute top-3 right-3 z-20 
                     bg-white/90 backdrop-blur-sm rounded-full p-2 
                     shadow-sm hover:bg-white transition"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.product_id);
          }}
        >
          <Heart
            className={`w-5 h-5 transition-all
              ${wishlistIds.includes(product.product_id)
                ? "text-red-500 fill-red-500"
                : "text-gray-600 hover:text-red-500"}`}
          />
        </button>
      </div>

      {/* TEXT SECTION */}
      <div className="w-full flex flex-col text-start mt-4 relative">
        <p className="text-sm text-gray-400">{product.platform}</p>
        <h3 className="mt-1 font-bold text-sm text-gray-800 text-base leading-snug font-poppins whitespace-nowrap overflow-hidden">
          {product.product_name}
        </h3>
        <h2 className="mt-2 font-bold text-[#44A77D] text-lg font-dmsans">
          {
            loadingCountry
            ? "loading...."
            : displayPrice !== null
            ? `${priceSymbol}${displayPrice?.toFixed(2)}`
            : "Price unavailable"
          }
        </h2>
      </div>
    </div>
);

};

export default ProductCard;