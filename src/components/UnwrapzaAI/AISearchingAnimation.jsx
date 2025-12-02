const SearchingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-green rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-green rounded-full animate-bounce delay-300"></div>
      </div>

      <p className="text-white opacity-80 mt-4 text-lg italic animate-pulse">
        AI is thinking...
      </p>
    </div>
  );
};

export default SearchingAnimation;