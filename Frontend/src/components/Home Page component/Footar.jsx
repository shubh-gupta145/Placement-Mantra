import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-10 mt-10"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Logo / Brand */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            PlacementMantra<span className="text-yellow-300">.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-200">
            We are here To Solve All Your Placement Related Problems.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2 text-sm md:text-base items-center md:items-start">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>

          <Link className="hover:text-yellow-300 transition-all duration-300" to="/">
            Home
          </Link>
          <Link className="hover:text-yellow-300 transition-all duration-300" to="/Mocks">
            Mocks
          </Link>
          <Link className="hover:text-yellow-300 transition-all duration-300" to="/CGPA">
            CGPA
          </Link>
          <Link className="hover:text-yellow-300 transition-all duration-300" to="/Tests">
            Tests
          </Link>
        </div>

        {/* Social Icons */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Follow Us</h2>

          <div className="flex justify-center md:justify-start space-x-6 text-2xl">
            {[FaGithub, FaLinkedin, FaInstagram, FaGlobe].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-yellow-300 cursor-pointer"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      <hr className="border-gray-300 my-6 opacity-30 mx-6" />

      <p className="text-center text-xs md:text-sm text-gray-200 px-4">
        © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
      </p>
    </motion.footer>
  );
}

export default Footer;