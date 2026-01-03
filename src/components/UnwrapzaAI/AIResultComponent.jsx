import { useEffect, useState } from "react";
import SearchingAnimation from "../UnwrapzaAI/AISearchingAnimation"
import AICarousel from "./AICarousel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AIInformation from "./AIInformation";

const AIResultComponent = ({results, isSearching, setShowResults}) => {
    const [products, setProducts] = useState([]);
    const BASE_API = import.meta.env.DEV ? "http://localhost:3000" : "";

    useEffect(() => {
        async function loadProducts() {
            if(!results || results.length === 0)return;

            const params = new URLSearchParams({
                type: "ids",
                ids: results.join(","),
            });

            const res = await fetch(`${BASE_API}/api/products?${params.toString()}`);
            const data = await res.json();
            setProducts(data.products || []);
        }

        loadProducts();
    }, [results]);

    return (
        <div className=" h-full flex flex-col gap-5">
            <div className="w-full flex items-center">
                {!isSearching && (
                <button
                    onClick={() => setShowResults(false)}
                    className="lg:hidden px-2 py-1 bg-white text-green font-bold 
                            rounded-lg shadow-[4px_4px_0_#ffffff] border-2 border-white
                            active:scale-95 transition-all"
                >
                    ← Back
                </button>
                )}
            </div>

            {isSearching && <SearchingAnimation/>}

            {!isSearching && products.length === 0 && (
                <AIInformation/>
            )}
    
            {!isSearching && products.length > 0 && (
            <AICarousel products={products}/>
            )}
        </div>
    )
}
export default AIResultComponent;