import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white overflow-hidden">

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      ></div>

      {/* Floating Glow Blobs */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-blob-float"></div>
      <div
        className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl bottom-[-150px] right-[-150px] animate-blob-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-blob-float"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Floating astronaut */}
        <div className="text-5xl mb-2 animate-float-slow select-none">🛸</div>

        {/* 404 with glitch effect */}
        <h1
          className="relative text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-extrabold 
                     bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text 
                     leading-none animate-glitch select-none"
          data-text="404"
        >
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 tracking-wide">
          Lost in <span className="text-purple-400">Space</span>
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-400 text-sm sm:text-base md:text-lg max-w-xl">
          The page you're looking for has drifted off into the void —
          removed, renamed, or maybe it never existed at all.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Link
            to="/"
            className="group relative px-6 py-3 rounded-lg font-medium overflow-hidden
                       bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-purple-500/30
                       transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10">🏠 Go Home</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-500/50 hover:border-purple-400 hover:bg-white/5 
                       rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-105"
          >
            ← Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-10 tracking-widest uppercase">
          Error 404 • Resource not found
        </p>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .animate-blob-float {
          animation: blob-float 10s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(8deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        @keyframes glitch {
          0% { text-shadow: 2px 0 #60a5fa, -2px 0 #c084fc; transform: translate(0); }
          2% { text-shadow: -2px 0 #60a5fa, 2px 0 #c084fc; transform: translate(-1px, 1px); }
          4% { text-shadow: 2px 0 #60a5fa, -2px 0 #c084fc; transform: translate(1px, -1px); }
          6% { text-shadow: none; transform: translate(0); }
          100% { text-shadow: none; transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 5s infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;