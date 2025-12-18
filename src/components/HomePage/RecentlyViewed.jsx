import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../../supabaseClient";
import ProductCard from "../products/ProductCard";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("recently_viewed")) || [];
    if (ids.length === 0) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("product_id", ids);

      if (!error && data) {
        // volgorde herstellen zoals bekeken
        const ordered = ids
          .map((id) => data.find((p) => p.product_id === id))
          .filter(Boolean);

        setProducts(ordered);
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-1xl md:text-2xl font-semibold">Recently viewed</h2>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

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

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default RecentlyViewed;
