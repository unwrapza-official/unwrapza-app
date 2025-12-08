import { addDoc, collection, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserCountry } from "../../hooks/useUserCountry";

const SearchProductCard = ({ product }) => {
  const [wishlistIds, setWishlistIds] = useState([]);

  const navigate = useNavigate(); 
  
  const {marketplace, currency, loadingCountry} = useUserCountry();

  const getCurrencySymbol = (currency) => {
    switch(currency){
      case "EUR": return "€";
      case "GBP": return "£";
      default: return "€";
    }
  }

  const displayPrice = product.prices?.[marketplace] ?? product.prices?.de ?? null;

  const priceSymbol = getCurrencySymbol(currency);

  const toggleWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to save products to your favorites!");

    const itemRef = doc(db, "users", user.uid, "wishlist", productId);

    const exists = wishlistIds.includes(productId);

    if (exists) {
      await deleteDoc(itemRef);
      setWishlistIds(prev => prev.filter(id => id !== productId)); // UI direct updaten
    } else {
      await setDoc(itemRef, {
        addedAt: new Date()
      });
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
      await addDoc(collection(db, "clicks"), {
        productId: product.id,
        timeStamp: new Date(),
        platform: product.platform,
      });
      const productRef = doc(db, "products", product.id); 
      await updateDoc(productRef, {
        clickCount: increment(1),  
      })

      navigate(`/product/${product.id}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        w-full bg-white rounded-xl shadow-sm 
        hover:shadow-md hover:-translate-y-[1px]
        transition-all duration-300 cursor-pointer group

        flex flex-row p-3 gap-3
        sm:p-4 sm:gap-5 sm:flex-row
      "
    >

      {/* IMAGE (fixed size so layout never breaks) */}
      <div
        className="
          w-[90px] h-[90px] 
          sm:w-[140px] sm:h-[140px]
          bg-[#F5FAF7] flex items-center justify-center 
          rounded-lg overflow-hidden
          flex-shrink-0
        "
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-5/6 h-5/6 object-contain 
            group-hover:scale-105 transition-transform duration-300
          "
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col flex-grow justify-between">

        {/* TOP TEXT */}
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            {product.platform || "Unwrapza"}
          </p>

          {/* PRODUCT NAME */}
          <h3
            className="
              text-sm sm:text-lg 
              font-semibold text-gray-900
              mt-0.5 leading-snug
              line-clamp-2 sm:line-clamp-2
            "
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {product.name}
          </h3>

          {/* DESCRIPTION — force 2-line clamp ALWAYS */}
          <p
            className="
              hidden sm:block text-sm text-gray-500 mt-1 
              line-clamp-2
            "
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {product.description || ""}
          </p>
        </div>

        {/* BOTTOM ROW */}
        <div
          className="
            mt-2 flex items-center justify-between
            sm:mt-3
          "
        >
          {/* PRICE */}
          <h2 className="text-lg sm:text-xl font-bold text-[#44A77D]">
            {loadingCountry ? "loading...." : displayPrice !== null ? `${priceSymbol}${displayPrice?.toFixed(2)}` : "Price unavailable"}
          </h2>

          {/* BUTTONS */}
          <div className="flex items-center gap-2">

            {/* HEART */}
            <button
              className="
                p-1.5 sm:p-2 rounded-full border border-gray-300 
                hover:bg-gray-100 transition shadow-sm
              "
              onClick={(e) => {
                e.stopPropagation()
                toggleWishlist(product.id)
               }
              }
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlistIds.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
            </button>

            {/* VIEW BUTTON */}
            <button
              className="
                bg-[#44A77D] text-white 
                px-3 py-1.5 sm:px-4 sm:py-2 
                text-xs sm:text-sm
                rounded-md font-medium hover:bg-[#3d946f] transition
              "
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              View
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchProductCard;
