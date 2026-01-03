import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { setDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarPoducts] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [wishlistIds, setWishlistIds] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const BASE_API = import.meta.env.DEV ? "http://localhost:3000" : "";

    // LOGICA VOOR TEXT FORMATTING
    const renderDescription = (text) => {
        if (!text) return "This product has no description.";
        return text
            .split(/\n\n|(?<=[.!?])\s+(?=[A-Z])/)
            .filter(para => para.trim().length > 0)
            .map((para, index) => (
                <p key={index} className="mb-4 last:mb-0">
                    {para.trim()}
                </p>
            ));
    };

    const getCurrencySymbol = (currency) => {
        switch (currency) {
            case "EUR": return "€";
            case "GBP": return "£";
            case "USD": return "$";
            case "CAD": return "C$";
            case "AUD": return "A$";
            case "JPY": return "¥";
            default: return "";
        }
    }

    const toggleWishlist = async (productId) => {
        const user = auth.currentUser;
        if (!user) return toast.error("Log in to save products to your wishlist!");
        const itemRef = doc(db, "users", user.uid, "wishlist", productId);
        const exists = wishlistIds.includes(productId);

        if (exists) {
            await deleteDoc(itemRef);
            setWishlistIds(prev => prev.filter(id => id !== productId));
        } else {
            await setDoc(itemRef, { addedAt: new Date() });
            setWishlistIds(prev => [...prev, productId]);
        }
    };

    useEffect(() => {
        const loadWishlist = async () => {
            const user = auth.currentUser;
            if (!user) return;
            const ref = collection(db, "users", user.uid, "wishlist");
            const snap = await getDocs(ref);
            const ids = snap.docs.map(d => d.id);
            setWishlistIds(ids);
        };
        loadWishlist();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${BASE_API}/api/products?type=ids&ids=${id}`);
                if (!res.ok) console.error("Failed to fetch product data");
                const json = await res.json();
                if (!json.products?.length) throw new Error("Product not found");
                setProduct(json.products[0] || null);
            } catch (error) {
                console.error("Unexpected error:", error);
            } finally {
                setLoading(false);
            }
        };
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

    const displayPrice = product.price ?? null;
    const priceSymbol = getCurrencySymbol(product.currency);

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* IMAGE + WISHLIST + IMAGE SELECTOR BUTTON WRAPPER */}
                <div className="flex flex-col items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full flex flex-col h-[320px] sm:h-[360px] md:h-[380px] lg:h-[420px] xl:h-[450px] items-center justify-center rounded-xl p-6"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product.product_id)
                            }}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition"
                        >
                            <Heart className={`w-6 h-6 transition ${wishlistIds.includes(product.product_id) ? "text-red-500 fill-red-500" : "text-gray-700 hover:text-red-500"}`} />
                        </button>
                        <img
                            src={product.images?.[activeImage]}
                            alt={product.product_name}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </div>

                {/* INFO */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-[13px] font-bold text-[#44A77D] uppercase tracking-widest mb-4">
                        <span className="font-medium">{product.merchant}</span>
                    </p>

                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        {product.product_name}
                    </h1>
                    <p className="text-2xl font-bold text-[#44A77D] mb-2">
                        {!displayPrice ? "loading...." : displayPrice ? `${priceSymbol}${displayPrice?.toFixed(2)}` : "Price unavailable"}
                    </p>

                    <button
                        onClick={() => window.open(product.affiliate_url, "_blank")}
                        className="w-full bg-[#44A77D] hover:bg-[#368866] transition text-white font-semibold py-3 rounded-lg mb-8 cursor-pointer"
                    >
                        Buy this product →
                    </button>

                    {/* DESCRIPTION WITH READ MORE */}
                    <div className="relative mt-4">
                        <motion.div
                            animate={{ height: expanded ? "auto" : 110 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="relative overflow-hidden"
                        >
                            <h2 className="text-lg font-semibold mb-3 text-gray-500">
                                Product Description
                            </h2>
                            <div className="text-gray-700 leading-relaxed max-w-prose break-words">
                                {renderDescription(product.description)}
                            </div>

                            {!expanded && (
                                <div className="absolute bottom-0 left-0 w-full h-12
                                            bg-gradient-to-t from-white to-transparent 
                                            pointer-events-none"></div>
                            )}
                        </motion.div>

                        {product.description && product.description.length > 150 && (
                            <button
                                className="text-[#44A77D] font-semibold mt-3 cursor-pointer"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? "Show less ▲" : "Read more ▼"}
                            </button>
                        )}
                    </div>
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

export default ProductDetails;