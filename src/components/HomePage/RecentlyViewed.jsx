import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../products/ProductCard";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const API_BASE = import.meta.env.DEV ? "http://localhost:3000" : "";
  
  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("recently_viewed")) || [];
    if (ids.length === 0) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/products?type=ids&ids=${ids.join(",")}`
        );

        if (!res.ok) throw new Error("Failed to fetch recently viewed");

        const json = await res.json();
        const apiProducts = json.products || [];

        // 👉 volgorde herstellen zoals bekeken
        const ordered = ids
          .map((id) => apiProducts.find((p) => p.product_id === id))
          .filter(Boolean);

        setProducts(ordered);
      } catch (err) {
        console.error("RecentlyViewed error:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 mb-20">
      <div className="flex flex-col mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Recently <span className="text-[#44A77D]">Viewed</span>
        </h2>
        <div className="h-1 w-12 bg-[#44A77D] rounded-full"></div>
      </div>

      <div className="relative">
        {products.length > 4 ? (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>) 
        : 
        null
        }

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-6"
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

        {products.length > 4 ? (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
          ) : null
        }
      </div>
    </section>
  );
};

export default RecentlyViewed;
