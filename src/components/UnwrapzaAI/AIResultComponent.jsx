import { useEffect, useState } from "react";
import SearchingAnimation from "../UnwrapzaAI/AISearchingAnimation"
import AISkeletonCard from "./AISekeletonCard";
import AICarousel from "./AICarousel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AIResultComponent = ({results, isSearching}) => {
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
        <div className="w-2/3 h-full flex flex-col gap-4">
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