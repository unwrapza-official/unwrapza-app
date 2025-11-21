import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/products/ProductCard";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "Products"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(list);

      const match = list.filter((p) =>
        p.name.toLowerCase().includes(query)
      );

      setFiltered(match);
    };

    load();
  }, [query]);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Results for: <span className="text-[#44A77D]">{query}</span>
      </h1>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
