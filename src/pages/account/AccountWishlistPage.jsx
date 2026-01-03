import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import WishlistCard from "../../components/products/WishlistCard";

const AccountWishlistPage = () => {
  const [items, setItems] = useState([]);
  const API_BASE = import.meta.env.DEV ? "http://localhost:3000" : "";

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // 1️⃣ Haal wishlist IDs uit Firebase
      const ref = collection(db, "users", user.uid, "wishlist");
      const snap = await getDocs(ref);
      const productIds = snap.docs.map((d) => d.id);

      if (productIds.length === 0) {
        setItems([]);
        return;
      }

      try {
        // 2️⃣ Haal productdata via API
        const res = await fetch(
          `${API_BASE}/api/products?type=ids&ids=${productIds.join(",")}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch wishlist products");
        }

        const json = await res.json();
        const products = json.products || [];

        // 3️⃣ Verwijder niet-bestaande producten uit wishlist
        const apiIds = new Set(products.map((p) => p.product_id));

        for (const id of productIds) {
          if (!apiIds.has(id)) {
            await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
          }
        }

        setItems(products);
      } catch (err) {
        console.error("Wishlist load error:", err);
        setItems([]);
      }
    };

    load();
  }, []);

  const handleRemove = (removedId) => {
    setItems((prev) =>
      prev.filter((item) => item.product_id !== removedId)
    );
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
