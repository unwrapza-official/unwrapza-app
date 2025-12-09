import { useUserCountry } from "../hooks/useUserCountry";
import ReactCountryFlag from "react-country-flag";

const FLAG_MAP = {
  nl: "NL",
  de: "DE",
  fr: "FR",
  it: "IT",
  es: "ES",
  couk: "GB",
};

const MarketplaceIndicator = () => {
  const { marketplace, loading } = useUserCountry();

  if (loading) return null; // niet tonen tijdens load

  const countryCode = FLAG_MAP[marketplace] ?? "🌍";

  return (
    <div className="flex flex-col items-center p-1 md:p-1.5 bg-gradient-to-b from-white :to-gray-50 
                border border-gray-200 rounded-xl shadow-md text-[11px] font-medium">
  
        <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{ width: "1.7em", height: "1.7em" }}
        />
        <span className="mt-1 text-gray-700 tracking-wide">Market</span>
    </div>
  );
};

export default MarketplaceIndicator;
