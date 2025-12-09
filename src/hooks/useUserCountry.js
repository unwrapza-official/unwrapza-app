import { useEffect, useState } from "react";

// Marketplace mapping for EU-focused launch
const MARKETPLACE_MAP = {
    // Eurozone + eigen Amazon marketplace
    DE: "de",
    NL: "nl",
    FR: "fr",
    IT: "it",
    ES: "es",

    // Eurozone zonder marketplace → BESTE match
    BE: "de",
    AT: "de",
    LU: "de",
    PT: "es",
    HR: "de",   // Kroatië gebruikt EUR sinds 2023

    // NEW → Ierland gebruikt Amazon UK als primair
    IE: "couk",   // Amazon.co.uk levert aan Ierland, grootste marketplace voor IE

    // Microstates (optioneel, hebben EUR)
    MC: "fr",   // Monaco
    AD: "es",   // Andorra
    SM: "it",   // San Marino
    VA: "it",   // Vaticaanstad

    // NON-EURO landen → fallback naar Amazon.de
    CH: "de",   // Zwitserland
    DK: "de",   // Denemarken (DKK)
    NO: "de",   // Noorwegen (NOK)
    SE: "de",   // Zweden (SEK)
    PL: "de",   // Polen (PLN)
    CZ: "de",   // Tsjechië (CZK)
    HU: "de",   // Hongarije (HUF)
    SK: "de",   // Slowakije (EUR maar geen marketplace)
    SI: "de",   // Slovenië (EUR maar geen marketplace)
    RO: "de",   // Roemenië (RON)
    BG: "de",   // Bulgarije (BGN)
    MT: "it",   // Malta (EUR)

    UK: "couk",   // Verenigd Koninkrijk (Amazon.co.uk)
    GB: "couk",   // Sommige browsers gebruiken GB als landcode

    // fallback fallback → als landcode onbekend is → Duitsland
    DEFAULT: "de",
};

export function useUserCountry() {
    const [country, setCountry] = useState(null);
    const [marketplace, setMarketplace] = useState("de");
    const [currency, setCurrency] = useState("EUR");
    const [loadingCountry, setLoadingCountry] = useState(true);

    useEffect(() => {
        async function fetchLocation() {
            try {
                const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
                const data = await response.json();

                const userCountry = data.country_code || "DE";

                setCountry(userCountry);

                // Map EU country → marketplace
                const mappedMarket = MARKETPLACE_MAP[userCountry] || MARKETPLACE_MAP.DEFAULT;
                setMarketplace(mappedMarket);

                // EU currencies (keep simple for MVP)
                if (mappedMarket === "couk") {
                    setCurrency("GBP");
                } else {
                    setCurrency("EUR");
                }

            } catch (error) {
                console.log("Location detection failed:", error);
                setCountry("de");
                setMarketplace("de");
                setCurrency("EUR");
            } finally {
                setLoadingCountry(false);
            }
        }
        fetchLocation();
    }, []);

    return { country, currency, marketplace, loadingCountry };
}
