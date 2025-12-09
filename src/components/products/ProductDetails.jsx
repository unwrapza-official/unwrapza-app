import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { setDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { collection, getDoc } from "firebase/firestore";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserCountry } from "../../hooks/useUserCountry";
import { AllowedMarketPlaces } from "../../config/AllowedMarketplaces";


const ProductDetails = () =>{
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarPoducts] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [wishlistIds, setWishlistIds] = useState([]);

    const {marketplace, currency, loadingCountry} = useUserCountry();

    const canShowPrice = AllowedMarketPlaces.includes(marketplace);
    
    const getCurrencySymbol = (currency) => {
        switch(currency){
        case "EUR": return "€";
        case "GBP": return "£";
        default: return "€";
        }
    }

    const formatTimeStamp = (ts) => {
        if (!ts) return "Not updated yet";

        const date = ts.toDate();

        return date.toLocaleString("en-GB",{
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    const toggleWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Log in to save products to your favorites!");

    const itemRef = doc(db, "users", user.uid, "wishlist", productId);

    const exists = wishlistIds.includes(productId);

    if (exists) {
      await deleteDoc(itemRef);
      setWishlistIds(prev => prev.filter(id => id !== productId)); // UI direct updaten
    } else {
      await setDoc(itemRef, {
        addedAt: new Date()
      });
      setWishlistIds(prev => [...prev, productId]); // UI direct updaten
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

    useEffect(()  => {
        const fetchProduct = async () => {
            try{
            const docRef = doc(db, "products", id)
            const snap = await getDoc(docRef);

            if(snap.exists()){
                setProduct({ id: snap.id, ...snap.data() });
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
    const displayPrice = product.prices?.[marketplace] ?? product.prices?.de ?? null;

    const displayPriceLastUpdated = product.pricesLastUpdated?.[marketplace] ?? null;
    
    const priceSymbol = getCurrencySymbol(currency);

    return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
        
        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE + WISHLIST BUTTON */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full flex h-[320px] sm:h-[360px] md:h-[380px] lg:h-[420px] xl:h-[450px] items-center justify-center bg-[#F5FAF7] rounded-xl p-6"
        >
            {/* WISHLIST BUTTON */}
            <button
            onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id)
            }}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition"
            >
            <Heart className={`w-6 h-6 transition ${wishlistIds.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-700 hover:text-red-500"}`} />
            </button>

            {/* IMAGE */}
            <img
            src={product.image}
            alt={product.name}
            className="w-full h-full  object-contain"
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
            <p className="text-sm font-semibold mb-2">
                {!canShowPrice ? "" : loadingCountry ? "loading...." : displayPriceLastUpdated ? `Last updated: ${formatTimeStamp(displayPriceLastUpdated)}` : "No update available"}
            </p>
            <p className="text-xl font-semibold text-[#44A77D] mb-2">
               {!canShowPrice ? "" : loadingCountry ? "loading...." : displayPrice ? `${priceSymbol}${displayPrice?.toFixed(2)}`: "Price unavailable"}
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

            {/* DESCRIPTION WITH READ MORE */}
                <div className="relative mt-4">

                    <motion.div
                        animate={{ height: expanded ? "auto" : 110 }} // ≈ 5 regels
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative overflow-hidden"
                    >
                        <p className="text-gray-700 leading-relaxed max-w-prose break-words">
                            {product.description || "This product has no description."}
                        </p>

                        {/* Fade overlay when collapsed */}
                        {!expanded && (
                            <div className="absolute bottom-0 left-0 w-full h-16 
                                            bg-gradient-to-t from-white to-transparent 
                                            pointer-events-none"></div>
                        )}
                    </motion.div>

                    {/* READ MORE BUTTON */}
                    {product.description && product.description.length > 150 && (
                        <button
                            className="text-[#44A77D] font-semibold mt-3"
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

export default ProductDetails
