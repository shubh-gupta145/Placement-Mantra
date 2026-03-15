import { Link } from "react-router-dom";
import { useState } from "react";
import styles from './NavBar.module.css';
import SearchBar from "./SearchBar";

function NavBar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className={styles.nav_container}>

        {/* Left Section */}
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
        </div>

        {/* Right Section */}
<SearchBar/>

        {/* Hamburger */}
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>
    </nav>
  );
}

export default NavBar;