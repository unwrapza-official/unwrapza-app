import { useState } from "react";
import { ChevronRight, ChevronLeft  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addDoc, updateDoc, doc, increment, collection } from "firebase/firestore";
import { db } from "../../firebase";


const AICarousel = ({ products }) => {
  const [index, setIndex] = useState(5);

  const navigate = useNavigate();

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const next = () => {
    if (index < products.length - 1) setIndex(index + 1);
  };

  const getCard = (offset) => {
    const productIndex = index + offset;
    if (productIndex < 0 || productIndex >= products.length) return null;

    const product = products[productIndex];
    const isCenter = offset === 0;

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

      navigate(`/product/${product.id}`)
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

    return (
      <div
        key={product.id}
        className={`
          relative
          transition-all duration-500 ease-out
          rounded-3xl p-4 shadow-2xl border border-white/10 backdrop-blur-sm
          bg-white/5
          ${isCenter ? 
            "w-[42%] scale-105 z-30 opacity-100" : 
            "w-[28%] scale-90 opacity-60 blur-[1px] hover:opacity-80 hover:blur-0"
          }
        `}
        style={{
          transform: `translateY(${isCenter ? "-10px" : "10px"})`,
        }}
      >
        <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500
                       ${isCenter && 'group-hover:scale-110'}"
          />
        </div>

        <h2 className="text-lg font-bold mt-4 text-white line-clamp-2">
          {product.name}
        </h2>

        <p className="text-white/70 text-sm mt-1 line-clamp-3">
          {product.description}
        </p>

        <p className="text-white font-semibold text-xl mt-3">
          {product.price ? `€${product.price}` : "Prijs onbekend"}
        </p>

        <button
          onClick={handleClick}
          className="
            mt-4 block bg-white text-green font-bold py-2 rounded-xl text-center
            shadow-lg hover:shadow-xl hover:bg-white/90 transition
          "
        >
          View Product
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="
            text-black bg-white px-1 py-2 rounded-[5px] shadow-md hover:bg-green 
            transition backdrop-blur-sm border border-white/10
          "
        >
          <ChevronLeft/>
        </button>

        <div className="flex items-center justify-center gap-6 w-full max-w-[1000px]">
          {getCard(-1)}
          {getCard(0)}
          {getCard(1)}
        </div>

        <button
          onClick={next}
          className="
            text-black bg-white px-1 py-2 rounded-[5px] shadow-md hover:
            transition backdrop-blur-sm border border-white/10
          "
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default AICarousel;
