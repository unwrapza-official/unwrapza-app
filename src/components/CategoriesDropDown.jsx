import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";


const CategoriesDropDown = ({ headerHeight }) => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  const categories = [
    { name: "For Her", path: "/for-her" },
    { name: "For Him", path: "/for-him" },
    { name: "Tech Gifts", path: "/tech" },
    { name: "Home & Living", path: "/home" },
    { name: "Funny Gifts", path: "/funny" },
    { name: "Luxury Picks", path: "/luxury" },
    { name: "Gadgets", path: "/gadgets" },
    { name: "Personalized", path: "/personalized" },
    { name: "Gift Cards", path: "/gift-cards" },
  ];

  // ✅ Scroll body blokkeren wanneer dropdown open is
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dropdown = (
    <div
      className="fixed left-0 right-0 bg-white text-[#44A77D] shadow-md z-50 transition-all duration-300 ease-out"
      style={{
        top: `${headerHeight - scrollY}px`,
        height: "500px",
      }}
    >
      {/* Hierbinnen mag je scrollen */}
      <div className="max-w-[1200px] mx-auto w-full h-full px-6 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 overflow-y-auto">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.path}
            className="px-4 py-2 hover:bg-[#f3f3f3] rounded-md transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );

  return createPortal(dropdown, document.body);
};

export default CategoriesDropDown;
