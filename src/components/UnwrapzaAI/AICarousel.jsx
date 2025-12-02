import { useState } from "react";

const AICarousel = ({ products }) => {
  const [index, setIndex] = useState(1);

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

    return (
      <div
        key={product.id}
        className={`
          ${isCenter ? "w-[40%] scale-105 z-20" : "w-[28%] scale-95 opacity-80"}
          bg-green/90 p-4 rounded-2xl shadow-xl border border-white/20
          transition-all duration-300 cursor-pointer
        `}
      >
        <div className="relative w-full h-40 overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <h2 className="text-lg font-bold mt-3 text-white line-clamp-2">
          {product.name}
        </h2>

        <p className="text-white/80 text-sm line-clamp-3">
          {product.description}
        </p>

        <p className="text-white font-semibold text-lg mt-3">
          {product.price ? `€${product.price}` : "Prijs onbekend"}
        </p>

        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block bg-white text-green font-bold py-2 rounded-xl text-center hover:bg-white/80 transition"
        >
          View Product
        </a>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="text-white bg-green/60 px-4 py-2 rounded-lg hover:bg-green transition"
        >
          ←
        </button>

        <div className="flex items-center justify-center gap-4 w-full max-w-[900px]">
          {getCard(-1)}
          {getCard(0)}
          {getCard(1)}
        </div>

        <button
          onClick={next}
          className="text-white bg-green/60 px-4 py-2 rounded-lg hover:bg-green transition"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default AICarousel;
