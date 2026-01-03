import AISearchComponent from './AISearchComponent';
import AIResultComponent from './AIResultComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const UnwrapzaAI = () => {

    const [results, setResults] = useState([]);
    const [lastClick, setLastClick] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const [isVisible, setIsVisible] = useState(() => {
        const saved = localStorage.getItem("giftFinder_isVisible");
        return saved !== null ? saved === "true" : true; 
    });

    useEffect(() => {
        localStorage.setItem("giftFinder_isVisible", isVisible);
    }, [isVisible]);

    const handleClick = () =>{
        const now = Date.now();
        if(now - lastClick < 900)return;
        setLastClick(now);
        setIsVisible(!isVisible);
    }

    return (
        <>
            <div className='w-full bg-[#44A77D] flex justify-center'>
                <div className='w-full max-w-[1200px] px-4 flex justify-end items-center'>
                    <button 
                       className='className="col-span-2 my-1 px-3 bg-green border-3 text-sm
                       text-white font-bold italic rounded-[6px]
                       shadow-[3px_3px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                       hover:translate-x-[6px] hover:translate-y-[6px]
                       transition-all duration-300 ease-out active:scale-95
                       hover:cursor-pointer'
                       onClick={handleClick}> 
                        {isVisible ? "hide" : "open"}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isVisible && (
                <motion.div
                    key="aiMain"
                    initial={{ height: 0, opacity: 0, y: -80, borderRadius: "0 0 40px 40px" }}
                    animate={{ height: "auto", opacity: 1, y: 0, borderRadius: "0 0 0 0" }}
                    exit={{ height: 0, opacity: 0, y: -80, borderRadius: "0 0 40px 40px" }}
                    transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1], // smooth bezier curve voor natuurlijke roll
                    }}
                    className="overflow-hidden origin-top"
                >
                    <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-[#60D8A5] flex justify-center"
                    >
                    <div className="max-w-[1200px] w-full px-4 flex flex-col md:flex-row gap-6 py-3 ">

                        {/* SEARCH COMPONENT */}
                        <div className={`${showResults ? "hidden lg:block" : "block"} w-full lg:w-1/3`}>
                            <AISearchComponent 
                                setResults={setResults} 
                                setIsSearching={setIsSearching}
                                setShowResults={setShowResults}
                            />
                        </div>

                        {/* RESULT COMPONENT */}
                        <div className={`${showResults ? "block" : "hidden lg:block"} w-full lg:w-2/3`}>
                            <AIResultComponent 
                                results={results} 
                                isSearching={isSearching}
                                setShowResults={setShowResults}
                            />
                        </div>

                    </div>

                    </motion.div>

                    {/* Bottom Colors */}
                    <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-2.5 flex"
                    >
                    <div className="flex-1 h-full" style={{ backgroundColor: '#84F3FF' }}></div>
                    <div className="flex-1 h-full" style={{ backgroundColor: '#DC84FF' }}></div>
                    <div className="flex-1 h-full" style={{ backgroundColor: '#FF84F7' }}></div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default UnwrapzaAI;
