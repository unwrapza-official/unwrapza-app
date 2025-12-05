import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";   
import WishlistCard from "../../components/products/WishlistCard"; 

const AccountWishlistPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
            const load = async ()  => {
                const user = auth.currentUser;
                if (!user) return;
    
                const ref = collection(db, "users", user.uid, "wishlist");
                const snap = await getDocs(ref);
    
                const productIds = snap.docs.map(d => d.id);
    
                // haal productdata per id op
                const productPromises = productIds.map(async (id) => {
                    const productRef = doc(db, "products", id);
                    const productSnap = await getDoc(productRef);
                    return { id, ...productSnap.data() };
                });
    
                const result = await Promise.all(productPromises);
                setItems(result);
            }
            load();
        },[]);
    
    return(
        <div className="w-full flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Your Wishlist ❤️</h1>

            {items.length ===0 && (
                <p>Your wishlist is empty.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                    <WishlistCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
export default AccountWishlistPage