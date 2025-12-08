import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useUserCountry } from "../../hooks/useUserCountry";

const WishlistCard = ({product}) => {
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

    const removeFromWishlist = async () => {
        const user = auth.currentUser;
        if(!user) return toast.error("Log in to manage your wishlist!");

        const itemRef = doc(db, "users", user.uid, "wishlist", product.id);
        await deleteDoc(itemRef);
        window.location.reload();
    }
    
    return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 group relative">

        {/* Floating Remove button */}
        <button
        onClick={removeFromWishlist}
        className="absolute top-3 right-3 bg-white/90 backdrop-blur-md 
                    rounded-full p-2 shadow-sm hover:bg-white transition"
        >
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>

        {/* Image container */}
        <div className="w-full aspect-square bg-[#F5FAF7] rounded-xl flex items-center justify-center overflow-hidden">
        <img
            src={product.image}
            className="w-3/4 h-3/4 object-contain transition-transform group-hover:scale-105 duration-300"
        />
        </div>

        {/* Info */}
        <h3 className="mt-4 text-gray-900 font-semibold text-sm line-clamp-2">
        {product.name}
        </h3>

        <p className="text-[#44A77D] font-bold mt-1 text-base">
        {loadingCountry ? "loading...." : displayPrice !== null ? `${priceSymbol}${displayPrice?.toFixed(2)}` : "Price unavailable"}
        </p>

        {/* CTA button */}
        <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="
            mt-4 bg-[#44A77D] hover:bg-[#3a8d6c] 
            text-white w-full py-2 
            rounded-lg font-medium transition
        "
        >
        View product
        </button>
    </div>
    );
};

export default WishlistCard;