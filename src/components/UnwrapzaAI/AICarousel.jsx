import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addDoc, updateDoc, doc, increment, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useUserCountry } from "../../hooks/useUserCountry";

const AICarousel = ({ products }) => {
  const [index, setIndex] = useState(1); // start in 't midden

  const navigate = useNavigate();
  const { marketplace, currency, loadingCountry } = useUserCountry();

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "EUR": return "€";
      case "GBP": return "£";
      default: return "€";
    }
  };

  const priceSymbol = getCurrencySymbol(currency);

  // === NAV FUNCTIONS ===
  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const next = () => {
    if (index < products.length - 1) setIndex(index + 1);
  };

  // === CARD RENDER FUNCTION ===
  const getCard = (offset) => {
    const productIndex = index + offset;

    if (productIndex < 0 || productIndex >= products.length) return null;

    const product = products[productIndex];
    const isCenter = offset === 0;

    // ⭐ FIXED PRICE SYSTEM ⭐
    const displayPrice =
      product?.prices?.[marketplace] ??
      product?.prices?.de ??
      null;

    const handleClick = async () => {
      try {
        await addDoc(collection(db, "clicks"), {
          productId: product.product_id,
          timeStamp: new Date(),
          platform: product.platform,
        });

        await updateDoc(doc(db, "products", product.product_id), {
          clickCount: increment(1),
        });

        navigate(`/product/${product.product_id}`);
      } catch (error) {
        console.error("Error tracking click:", error);
      }
    };

    return (
      <div
        key={product.product_id}
        className={`
          relative transition-all duration-500 ease-out
          rounded-3xl p-4 shadow-2xl border border-white/10 backdrop-blur-sm
          bg-gray-100
          ${isCenter
            ? "w-[42%] scale-105 z-30 opacity-100"
            : "w-[28%] scale-90 opacity-60 blur-[1px] hover:opacity-80 hover:blur-0"
          }
        `}
        style={{ transform: `translateY(${isCenter ? "-10px" : "10px"})` }}
      >
        <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.images?.[0]}
            alt={product.product_name}
            className="w-full h-full object-contain transition-transform duration-500"
          />
        </div>
        <p className="text-sm mt-2 text-gray-500">
          {product.platform}
        </p>
        <h2 className="text-lg font-bold text-black line-clamp-2">
          {product.product_name}
        </h2>

        <p className="text-black text-sm mt-1 line-clamp-3">
          {product.description}
        </p>

        <p className="text-[#44A77D] font-semibold text-xl mt-3">
          {loadingCountry
              ? "Loading..."
              : displayPrice !== null
                ? `${priceSymbol}${displayPrice.toFixed(2)}`
                : "Price unavailable"}
        </p>

        <button
          onClick={handleClick}
          className="
            mt-4 block bg-white text-green font-bold p-2 rounded-xl text-center
            shadow-lg hover:shadow-xl hover:bg-white/90 transition hover:cursor-pointer
          "
        >
          View Product
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={prev}
          className="
            text-black bg-white px-1 py-2 rounded-[5px] shadow-md hover:bg-green
            transition backdrop-blur-sm border border-white/10
          "
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center justify-center gap-4 w-full max-w-[1000px]">
          {getCard(-1)}
          {getCard(0)}
          {getCard(1)}
        </div>

        <button
          onClick={next}
          className="
            text-black bg-white px-1 py-2 rounded-[5px] shadow-md hover:bg-green
            transition backdrop-blur-sm border border-white/10
          "
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AICarousel;
