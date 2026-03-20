import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './NavBar.module.css';
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";

function NavBar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin,    setIsAdmin]    = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      const adminUser = localStorage.getItem("pm_admin_user");
      if (adminUser) {
        const user = JSON.parse(adminUser);
        setIsAdmin(user?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleSignOut = async () => {
    const token = localStorage.getItem("pm_admin_token");
    if (token) {
      try {
        await fetch("http://localhost:5000/api/attendance/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
      } catch (err) {
        console.log("Checkout error:", err);
      }
    }

    const heartbeatId = localStorage.getItem("heartbeat_id");
    if (heartbeatId) {
      clearInterval(heartbeatId);
      localStorage.removeItem("heartbeat_id");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("pm_admin_token");
    localStorage.removeItem("pm_admin_user");
    localStorage.removeItem("read_notifs");

    setIsLoggedIn(false);
    setIsAdmin(false);
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

          {/* Admin Panel link */}
          {isAdmin && (
            <Link
              className={styles.links}
              to="/admin"
              style={{
                color: '#f97316',
                fontWeight: '600',
                border: '1px solid #f97316',
                padding: '4px 12px',
                borderRadius: '8px',
              }}
            >
              🎯 Admin Panel
            </Link>
          )}

          {/* Sign Out / Sign Up */}
          {isLoggedIn ? (
            <button className={styles.links} onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <Link className={styles.links} to="/signup">Sign Up</Link>
          )}

        </div>

        <SearchBar />

        {/* ── Notification Bell ── */}
        {isLoggedIn && !isAdmin && <NotificationBell />}

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