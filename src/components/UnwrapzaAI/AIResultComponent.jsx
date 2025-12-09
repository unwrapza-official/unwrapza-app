import { useEffect, useState } from "react";
import SearchingAnimation from "../UnwrapzaAI/AISearchingAnimation"
import AISkeletonCard from "./AISekeletonCard";
import AICarousel from "./AICarousel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AIResultComponent = ({results, isSearching, setShowResults}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            if(!results || results.length === 0)return;

            const loaded = []

            for(let id of results){
                const ref = doc(db, "products", id);
                const snap = await getDoc(ref);
                if(snap.exists()){
                    loaded.push({ id, ...snap.data() })
                }
            }
            setProducts(loaded);
        }

        loadProducts();
    }, [results]);

    return (
        <div className=" h-full flex flex-col gap-5">
            <div className="w-full flex items-center">
                {!isSearching && (
                <button
                    onClick={() => setShowResults(false)}
                    className="md:hidden px-2 py-1 bg-white text-green font-bold 
                            rounded-lg shadow-[4px_4px_0_#ffffff] border-2 border-white
                            active:scale-95 transition-all"
                >
                    ← Back
                </button>
                )}
            </div>

            {isSearching && <SearchingAnimation/>}

            {!isSearching && products.length === 0 && (
                <AISkeletonCard/>
            )}
    
            {!isSearching && products.length > 0 && (
            <AICarousel products={products}/>
            )}
        </div>
    )
}
export default AIResultComponent;