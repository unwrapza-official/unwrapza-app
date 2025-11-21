import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Heart } from "lucide-react"; 
import { style } from "framer-motion/client";
import { TbBackground } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await addDoc(collection(db, "clicks"), {
        productId: product.id,
        timeStamp: new Date(),
        platform: product.platform,
      });
      navigate(`product/${product.id}`)
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col items-center rounded-1xl bg-white hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="w-full aspect-square overflow-hidden rounded-xl bg-[#E8F0EA] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative w-full flex flex-col text-start mt-4">
        <p className="text-sm text-gray-400">{product.platform}</p>
        <h3 className="mt-1 font-bold text-gray-800 text-base leading-snug font-poppins">
          {product.name}
        </h3>
        <h2 className="mt-2 font-bold text-[#44A77D] text-lg font-dmsans">
          {product.price}
        </h2>
        <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition hover:cursor-pointer">
            <Heart className="text-gray-600 hover:text-red-500 transition"
        
            />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
