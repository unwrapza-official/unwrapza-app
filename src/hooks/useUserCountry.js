import { useEffect, useState } from "react";


export function useUserCountry(){
    const [country, setCountry] = useState(null);
    const [currency, setCurrency] = useState("EUR");
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function fetchLocation(){
            try{
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();

                const userCountry = data.country_code || "XX";

                const currencyMap = {
                    NL: "EUR",
                    BE: "EUR",
                    DE: "EUR",
                    FR: "EUR",
                    IT: "EUR",
                    ES: "EUR",
                    GB: "GBP",
                    US: "USD",
                    CA: "CAD",
                    AU: "AUD",
                    JP: "JPY",
                }

                const mappedCurrency = currencyMap[userCountry] || "EUR";

                setCountry(userCountry);
                setCurrency(mappedCurrency);
            }
            catch(error){
                console.log("Location detection failed: ", error);
                setCountry("XX");
                setCurrency("EUR");
            }
            finally{
                setLoading(false);
            }
        }

        fetchLocation();
    }, []) 

    return {country, currency, loading};
}
