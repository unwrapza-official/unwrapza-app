import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";   
import WishlistCard from "../../components/products/WishlistCard"; 
import { supabase } from "../../supabaseClient";

const AccountWishlistPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const load = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const ref = collection(db, "users", user.uid, "wishlist");
            const snap = await getDocs(ref);
            const productIds = snap.docs.map((d) => d.id);

            if (productIds.length === 0) {
                setItems([]);
                return;
            }

            // haal productdata op
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .in("product_id", productIds);

            if (error) {
                console.log(error);
                return;
            }

            // products die niet bestaan, verwijderen
            const supabaseIds = new Set(data.map((p) => p.product_id));

            for (const id of productIds) {
                if (!supabaseIds.has(id)) {
                    await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
                }
            }

            setItems(data);
        };

        load();
    }, []);

    const handleRemove = (removedId) => {
        setItems((prev) => prev.filter((item) => item.product_id !== removedId));
    };

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Your Wishlist ❤️</h1>

            {items.length === 0 && <p>Your wishlist is empty.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                    <WishlistCard 
                        key={product.product_id} 
                        product={product} 
                        onRemoved={handleRemove} 
                    />
                ))}
            </div>
        </div>
    );
};

export default AccountWishlistPage;
