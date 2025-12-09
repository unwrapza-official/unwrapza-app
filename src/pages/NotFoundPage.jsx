import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[600px] flex flex-col justify-center items-center bg-gray-50 px-6 text-center">
      {/* Main content */}
      <h1 className="text-[100px] sm:text-[140px] font-extrabold text-[#44A77D] leading-none">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mt-4 text-gray-800">Page not found</h2>
      <p className="text-gray-600 mt-2 max-w-[500px]">
        Oops! It seems the page you’re looking for doesn’t exist or has been moved.  
        Try going back to the homepage or exploring our gift ideas instead.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          to="/"
          className="bg-[#44A77D] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#3b8f6c] transition"
        >
          Go to Homepage
        </Link>
        <Link
          to="/gift-ideas"
          className="border-2 border-[#44A77D] text-[#44A77D] px-6 py-3 rounded-md font-semibold hover:bg-[#44A77D] hover:text-white transition"
        >
          Explore Gift Ideas
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
