import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 text-gray-900">
      {/* 404 Number */}
      <h1 className="text-[10rem] font-extrabold animate-bounce">404</h1>

      {/* Message */}
      <p className="text-2xl md:text-3xl mt-4 font-semibold">Oops! Page Not Found</p>
      <p className="text-center mt-2 text-lg md:text-xl max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Go Back Home Button */}
      <Link
        to="/home"
        className="mt-6 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
      >
        Go Back Home
      </Link>

      {/* Optional subtle animations */}
      <div className="mt-10 flex gap-4">
        <div className="w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-gray-900 rounded-full animate-ping delay-200"></div>
        <div className="w-4 h-4 bg-gray-900 rounded-full animate-ping delay-400"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
