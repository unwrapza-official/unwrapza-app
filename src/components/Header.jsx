import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCircleUser, faCalendarDays, faMagnifyingGlass, faEye, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { auth } from "../firebase";
import CategoriesDropDown from './CategoriesDropDown'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from "./Sidebar";
import unwrapza from "../assets/unwrapza.png"
import for_her from "../assets/categories/For_her.png"
import for_him from "../assets/categories/For_him.png"
import tech_gifts from "../assets/categories/Tech_gifts.png"
import home_living from "../assets/categories/Home_living.png"
import funny_gifts from "../assets/categories/Funny_gifts.png"
import luxury_picks from "../assets/categories/Luxury_picks.png"
import For_kids from "../assets/categories/For_kids.png"
import MarketplaceIndicator from './MarketplaceIndicator';

const Header = () => {

    const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
    const [isSideBarOpen, setIsSidebarOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    const navigate = useNavigate();

    const handleSearch = () => {
        if(!searchValue.trim()) return;
        navigate("/search?query=" + encodeURIComponent(searchValue));
    }

    const categories = [
        { name: "For Her", path: "/category/for-her", image: for_her, slug: "for-her",  },
        { name: "For Him", path: "/category/for-him", image: for_him, slug: "for-him", },
        { name: "Tech Gifts", path: "/category/tech", image: tech_gifts, slug: "tech", },
        { name: "Home & Living", path: "/category/home_living", image: home_living, slug: "home_living", },
        { name: "Funny Gifts", path: "/category/funny", image: funny_gifts, slug: "funny", },
        { name: "Luxury Picks", path: "/category/luxury", image: luxury_picks, slug: "luxury", },
        { name: "For Kids", path: "/category/kids", image: For_kids, slug: "kids", },
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
            {/* Main Header */}
                <div className="px-4 w-full max-w-[1200px] mx-auto">
                    {/* Upper Main Header */}
                    <div className="relative flex justify-center py-5 px-0">
                        <div className="w-full flex items-center px-0 md:px-0">
                            
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
                            <p className="font-roboto italic font-semibold text-[#44A77D] md:text-md xl:text-lg tracking-wide leading-snug hover:text-[#84B9FF] transition-colors duration-300 w-full max-w-[250px]">
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

                            {/* Country (Mobiel) */}
                            <div className='block sm:hidden absolute right-15'>
                                <MarketplaceIndicator/>
                            </div>

                            {/* Buttons (altijd tegen rechterkant) */}
                            <div className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 flex sm:gap-4 md:gap-3 items-end">
                            
                            <Link to={auth.currentUser ? "/account" : "/login"}
                            className="flex flex-col items-center">
                                <FontAwesomeIcon
                                icon={faCircleUser}
                                className="text-[#44A77D] text-2xl sm:text-3xl md:text-3xl hover:scale-110 transition-transform duration-200"
                                />
                                <p className="underline text-[#44A77D] text-xs sm:text-sm md:text-base">Account</p>
                            </Link>

                            <Link to={auth.currentUser ? "/account/calendar" : "/login"} className="hidden sm:flex flex-col items-center">
                                <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="text-[#84B9FF] text-2xl sm:text-3xl md:text-3xl hover:scale-110 transition-transform duration-200"
                                />
                                <p className="underline text-[#84B9FF] text-xs sm:text-sm md:text-base">Calendar</p>
                            </Link>

                            <Link to={auth.currentUser ? "/account/wishlist" : "/login"} className="hidden sm:flex flex-col items-center">
                                <FontAwesomeIcon
                                icon={faEye}
                                className="text-[#DC84FF] text-2xl sm:text-3xl md:text-3xl hover:scale-110 transition-transform duration-200"
                                />
                                <p className="underline text-[#DC84FF] text-xs sm:text-sm md:text-base">Wishlist</p>
                            </Link>
                            </div>
                        </div>
                    </div>

                    {/* Searchbar */}
                    <div className="flex justify-center my-[10px] relative px-[16px]">
                        <div className='hidden sm:block absolute left-[0px] top-1/2 -translate-y-1/2'>
                            <MarketplaceIndicator/>
                        </div>
                        <div className="relative w-full max-w-[400px] md:max-w-[550px] xl:max-w-[600px]">
                            <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full h-11 rounded-3xl border border-gray-300 pl-5 pr-12 focus:outline-orange-300 text-sm sm:text-base"
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") handleSearch();
                            }}
                            />
                            <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={handleSearch}
                            />
                        </div>
                    </div>
                </div>

            {/* Lower Header */}
                <div className="hidden w-full max-w-[1200px] h-[40px] px-4 mx-auto md:flex justify-between items-center font-roboto"> 
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
            <div className='w-full h-[1px] bg-gray-300'></div>
        </header>
    )
}

export default Header;
