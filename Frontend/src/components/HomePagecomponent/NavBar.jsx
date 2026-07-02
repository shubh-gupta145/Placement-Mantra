import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from './NavBar.module.css';
import NotificationBell from "./NotificationBell";
import { useAuth } from "../Login Components/useAuth";
import axios from "../../axios.js";

const NAV_LINKS = [
  { to: "/",              label: "Home",      icon: "🏠" },
  { to: "/MockInterFace", label: "Mocks",     icon: "🎤" },
  { to: "/CGPA",          label: "CGPA",      icon: "📊" },
  { to: "/TestInterFace", label: "Tests",     icon: "📝" },
  { to: "/About",         label: "About Us",  icon: "👥" },
];

function NavBar() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [isAdmin, setIsAdmin]             = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [profileImage, setProfileImage]   = useState(null);

  const navigate    = useNavigate();
  const location    = useLocation();
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const avatarLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  /* ── Profile image fetch ── */
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.email) { setProfileImage(null); return; }
      try {
        const email = user.email || localStorage.getItem("email");
        if (!email) return;

        const token = localStorage.getItem("pm_admin_token");
        const res = await axios.get(`/get-profile/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileImage(res.data?.image || null);
      } catch { setProfileImage(null); }
    };
    fetchProfileImage();
    window.addEventListener("focus",          fetchProfileImage);
    window.addEventListener("profileUpdated", fetchProfileImage);
    return () => {
      window.removeEventListener("focus",          fetchProfileImage);
      window.removeEventListener("profileUpdated", fetchProfileImage);
    };
  }, [user]);

  /* ── Admin check ── */
  useEffect(() => {
    const checkAdmin = () => {
      try {
        const adminUser = localStorage.getItem("pm_admin_user");
        const parsed    = adminUser ? JSON.parse(adminUser) : null;
        setIsAdmin(parsed?.role === "admin");
      } catch { setIsAdmin(false); }
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, [user]);

  /* ── Outside click closes dropdown ── */
  useEffect(() => {
    const handle = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  /* ── Close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* ── Sign out ── */
  const handleSignOut = async () => {
    setDropdownOpen(false);
    const token = localStorage.getItem("pm_admin_token");
    if (token) {
      try {
        await axios.post("/api/attendance/checkout", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    }
    const heartbeatId = localStorage.getItem("heartbeat_id");
    if (heartbeatId) { clearInterval(heartbeatId); localStorage.removeItem("heartbeat_id"); }
    logout();
    ["email","userEmail","pm_admin_token","pm_admin_user","read_notifs"].forEach(k => localStorage.removeItem(k));
    setIsAdmin(false);
    setProfileImage(null);
    navigate("/");
  };

  /* ── Avatar circle ── */
  const AvatarCircle = ({ size = 38, fontSize = 15 }) => (
    <div className={styles.avatarCircle} style={{ width: size, height: size, fontSize }}>
      {profileImage
        ? <img src={profileImage} alt="Profile" className={styles.avatarImg} onError={() => setProfileImage(null)} />
        : <span>{avatarLetter}</span>
      }
    </div>
  );

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.nav_container}>

        {/* ── LEFT: Logo ── */}
        <Link to="/" className={styles.brand}>
          <span className={styles.brandText}>
            <i className={`ti ti-bolt ${styles.brandBolt}`} aria-hidden="true"></i>
            Placement<span className={styles.brandAccent}>Mantra</span>
          </span>
        </Link>

        {/* ── CENTER: Desktop nav links ── */}
        <div className={styles.desktopLinks}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.links} ${isActive(to) ? styles.activeLink : ""}`}
            >
              {label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className={`${styles.links} ${styles.adminLink}`}>
              Admin Panel
            </Link>
          )}
        </div>

        {/* ── RIGHT: Bell + Profile + Hamburger ── */}
        <div className={styles.rightSection}>
          {isLoggedIn && !isAdmin && <NotificationBell />}

          {isLoggedIn ? (
            <div ref={dropdownRef} className={styles.profileWrapper}>
              <button
                className={styles.avatarBtn}
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="Profile menu"
              >
                <AvatarCircle size={38} fontSize={15} />
                {dropdownOpen && <span className={styles.avatarRing} />}
              </button>

              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropHeader}>
                    <AvatarCircle size={40} fontSize={16} />
                    <div className={styles.dropUserInfo}>
                      <span className={styles.dropName}>{user?.name || "User"}</span>
                      <span className={styles.dropEmail}>{user?.email || ""}</span>
                    </div>
                  </div>

                  <div className={styles.dropDivider} />

                  <DropItem icon="👤" label="My Profile"     onClick={() => { setDropdownOpen(false); navigate("/profile"); }} />
                  <DropItem icon="🎤" label="Mock Interview" onClick={() => { setDropdownOpen(false); navigate("/MockInterFace"); }} />
                  {isAdmin && (
                    <DropItem icon="⚙️" label="Admin Panel" onClick={() => { setDropdownOpen(false); navigate("/admin"); }} />
                  )}

                  <div className={styles.dropDivider} />
                  <DropItem icon="🚪" label="Sign Out" onClick={handleSignOut} danger />
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className={styles.signUpBtn}>Sign Up</Link>
          )}

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`} />
          </button>
        </div>
      </div>

      {/* ══ MOBILE MENU DRAWER ══ */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>

        {isLoggedIn && (
          <Link
            to="/profile"
            className={styles.mobileProfileRow}
            onClick={() => setMenuOpen(false)}
          >
            <AvatarCircle size={44} fontSize={17} />
            <div className={styles.mobileProfileInfo}>
              <span className={styles.mobileProfileName}>{user?.name || "User"}</span>
              <span className={styles.mobileProfileEmail}>{user?.email || ""}</span>
            </div>
            <span className={styles.mobileProfileArrow}>›</span>
          </Link>
        )}
        <div className={styles.mobileDivider} />

        {NAV_LINKS.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`${styles.mobileLink} ${isActive(to) ? styles.mobileLinkActive : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className={styles.mobileLinkIcon}>{icon}</span>
            <span className={styles.mobileLinkLabel}>{label}</span>
            {isActive(to) && <span className={styles.mobileLinkDot} />}
          </Link>
        ))}

        {isAdmin && (
          <>
            <div className={styles.mobileDivider} />
            <Link
              to="/admin"
              className={`${styles.mobileLink} ${styles.mobileAdminLink}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobileLinkIcon}>⚙️</span>
              <span className={styles.mobileLinkLabel}>Admin Panel</span>
            </Link>
          </>
        )}

        <div className={styles.mobileDivider} />

        {isLoggedIn ? (
          <button className={`${styles.mobileLink} ${styles.mobileSignOut}`} onClick={handleSignOut}>
            <span className={styles.mobileLinkIcon}>🚪</span>
            <span className={styles.mobileLinkLabel}>Sign Out</span>
          </button>
        ) : (
          <Link to="/signup" className={styles.mobileSignUpBtn} onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
        )}
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}

function DropItem({ icon, label, onClick, danger }) {
  return (
    <button className={`${styles.dropItem} ${danger ? styles.dropItemDanger : ""}`} onClick={onClick}>
      <span className={styles.dropItemIcon}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default NavBar;