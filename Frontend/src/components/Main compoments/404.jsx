import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 text-gray-900 px-4 sm:px-6">
      
      {/* 404 Number */}
      <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] font-extrabold animate-bounce leading-none">
        404
      </h1>

      {/* Message */}
      <p className="text-xl sm:text-2xl md:text-3xl mt-4 font-semibold text-center">
        Oops! Page Not Found
      </p>

      <p className="text-center mt-3 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-lg text-gray-700">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      {/* Go Back Home Button */}
      <Link
        to="/home"
        className="mt-6 px-5 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
      >
        Go Back Home
      </Link>

      {/* Subtle animation dots */}
      <div className="mt-10 flex gap-3 sm:gap-4">
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-900 rounded-full animate-ping"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-900 rounded-full animate-ping delay-200"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-900 rounded-full animate-ping delay-400"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;