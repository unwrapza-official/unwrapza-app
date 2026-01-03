import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const WishlistCard = ({ product, onRemoved }) => {
  const navigate = useNavigate();

  const getCurrencySymbol = (currency) => {
    const symbols = { EUR: "€", GBP: "£", USD: "$", CAD: "C$", AUD: "A$", JPY: "¥" };
    return symbols[currency] || "";
  };

  const displayPrice = product.price ?? null;
  const priceSymbol = getCurrencySymbol(product.currency);

  const removeFromWishlist = async (e) => {
    e.stopPropagation(); // Voorkom dat de navigatie afgaat
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to manage your wishlist!");

    try {
      const itemRef = doc(db, "users", user.uid, "wishlist", product.product_id);
      await deleteDoc(itemRef);
      toast.success("Removed from wishlist");
      onRemoved(product.product_id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.product_id}`)}
      className="group flex flex-col w-full bg-white transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-square rounded-[1.8rem] overflow-hidden bg-[#F9F9F9] border border-gray-100 flex items-center justify-center transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-100 group-hover:-translate-y-1">
        
        <img
          src={product.images?.[0]}
          alt={product.product_name}
          className="w-[80%] h-[80%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />

        {/* REMOVE BUTTON (De gevulde hart) */}
        <button
          onClick={removeFromWishlist}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md rounded-full p-2.5 shadow-sm border border-white/50 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-90"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
      </div>

      {/* TEXT SECTION */}
      <div className="mt-4 px-1 flex flex-col gap-1">
        <p className="text-[10px] font-bold text-[#44A77D] uppercase tracking-widest">
          {product.merchant}
        </p>
        
        <h3 className="font-bold text-gray-800 text-[14px] leading-tight line-clamp-2">
          {product.product_name}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-base font-black text-[#44A77D] font-dmsans">
            {displayPrice ? `${priceSymbol}${displayPrice.toFixed(2)}` : "..."}
          </span>
          
          {/* Subtiel "View" tekstje in plaats van een grote knop */}
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;