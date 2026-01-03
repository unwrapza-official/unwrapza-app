import { useState } from "react";
import { ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AICarousel = ({ products }) => {
  const [index, setIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const navigate = useNavigate();

  // Swipe logica voor mobiel
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  const getCurrencySymbol = (currency) => {
    const symbols = { EUR: "€", GBP: "£", USD: "$", CAD: "C$", AUD: "A$", JPY: "¥" };
    return symbols[currency] || "";
  };

  const prev = () => index > 0 && setIndex(index - 1);
  const next = () => index < products.length - 1 && setIndex(index + 1);

  const getCard = (offset) => {
    const productIndex = index + offset;
    if (productIndex < 0 || productIndex >= products.length) {
      return <div className="hidden md:block md:w-[28%] pointer-events-none" />; 
    }

    const product = products[productIndex];
    const isCenter = offset === 0;

    const handleClick = async () => {
      try {
        await addDoc(collection(db, "clicks"), {
          productId: product.product_id,
          timeStamp: new Date(),
          platform: product.merchant,
        });

        fetch(`${BASE_URL}/api/click`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.product_id }),
        }).catch(() => {});

        navigate(`/product/${product.product_id}`);
      } catch (error) {
        console.error("Error tracking click:", error);
      }
    };

    return (
      <div
        key={product.product_id}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`
          relative transition-all duration-500 ease-out flex flex-col
          /* Vaste hoogte om verspringen te voorkomen */
          h-[420px] 
          ${isCenter 
            ? "w-full md:w-[42%] z-30 scale-100 opacity-100 bg-white shadow-2xl border border-slate-100 rounded-2xl p-5" 
            : "hidden md:flex md:w-[28%] z-10 scale-90 opacity-40 blur-[1px] bg-slate-50/50 border border-transparent rounded-2xl p-5"
          }
        `}
      >
        <div className="w-full h-50 flex-shrink-0 mb-4 rounded-xl overflow-hidden bg-white flex items-center justify-center p-2">
          <img
            src={product.images?.[0]}
            alt={product.product_name}
            className="max-w-full max-h-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col text-left flex-grow">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block h-4">
            {product.merchant}
          </span>
          
          <h2 className={`font-bold text-slate-900 leading-tight mt-1 overflow-hidden ${isCenter ? "text-lg line-clamp-2" : "text-sm line-clamp-1"}`}>
            {product.product_name}
          </h2>
          
          {isCenter && (
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">Price</span>
                <span className="text-xl font-extrabold text-[#10B981]">
                  {getCurrencySymbol(product.currency)}{product.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleClick}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center shadow-lg hover:cursor-pointer active:scale-95"
              >
                View <ArrowUpRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-transparent">
      <div className="flex items-center justify-center gap-4 w-full max-w-6xl px-4 md:px-0">
        <button
          onClick={prev}
          disabled={index === 0}
          className="hidden md:block p-3 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90 hover:cursor-pointer"
        >
          <ChevronLeft className="text-slate-700" size={22} />
        </button>

        <div className="flex items-center justify-center gap-4 flex-1 min-h-[440px]">
          {getCard(-1)}
          {getCard(0)}
          {getCard(1)}
        </div>

        <button
          onClick={next}
          disabled={index === products.length - 1}
          className="hidden md:block p-3 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90 hover:cursor-pointer"
        >
          <ChevronRight className="text-slate-700" size={22} />
        </button>
      </div>
      
      {/* Indicatie balk - Nu zichtbaar op PC en Mobiel */}
      <div className="flex gap-1.5 mt-6 md:mt-2">
        {products.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-slate-800" : "w-2 bg-slate-100"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AICarousel;