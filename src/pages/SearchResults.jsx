import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import SearchProductCard from "../components/products/SearchProductCard";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [originalFiltered, setOriginalFiltered] = useState([]);

  const [filter, setFilter] = useState("relevance");

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "products"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(list);

      const match = list.filter((p) =>
        p.name?.toLowerCase().includes(query)
      );

      setFiltered(match);
      setOriginalFiltered(match);
    };

    load();
  }, [query]);

  useEffect(() => {
    // relevance → restore original order
    if (filter === "relevance") {
      setFiltered(originalFiltered);
      return;
    }

    let sorted = [...originalFiltered];

    switch (filter) {
      case "popularity":
        sorted.sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));
        break;

      case "price-asc":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-desc":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      default:
        break;
    }

    setFiltered(sorted);
  }, [filter, originalFiltered]);

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

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
