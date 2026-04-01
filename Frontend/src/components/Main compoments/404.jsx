import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl top-[-150px] left-[-150px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl bottom-[-150px] right-[-150px]"></div>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-4">
        
        {/* 404 */}
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-extrabold 
                       bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-300 text-sm sm:text-base md:text-lg max-w-xl">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all duration-300 shadow-lg hover:scale-105"
          >
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-400 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8">
          Error 404 • Resource not found
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;