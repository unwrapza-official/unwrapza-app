import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../products/ProductCard";
import { supabase } from "../../supabaseClient";

const BudgetRow = ({ title, minPrice, maxPrice, viewAllPath }) => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase
        .from("products")
        .select("*")
        .gte("price", minPrice)
        .order("click_count", { ascending: false })
        .limit(20);

      if (maxPrice) {
        query = query.lte("price", maxPrice);
      }

      const { data } = await query;
      setProducts(data || []);
    };

    fetchProducts();
  }, [minPrice, maxPrice]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="">
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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-8"
        >
          {products.map((p) => (
            <div key={p.product_id ?? p.id} className="flex-shrink-0 w-[110px] sm:w-[170px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetRow;
