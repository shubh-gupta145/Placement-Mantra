import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";  // useEffect add karo
import styles from './NavBar.module.css';
import SearchBar from "./SearchBar";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // ✅ Yeh add karo - login hone par auto update hoga
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkLogin);
    
    // Har route change par bhi check karo
    checkLogin();

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav>
      <div className={styles.nav_container}>
        <div className={`${styles.First_nav_container} ${menuOpen ? styles.showMenu : ""}`}>
          
          <Link to="/profile">
            <img
              className={styles.Image}
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Placement Mantra Logo"
            />
          </Link>

          <Link className={styles.links} to="/">Home</Link>
          <Link className={styles.links} to="/MockInterFace">Mocks</Link>
          <Link className={styles.links} to="/CGPA">CGPA</Link>
          <Link className={styles.links} to="/TestInterFace">Tests</Link>
          <Link className={styles.links} to="/About">About Us</Link>

          {/* ✅ Login hone par Sign Out, warna Sign Up */}
          {isLoggedIn ? (
            <button className={styles.links} onClick={handleSignOut}>Sign Out</button>
          ) : (
            <Link className={styles.links} to="/signup">Sign Up</Link>
          )}
        </div>

        <SearchBar />

        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

export default NavBar;