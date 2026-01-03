import { useEffect, useState } from "react";


export function useUserCountry() {
    const [countryCode, setCountryCode] = useState(null);
    const [countryName, setCountryName] = useState("Germany")
    const [currency, setCurrency] = useState("EUR");
    const [ip, setIp] = useState(null);
    const [loadingCountry, setLoadingCountry] = useState(true);

    useEffect(() => {
        async function fetchLocation() {
            try {
                const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
                const data = await response.json();

                const userCountryCode = data.country_code || "DE";
                const userCountryName = data.country || "Germany";

                setIp(data.ip || null);
                setCountryCode(userCountryCode);
                setCountryName(userCountryName)

            } catch (error) {
                console.log("Location detection failed:", error);
                setCountry("de");
                setCountryName("Germany")
                setCurrency("EUR");
            } finally {
                setLoadingCountry(false);
            }
        }
        fetchLocation();
    }, []);

    return { countryCode, loadingCountry, currency, countryName, ip };
}
