import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchProductCard from "../components/products/SearchProductCard";

const PAGE_SIZE = 20;

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("relevance");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.DEV ? "http://localhost:3000" : "";

  // -----------------------------
  // Load first page on query change
  // -----------------------------
  useEffect(() => {
    const load = async () => {
      if (!query) return;

      setLoading(true);
      setPage(0);
      setProducts([]);

      try {
        const res = await fetch(
          `${API_BASE}/api/products?type=search&q=${encodeURIComponent(
            query
          )}&page=0&limit=${PAGE_SIZE}`
        );

        if (!res.ok) throw new Error("Search failed");

        const json = await res.json();
        const data = json.products || [];

        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Search error:", err);
        setProducts([]);
        setFiltered([]);
      }

      setLoading(false);
    };

    load();
  }, [query]);

  // -----------------------------
  // Load more results
  // -----------------------------
  const loadMore = async () => {
    const nextPage = page + 1;

    try {
      const res = await fetch(
        `${API_BASE}/api/products?type=search&q=${encodeURIComponent(
          query
        )}&page=${nextPage}&limit=${PAGE_SIZE}`
      );

      if (!res.ok) throw new Error("Load more failed");

      const json = await res.json();
      const data = json.products || [];

      const updated = [...products, ...data];
      setProducts(updated);
      setPage(nextPage);

      applyFilter(filter, updated);
    } catch (err) {
      console.error("Load more error:", err);
    }
  };

  // -----------------------------
  // Filter logic (client-side)
  // -----------------------------
  const applyFilter = (filterType, baseList) => {
    let sorted = [...baseList];

    switch (filterType) {
      case "popularity":
        sorted.sort((a, b) => (b.click_count || 0) - (a.click_count || 0));
        break;

      case "price-asc":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-desc":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "relevance":
      default:
        sorted = [...baseList];
        break;
    }

    setFiltered(sorted);
  };

  useEffect(() => {
    applyFilter(filter, products);
  }, [filter]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">
        Results for: <span className="text-[#44A77D]">{query}</span>
      </h1>

      <div className="w-full flex justify-between items-center mb-10">
        <h2 className="text-1xl font-semibold text-gray-600">
          {filtered.length} results
        </h2>

        <select
          className="p-1 border rounded-[6px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="popularity">Popularity</option>
          <option value="price-asc">Price low → high</option>
          <option value="price-desc">Price high → low</option>
        </select>
      </div>

      {loading && <p>Searching...</p>}

      {!loading && filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {filtered.map((product) => (
              <SearchProductCard
                key={product.product_id}
                product={product}
              />
            ))}
          </div>

          {filtered.length >= PAGE_SIZE && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-4 py-2 border rounded-lg bg-[#44A77D] text-white cursor-pointer hover:bg-[#368664] transition"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
