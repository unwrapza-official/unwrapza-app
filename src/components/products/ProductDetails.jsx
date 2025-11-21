import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Heart } from "lucide-react";


const ProductDetails = () =>{
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarPoducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()  => {
        const fetchProduct = async () => {
            try{
            const docRef = doc(db, "products", id)
            const snap = await getDoc(docRef);

            if(snap.exists()){
                setProduct(snap.data());
            }

            setLoading(false);
            }
            catch(error){
                console.log("Error loading product:", error)
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);
    
    if (loading) {

        return (
        <div className="w-full max-w-[1200px] mx-auto mt-10 animate-pulse">
            <div className="h-[400px] bg-gray-200 rounded-xl"></div>
            <div className="h-6 bg-gray-200 rounded mt-5 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mt-3 w-1/3"></div>
        </div>
        );
    }

    if (!product) {
        return (
        <div className="w-full h-[400px] max-w-[1200px] mx-auto mt-10 text-center text-red-500 font-medium">
            Product not found.
        </div>
        );
    }

    return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
        
        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE + WISHLIST BUTTON */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full flex items-center justify-center bg-[#E8F0EA] rounded-xl p-6"
        >
            {/* WISHLIST BUTTON */}
            <button
            onClick={() => console.log("Add to wishlist:", product.id)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition"
            >
            <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition" />
            </button>

            {/* IMAGE */}
            <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[400px] object-contain"
            />
        </motion.div>

        {/* INFO */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
            </h1>

            <p className="text-xl font-semibold text-[#44A77D] mb-2">
            €{product.price}
            </p>

            <p className="text-sm text-gray-500 mb-6">
            Platform: <span className="font-medium">{product.platform}</span>
            </p>

            <button
            onClick={() => window.open(product.affiliateLink, "_blank")}
            className="w-full bg-[#44A77D] hover:bg-[#368866] transition text-white font-semibold py-3 rounded-lg mb-8"
            >
            Buy this product →
            </button>

            <p className="text-gray-700 leading-relaxed">
            {product.description || "Dit product heeft nog geen beschrijving."}
            </p>
        </motion.div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Similar products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((_, i) => (
            <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer"
            >
                <div className="w-full h-[120px] bg-gray-100 rounded-lg"></div>
                <div className="h-3 bg-gray-200 rounded mt-3 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
            ))}
        </div>
        </div>
    </div>
    );
}

export default ProductDetails
