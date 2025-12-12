import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import for_her from "../../assets/categories/for_her.png";
import for_him from "../../assets/categories/for_him.png";
import tech_gifts from "../../assets/categories/tech_gifts.png";
import home_living from "../../assets/categories/home_living.png";
import funny_gifts from "../../assets/categories/funny_gifts.png";
import luxury_picks from "../../assets/categories/luxury_picks.png";
import For_kids from "../../assets/categories/for_kids.png";

const Categories = () => {
  const categories = [
    { name: "For Her", path: "/category/for-her", image: for_her },
    { name: "For Him", path: "/category/for-him", image: for_him },
    { name: "Tech Gifts", path: "/category/tech", image: tech_gifts },
    { name: "Home & Living", path: "/category/home_living", image: home_living },
    { name: "Funny Gifts", path: "/category/funny", image: funny_gifts },
    { name: "Luxury Picks", path: "/category/luxury", image: luxury_picks },
    { name: "For Kids", path: "/category/kids", image: For_kids },
  ];

  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    setCanScroll(scrollWidth > clientWidth);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <h1 className="text-black py-[30px] text-2xl md:text-3xl font-semibold flex w-full justify-center">
        Shop by Category
      </h1>

      {/* RELATIVE wrapper binnen 1200px */}
      <div className="relative mb-20">
        {/* LEFT BUTTON */}
        {canScroll && (
          <button
            onClick={() => scroll("left")}
            className="
              absolute -left-4 top-1/2 -translate-y-1/2 z-10
              bg-white rounded-full p-2 shadow-md
              hover:bg-gray-100 transition
            "
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* RIGHT BUTTON */}
        {canScroll && (
          <button
            onClick={() => scroll("right")}
            className="
              absolute -right-4 top-1/2 -translate-y-1/2 z-10
              bg-white rounded-full p-2 shadow-md
              hover:bg-gray-100 transition
            "
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1 py-1"
        >
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.path}
              className="
                group flex-shrink-0
                w-[130px] sm:w-[150px] md:w-[170px]
                bg-white rounded-md
                shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)]
                transition-all duration-300
                border-2 border-transparent
                hover:scale-[1.03]
                shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                hover:border-gray-300
                hover:cursor-pointer
              "
            >
              <div className="w-full rounded-t-md overflow-hidden bg-[#F4F5F4]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full object-cover"
                />
              </div>
              <span className="block my-2 text-sm font-semibold text-gray-800 text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
