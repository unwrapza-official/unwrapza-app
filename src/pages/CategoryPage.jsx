import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", slug)
        );

        const snapshot = await getDocs(q);
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error loading category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug}</h1>

      {products.length < 1 ? <p>No products found</p> :
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div 
            key={prod.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <img 
              src={prod.image}
              alt={prod.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-3 text-sm font-semibold">{prod.title}</h3>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default CategoryPage;
