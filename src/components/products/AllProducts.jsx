import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-4 md:px-0 md:max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-[#44A77D] py-[30px] font-semibold text-3xl md:text-5xl">
           All Products
        </h1>

        {loading ? (
          <div className="w-full mb-[300px] flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-[#44A77D] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#44A77D] text-lg font-semibold animate-pulse">
              Loading the best gifts for you...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="w-full mb-[300px] flex flex-col items-center justify-center py-20 gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
              alt="No products"
              className="w-20 h-20 opacity-80"
            />
            <p className="text-gray-600 text-lg font-medium">
              Oops! No products found.
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting your filters or come back later 🎁
            </p>
          </div>
        ) : (
          <div className="w-full mb-[100px] grid grid-cols-2 md:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
