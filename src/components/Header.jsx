import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCircleUser, faCalendarDays, faMagnifyingGlass, faEye, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import CategoriesDropDown from './CategoriesDropDown'
import { Link } from 'react-router-dom'
import Sidebar from "./Sidebar";
import unwrapza from "../assets/unwrapza.png"
import for_her from "../assets/categories/for_her.png"
import for_him from "../assets/categories/for_him.png"
import tech_gifts from "../assets/categories/Tech_gifts.png"
import home_living from "../assets/categories/Home_living.png"
import funny_gifts from "../assets/categories/funny_gifts.png"
import luxury_picks from "../assets/categories/Luxury_picks.png"
import For_kids from "../assets/categories/For_kids.png"




const Header = () => {

    const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
    const [isSideBarOpen, setIsSidebarOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    const categories = [
        { name: "For Her", path: "/for-her", image: for_her },
        { name: "For Him", path: "/for-him", image: for_him },
        { name: "Tech Gifts", path: "/tech", image: tech_gifts },
        { name: "Home & Living", path: "/home_living", image: home_living },
        { name: "Funny Gifts", path: "/funny", image: funny_gifts },
        { name: "Luxury Picks", path: "/luxury", image: luxury_picks },
        { name: "For Kids", path: "/kids", image: For_kids },
    ];

    useEffect(() => {
        if(headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

        const handleResize = () => {
            if(headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleOpenSideBar = () => {
        window.scrollTo({ top: 0, behavior: "auto" });

        setTimeout(() => {
            setIsSidebarOpen(true);
        }, 100);
    };

    return(
        <header ref={headerRef} className="w-full">
            {/* Top Colors */}
            <div className="w-full h-[5px] flex justify-evenly">
                <div className="flex-1 h-full" style={{ backgroundColor: "#FFFB84" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#84FF96" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#84F3FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#84B9FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#9084FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#DC84FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#FF84F7" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#FF787A" }}></div>
            </div>

            {/* Main Header */}
            <div className="w-full flex flex-col items-center">
                <div className="px-4 md:px-0 max-w-[1200px] w-full">
                    {/* Upper Main Header */}
                    <div className="relative flex justify-center py-5 px-0">
                        <div className="w-full flex items-center px-2 md:px-0">
                            
                            {/* Hamburger + Logo (mobiel) */}
                            <div className="flex w-auto md:w-1/3 justify-start items-center gap-2 md:hidden">
                            <button
                                onClick={() => {
                                    if(isSideBarOpen){
                                        setIsSidebarOpen(false);
                                    } else{
                                        handleOpenSideBar();
                                    }
                                }}
                                >
                                <FontAwesomeIcon
                                    icon={isSideBarOpen ? faTimes : faBars}
                                    className="text-[#44A77D] text-3xl"
                                />
                            </button>
                            
                            {/* Sidebar-component */}
                            <Sidebar
                                isOpen={isSideBarOpen}
                                onClose={() => setIsSidebarOpen(false)}
                                categories={categories}
                                headerHeight={headerHeight}
                            />

                
                            <Link to="/">
                                <img className='hover:cursor-pointer h-[25px] pt-[3px]'
                                    src={unwrapza}
                                />
                            </Link>
                            </div>

                            {/* Slogan (desktop only) */}
                            <div className="hidden md:flex w-1/3 justify-start items-center">
                            <p className="font-roboto italic font-semibold text-[#44A77D] text-lg tracking-wide leading-snug hover:text-[#84B9FF] transition-colors duration-300 w-[300px]">
                                Because the best gifts are found, not searched
                            </p>
                            </div>

                            {/* Logo (desktop only) */}
                            <div className="hidden md:flex w-1/3 justify-center items-center">
                             <Link to="/">
                                <img className='hover:cursor-pointer h-[40px]'
                                    src={unwrapza}
                                />
                             </Link>
                            </div>

                            {/* Buttons (altijd tegen rechterkant) */}
                            <div className="absolute right-3 sm:right-0 top-1/2 -translate-y-1/2 flex gap-3 sm:gap-6 md:gap-8 items-end">
                            <Link to="/login" className="flex flex-col items-center">
                                <FontAwesomeIcon
                                icon={faCircleUser}
                                className="text-[#44A77D] text-2xl sm:text-3xl md:text-4xl hover:scale-110 transition-transform duration-200"
                                />
                                <p className="underline text-[#44A77D] text-xs sm:text-sm md:text-base">Account</p>
                            </Link>

                            <Link to="" className="hidden sm:flex flex-col items-center">
                                <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="text-[#84B9FF] text-2xl sm:text-3xl md:text-4xl hover:scale-110 transition-transform duration-200"
                                />
                                <p className="underline text-[#84B9FF] text-xs sm:text-sm md:text-base">Calendar</p>
                            </Link>

                            <Link to="" className="hidden sm:flex flex-col items-center">
                                <FontAwesomeIcon
                                icon={faEye}
                                className="text-[#DC84FF] text-2xl sm:text-3xl md:text-4xl hover:scale-110 transition-transform duration-200"
                                />
                                <p className="underline text-[#DC84FF] text-xs sm:text-sm md:text-base">Wishlist</p>
                            </Link>
                            </div>
                        </div>
                    </div>

                    {/* Searchbar */}
                    <div className="flex justify-center my-[10px] relative px-[16px]">
                        <div className="relative w-full max-w-[600px]">
                            <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full h-11 rounded-3xl border border-gray-300 pl-5 pr-12 focus:outline-none text-sm sm:text-base"
                            />
                            <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Header */}
            <div className="hidden w-full h-[60px] md:flex justify-center">
                <div className="max-w-[1200px] w-full flex justify-between items-center font-roboto">
                    
                    {/* Left side: Categories */}
                    <div 
                        className="relative group cursor-pointer h-full flex justify-center"
                        onMouseEnter={() => setCategoriesMenuOpen(true)}
                        onMouseLeave={() => setCategoriesMenuOpen(false)}
                    >
                        <p className="font-semibold text-[18px] flex items-center gap-2">
                            Categories
                            <FontAwesomeIcon icon={faCaretDown} className="mt-[2px]" />
                        </p>
                        {categoriesMenuOpen && (
                            <CategoriesDropDown
                              headerHeight={headerHeight}
                              categories={categories}
                             />
                        )}
                    </div>

                    {/* Middle: extra quick links */}
                    <div className="hidden md:flex gap-8 font-medium text-[17px]">
                        <Link to="/top-deals" className="hover:text-gray-700 transition hover:underline">Top Deals</Link>
                        <Link to="/occasions" className="hover:text-gray-700 transition hover:underline">Occasions</Link>
                    </div>
                </div>
            </div>
            <div className='w-full h-[1px] bg-gray-300'></div>
        </header>
    )
}

export default Header;
