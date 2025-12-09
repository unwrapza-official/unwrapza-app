import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserCountry } from "../hooks/useUserCountry"; 

// Mapping Amazon marketplace → domein
const DOMAIN_MAP = {
  nl: "amazon.nl",
  de: "amazon.de",
  fr: "amazon.fr",
  it: "amazon.it",
  es: "amazon.es",
  couk: "amazon.co.uk",
};

// Affiliate tags per marketplace  
const AFFILIATE_TAGS = {
  nl: "unwrapza-21",
  de: "unwrapza00-21",
  fr: "unwrapza0b-21",
  it: "unwrapza0e-21",
  es: "unwrapza08-21",
  couk: "unwrapza00b-21",
  DEFAULT: "unwrapza00-21",
};

const RedirectPage = () => {
  const { asin } = useParams();
  const { marketplace, loadingCountry } = useUserCountry();

  if (typeof window === "undefined") return null;

  useEffect(() => {
    if (loadingCountry || !marketplace) return;

    const redirectNow = () => {

      // Juiste Amazon domein
      const domain = DOMAIN_MAP[marketplace] || DOMAIN_MAP["de"];

      // Juiste affiliate tag
      const tag = AFFILIATE_TAGS[marketplace] || AFFILIATE_TAGS.DEFAULT;

      const finalUrl = `https://${domain}/dp/${asin}?tag=${tag}`;

      window.location.href = finalUrl;
    };

    redirectNow();
  }, [marketplace, loadingCountry, asin]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-xl font-semibold text-[#44A77D]">One moment…</h1>
      <p className="mt-2 text-gray-600">
        We are redirecting you to the best Amazon deal.
      </p>
    </div>
  );
};

export default RedirectPage;
