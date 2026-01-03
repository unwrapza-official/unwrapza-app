import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

const CategoriesDropDown = ({ headerHeight, categories = [] }) => {
  const [scrollY, setScrollY] = useState(window.scrollY);

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
      className="fixed left-0 right-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-300 ease-out border-b border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
      style={{
        top: `${headerHeight - scrollY}px`,
        height: "auto",
        maxHeight: "500px",
      }}
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-[1200px] mx-auto w-full px-8 py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-gray-100" />
          <p className="text-[10px] font-bold text-[#44A77D] uppercase tracking-[0.3em]">
            Gift Categories
          </p>
          <div className="h-[1px] flex-1 bg-gray-100" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-x-6 gap-y-8">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.path}
              className="group flex flex-col items-center gap-3 transition-all duration-500 ease-out hover:-translate-y-2"
            >
              {/* Image Container: High-end afwerking */}
              <div className="relative w-full aspect-square max-w-[120px] rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-500 group-hover:rounded-[1.5rem] group-hover:shadow-2xl group-hover:shadow-[#44A77D]/20">
                
                {/* De afbeelding zelf - blijft gecentreerd in zijn container */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Subtiele glans-overlay op hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Inner border voor scherpte */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[inherit]" />
              </div>

              {/* Tekst: Beweegt nu perfect mee met de afbeelding */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[13px] font-bold text-gray-800 text-center transition-all duration-300 group-hover:text-[#44A77D] leading-tight px-1">
                  {cat.name}
                </span>
                {/* Het 'Unwrapza' stipje dat verschijnt op hover */}
                <div className="w-1 h-1 bg-[#44A77D] rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="h-4 bg-gradient-to-b from-white to-transparent opacity-40 pointer-events-none" />
    </div>
  );

  return createPortal(dropdown, document.body);
};

export default CategoriesDropDown;