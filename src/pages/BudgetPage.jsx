import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BudgetProductCard from "../components/products/BudgetProductCard";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 20;

const BudgetPage = () => {
  const [params] = useSearchParams();
  const min = params.get("min");
  const max = params.get("max");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const BASE_API = import.meta.env.DEV ? "http://localhost:3000" : "";

  const title = max
    ? `Gifts €${min} – €${max}`
    : `Gifts from €${min}`;

  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoading(true);
      setPage(0);
      setProducts([]);
      setHasMore(true);

      try {
        const query = new URLSearchParams({
          type: "budget",
          min,
          page: 0,
          limit: PAGE_SIZE,
        });

        if (max) query.append("max", max);

        const res = await fetch(`${BASE_API}/api/products?${query}`);
        if (!res.ok) throw new Error("Budget load failed");

        const json = await res.json();
        const data = json.products || [];

        setProducts(data);
        setHasMore(data.length === PAGE_SIZE);
      } catch (err) {
        console.error("Budget fetch error:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadInitialProducts();
  }, [min, max]);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    const nextPage = page + 1;

    try {
      const query = new URLSearchParams({
        type: "budget",
        min,
        page: nextPage,
        limit: PAGE_SIZE,
      });

      if (max) query.append("max", max);

      const res = await fetch(`${BASE_API}/api/products?${query}`);
      if (!res.ok) throw new Error("Load more failed");

      const json = await res.json();
      const data = json.products || [];

      setProducts((prev) => [...prev, ...data]);
      setPage(nextPage);

      if (data.length < PAGE_SIZE) setHasMore(false);
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-20">
      {/* HEADER */}
      <header className="mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          {title}
        </h1>
        <div className="w-20 h-1.5 bg-[#44A77D] mx-auto rounded-full" />
      </header>

      {loading && products.length === 0 ? (
        <div className="flex flex-col items-center py-32">
          <Loader2 className="w-10 h-10 text-[#44A77D] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {products.map((product) => (
              <BudgetProductCard
                key={product.product_id}
                product={product}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-20">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="
                  px-10 py-4 rounded-xl font-bold text-white
                  bg-[#44A77D] hover:bg-[#3b9470]
                  transition-all duration-300
                  disabled:opacity-50
                "
              >
                {loadingMore ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Load more"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetPage;
