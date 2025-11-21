import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";


const CategoriesDropDown = ({ headerHeight, categories = [] }) => {
  const [scrollY, setScrollY] = useState(window.scrollY);

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
   <div className="max-w-[1200px] mx-auto w-full h-full px-6 py-4 
     grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 overflow-y-auto">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.path}
            className="
              group flex flex-col items-center justify-center
              bg-white rounded-xl p-4
              shadow-[0_1px_3px_rgba(0,0,0,0.06)]
              hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)]
              transition-all duration-300
            "
          >
            {/* Image */}
            <div className="w-25 h-25 rounded-xl overflow-hidden flex items-center justify-center bg-[#F4F5F4]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
              />
            </div>

            <span className="mt-3 text-sm font-medium text-gray-800 text-center group-hover:text-black">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  return createPortal(dropdown, document.body);
};

export default CategoriesDropDown;