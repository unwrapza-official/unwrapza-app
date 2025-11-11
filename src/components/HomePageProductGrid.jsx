import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import  {useUserCountry } from "../hooks/useUserCountry.js";
import { db } from "../firebase.js";

const HomePageProductsComponent = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {country, currency, loadingUserCountry } = useUserCountry();

    const currencySymbols = {
        EUR: "€",
        USD: "$",
        GBP: "£",
        AUD: "A$",
        CAD: "C$",
        JPY: "¥",
    }

    useEffect(() =>{
        const fetchProducts = async () => {
            try{
                const querySnapshot = await getDocs(collection(db, "Products"));
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Firestore data:", items);
                setProducts(items);
            }
            catch(error){
                console.log("Error fetching products: ", error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchProducts();
    }, [])

    const handleClick = async (product) => {
        await addDoc(collection(db, "Clicks"), {
            productId: product.id,
            timeStamp: new Date(),
            platform: product.platform,
        });
        window.open(product.affiliateLink, "_blank");
    }

    return (
        <div className="px-4 md:px-0 md:max-w-[1200px] mx-auto">
            <div className="w-full h-auto flex flex-col justify-self-center items-center ">
                <div className="w-full flex flex-col justify-evenly items-center">
                    <h1 className="text-[#44A77D] py-[30px] font-regular text-3xl md:text-5xl font-roboto">
                        Most trending gifts
                    </h1>

                    {loading ? (
                        <div className="w-full mb-[300px] flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-10 h-10 border-4 border-[#44A77D] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[#44A77D] text-lg font-semibold animate-pulse">
                            🎁 Loading the best gifts for you...
                            </p>
                        </div>
                        ) : products.length === 0 ? (
                        <div className="w-full mb-[300px] flex flex-col items-center justify-center py-20 gap-3">
                            <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                            alt="No products"
                            className="w-20 h-20 opacity-80"
                            />
                            <p className="text-gray-600 text-lg font-medium">
                            Oops! No products found.
                            </p>
                            <p className="text-sm text-gray-400">
                            Try adjusting your filters or come back later 🎁
                            </p>
                        </div>
                        ) : (
                        <div className="w-full mb-[100px] grid grid-cols-2 md:grid-cols-4 gap-10">
                        {products.map((product) => (
                            <div
                            key={product.id}
                            onClick={() => handleClick(product)}
                            className="group flex flex-col items-center rounded-2xl p-5 bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                            <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                                <img
                                src={product.image}
                                alt={product.name}
                                className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="w-full text-center mt-4">
                                <p className="text-sm text-gray-400">{product.platform}</p>
                                <h3 className="mt-1 font-semibold text-gray-800 text-base leading-snug">
                                {product.name}
                                </h3>
                                <h2 className="mt-2 font-semibold text-gray-700 text-lg">
                                {product.price}
                                </h2>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default HomePageProductsComponent;