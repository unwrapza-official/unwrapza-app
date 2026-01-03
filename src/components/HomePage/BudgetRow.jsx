import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../products/ProductCard";

const BudgetRow = ({ title, minPrice, maxPrice, viewAllPath }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const API_BASE = import.meta.env.DEV ? "http://localhost:3000" : "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          type: "budget",
          min: minPrice,
        });

        if (maxPrice !== undefined && maxPrice !== null) {
          params.append("max", maxPrice);
        }

        const res = await fetch(
          `${API_BASE}/api/products?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch budget products");
        }

        const json = await res.json();
        setProducts(json.products || []);
      } catch (err) {
        console.error("BudgetRow error:", err);
        setProducts([]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [minPrice, maxPrice]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (!loading && products.length === 0) return <p className="mx-auto">No products found 🛍️</p>;

  return (
    <section>
      {loading ? (
        <>
          {/* HEADER SKELETON */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* CAROUSEL SKELETON */}
          <div className="relative">
            <div className="flex gap-4 overflow-hidden px-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px]"
                >
                  <div className="bg-white rounded-xl shadow-sm p-2 animate-pulse">
                    {/* IMAGE */}
                    <div className="w-full h-32 bg-gray-200 rounded-md mb-2" />

                    {/* TITLE */}
                    <div className="h-3 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded mb-2" />

                    {/* PRICE */}
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Link
              to={viewAllPath}
              className="text-sm font-semibold text-green hover:underline"
            >
              View all →
            </Link>
          </div>

          {/* CAROUSEL */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 hover:bg-[#44A77D] hover:text-white p-2 rounded-full shadow-md transition"
            >
              <ChevronRight size={18} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-8"
            >
              {products.map((p) => (
                <div
                  key={p.product_id}
                  className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px]"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BudgetRow;
