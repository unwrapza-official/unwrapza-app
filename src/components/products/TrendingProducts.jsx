import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainer = useRef(null);

  useEffect(() => {
  const fetchTrending = async () => {
    try {
      // 🔥 Firestore query: haal alleen featured producten op
      const q = query(
        collection(db, "products"),
        where("isFeatured", "==", true)
      );

      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(items);

    } catch (error) {
      console.error("Error fetching trending products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTrending();
}, []);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainer.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col items-center">
      <h1 className="text-[#44A77D] py-[30px] text-3xl md:text-5xl font-semibold">
         Most Trending Gifts
      </h1>

      {loading ? (
        <div className="w-full mb-[150px] flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-[#44A77D] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#44A77D] text-lg font-semibold animate-pulse">
            Loading the hottest gifts...
          </p>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-600 text-lg font-medium mb-[100px]">
          No trending products found 🛍️
        </p>
      ) : (
        <div className="relative w-full mb-[20px] md:mb-[50px]">
          {/* Scroll Buttons */}
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
              <div key={product.id} className="flex-shrink-0 w-[220px] sm:w-[250px]">
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
