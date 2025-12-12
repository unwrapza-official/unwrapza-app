import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import SearchProductCard from "../components/products/SearchProductCard";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState([]); // all loaded items
  const [filtered, setFiltered] = useState([]); // sorted items

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("relevance");

  const PAGE_SIZE = 20;

  // -----------------------------
  // Load first page on query change
  // -----------------------------
  useEffect(() => {
    const load = async () => {
      setPage(0); // reset pagination
      setProducts([]); // reset loaded data

      const { data, error, count } = await supabase
        .from("products")
        .select("*", {count: "exact"})
        .ilike("product_name", `%${query}%`)
        .range(0, PAGE_SIZE - 1);

      if (error) {
        console.log(error);
        return;
      }

      setProducts(data);
      setFiltered(data);
      setTotalCount(count || 0);
    };

    load();
  }, [query]);

  // -----------------------------
  // Load more results
  // -----------------------------
  const loadMore = async () => {
    const nextPage = page + 1;
    const start = nextPage * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("product_name", `%${query}%`)
      .range(start, end);

    if (error) {
      console.log(error);
      return;
    }

    const updated = [...products, ...data];
    setProducts(updated);
    setPage(nextPage);

    applyFilter(filter, updated);
  };

  // -----------------------------
  // Filter logic
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
        sorted = [...baseList]; // keep original order
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
          {totalCount} results
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

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {filtered.map((product) => (
              <SearchProductCard key={product.product_id} product={product} />
            ))}
          </div>

          {/* Load more button */}
          {filtered.length >= PAGE_SIZE && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-4 py-2 border rounded-lg bg-[#44A77D] text-white hover:cursor-pointer"
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
