import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import for_her from "../../assets/categories/For_her.png";
import for_him from "../../assets/categories/For_him.png";
import tech_gifts from "../../assets/categories/Tech_gifts.png";
import home_living from "../../assets/categories/Home_living.png";
import funny_gifts from "../../assets/categories/Funny_gifts.png";
import luxury_picks from "../../assets/categories/Luxury_picks.png";
import For_kids from "../../assets/categories/For_kids.png";

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
    <div className="w-full max-w-[1200px] mx-auto px-4 py-16">
    {/* Header: Gecentreerd met accentlijn */}
    <div className="flex flex-col items-center text-center mb-12">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
        Explore <span className="text-[#44A77D]">Categories</span>
      </h2>
      <div className="h-1.5 w-16 bg-[#44A77D] rounded-full"></div>
    </div>
      <div className="relative">
        {/* Pijltjes: Alleen zichtbaar als nodig, subtieler design */}
        {canScroll && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute -left-2 top-[40%] -translate-y-1/2 z-20 bg-white/90 backdrop-blur shadow-lg rounded-full p-2 border border-gray-100 hover:bg-white transition-all active:scale-90 hidden md:block"
            >
              <ChevronLeft size={22} className="text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-2 top-[40%] -translate-y-1/2 z-20 bg-white/90 backdrop-blur shadow-lg rounded-full p-2 border border-gray-100 hover:bg-white transition-all active:scale-90 hidden md:block"
            >
              <ChevronRight size={22} className="text-gray-700" />
            </button>
          </>
        )}

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-6 px-1"
        >
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.path}
              className="group flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] bg-white transition-all duration-300"
            >
              {/* Image Box: Minimalistisch grijs vlak, zachtere hoeken */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#F6F6F6] border border-gray-50 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hele lichte border overlay op hover */}
                <div className="absolute inset-0 border-0 group-hover:border-[3px] border-[#44A77D]/20 transition-all duration-300 rounded-2xl" />
              </div>

              {/* Tekst: Iets strakker en dichter op de afbeelding */}
              <span className="block mt-4 text-[15px] font-bold text-gray-800 text-center transition-colors group-hover:text-[#44A77D]">
                {cat.name}
              </span>
              
              {/* Subtiel lijntje dat gecentreerd onder de tekst groeit */}
              <div className="mx-auto w-0 h-[2px] bg-[#44A77D] transition-all duration-300 group-hover:w-8 mt-1 rounded-full" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;