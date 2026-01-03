const SearchingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      {/* Moderne AI Loader */}
      <div className="relative flex items-center justify-center">
        {/* Buitenste pulserende cirkel */}
        <div className="absolute w-16 h-16 bg-[#44A77D]/20 rounded-full animate-ping"></div>
        
        {/* Middelste draaiende ring */}
        <div className="w-12 h-12 border-4 border-white/30 border-t-[#44A77D] rounded-full animate-spin"></div>
        
        {/* Middelste stip */}
        <div className="absolute w-3 h-3 bg-[#44A77D] rounded-full"></div>
      </div>

      {/* Tekst in jouw nieuwe huisstijl */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-white text-xl font-extrabold tracking-tight animate-pulse">
          AI is <span className="text-[#44A77D]">thinking</span>...
        </p>
        <p className="text-white/50 text-sm font-medium mt-2">
          Searching thousands of gifts
        </p>
      </div>
    </div>
  );
};

export default SearchingAnimation;