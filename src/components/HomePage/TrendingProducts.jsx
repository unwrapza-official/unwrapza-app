import { useEffect, useRef, useState } from "react";
import ProductCard from "../products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainer = useRef(null);
  const API_BASE = import.meta.env.DEV ? "http://localhost:3000" : "";

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);

      try{
        const res = await fetch(`${API_BASE}/api/products?type=trending`);
        const json = await res.json();
        setProducts(json.products || []);

      }
      catch(error){
        console.error("Error fetching trending products:", error);
        setProducts([]);
      }

      setLoading(false);
    };

    fetchTrending();
  }, []);

  const scroll = (direction) => {
    if (!scrollContainer.current) return;

    const { scrollLeft, clientWidth } = scrollContainer.current;
    const scrollAmount = clientWidth * 0.8;

    scrollContainer.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col items-center">
      <div className="flex flex-col items-center my-10 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Most <span className="text-[#44A77D]">Trending</span> Gifts
        </h2>
        <div className="h-1 w-12 bg-[#44A77D] rounded-full"></div>
      </div>

      {loading ? (
        <div className="relative w-full mb-[150px]">
          {/* Skeleton carousel */}
          <div className="flex gap-6 px-6 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[130px] sm:w-[200px]"
              >
                <div className="bg-white rounded-xl shadow-sm p-3 animate-pulse">
                  {/* IMAGE */}
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-3" />

                  {/* TITLE */}
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />

                  {/* PRICE */}
                  <div className="h-5 w-1/2 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-600 text-lg font-medium mb-[100px]">
          No trending products found 🛍️
        </p>
      ) : (
        <div className="relative w-full mb-[20px] md:mb-[50px]">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainer}
            className="flex overflow-x-auto overflow-y-hidden scroll-smooth gap-6 px-6 no-scrollbar"
          >
            {products.map((product) => (
              <div
                key={product.product_id}
                className="flex-shrink-0 w-[130px] sm:w-[200px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
