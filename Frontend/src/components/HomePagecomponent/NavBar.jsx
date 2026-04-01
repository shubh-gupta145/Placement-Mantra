import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from './NavBar.module.css';
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import { useAuth } from "../Login Components/useAuth";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const avatarLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  // ── Profile image fetch karo ──
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.email) { setProfileImage(null); return; }
      try {
        const email = user.email || localStorage.getItem("email");
        if (!email) return;
        const res = await fetch(`http://localhost:5000/get-profile/${email}`);
        const data = await res.json();
        if (data?.image) {
          setProfileImage(data.image);
        } else {
          setProfileImage(null);
        }
      } catch {
        setProfileImage(null);
      }
    };

    fetchProfileImage();

    // Profile update hone pe refresh karo
    window.addEventListener("focus", fetchProfileImage);
    window.addEventListener("profileUpdated", fetchProfileImage);
    return () => {
      window.removeEventListener("focus", fetchProfileImage);
      window.removeEventListener("profileUpdated", fetchProfileImage);
    };
  }, [user]);

  // Admin check
  useEffect(() => {
    const checkAdmin = () => {
      const adminUser = localStorage.getItem("pm_admin_user");
      if (adminUser) {
        try {
          const parsed = JSON.parse(adminUser);
          setIsAdmin(parsed?.role === "admin");
        } catch { setIsAdmin(false); }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, [user]);

  // Bahar click pe dropdown band
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    const token = localStorage.getItem("pm_admin_token");
    if (token) {
      try {
        await fetch("http://localhost:5000/api/attendance/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
      } catch {}
    }
    const heartbeatId = localStorage.getItem("heartbeat_id");
    if (heartbeatId) { clearInterval(heartbeatId); localStorage.removeItem("heartbeat_id"); }
    logout();
    localStorage.removeItem("email");
    localStorage.removeItem("pm_admin_token");
    localStorage.removeItem("pm_admin_user");
    localStorage.removeItem("read_notifs");
    setIsAdmin(false);
    setProfileImage(null);
    navigate("/");
  };

  // Avatar component — image hai toh image, nahi toh letter
  const AvatarCircle = ({ size = 38, fontSize = 15 }) => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      overflow: "hidden",
      background: profileImage ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "700",
      fontSize: `${fontSize}px`,
      flexShrink: 0,
      border: "2px solid rgba(255,255,255,0.2)",
    }}>
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setProfileImage(null)}
        />
      ) : (
        avatarLetter
      )}
    </div>
  );

  return (
    <nav>
      <div className={styles.nav_container}>
        <div className={`${styles.First_nav_container} ${menuOpen ? styles.showMenu : ""}`}>

          {/* ── Left Logo — Profile image ya "Profile" text ── */}
          <Link to="/profile" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            {isLoggedIn ? (
              <>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: profileImage ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                  border: "2px solid rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={() => setProfileImage(null)}
                    />
                  ) : (
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                      {avatarLetter}
                    </span>
                  )}
                </div>
                {!profileImage && (
                  <span style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "13px",
                    fontWeight: "500",
                    whiteSpace: "nowrap"
                  }}>
                    Profile
                  </span>
                )}
              </>
            ) : (
              <img
                className={styles.Image}
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
              />
            )}
          </Link>

          <Link className={styles.links} to="/">Home</Link>
          <Link className={styles.links} to="/MockInterFace">Mocks</Link>
          <Link className={styles.links} to="/CGPA">CGPA</Link>
          <Link className={styles.links} to="/TestInterFace">Tests</Link>
          <Link className={styles.links} to="/About">About Us</Link>

          {isAdmin && (
            <Link className={styles.links} to="/admin" style={{
              color: '#f97316', fontWeight: '600',
              border: '1px solid #f97316', padding: '4px 12px', borderRadius: '8px',
            }}>
              🎯 Admin Panel
            </Link>
          )}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SearchBar />
          {isLoggedIn && !isAdmin && <NotificationBell />}

          {/* Avatar dropdown ya Sign Up */}
          {isLoggedIn ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%", overflow: "hidden",
                  background: profileImage ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: "700", fontSize: "15px",
                  cursor: "pointer", userSelect: "none",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.4)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.5)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.4)";
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={() => setProfileImage(null)}
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "46px",
                  background: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px", padding: "8px", minWidth: "200px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 999,
                }}>
                  {/* User info */}
                  <div style={{
                    padding: "10px 12px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    marginBottom: "6px",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      overflow: "hidden", flexShrink: 0,
                      background: profileImage ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "700", fontSize: "14px",
                    }}>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={() => setProfileImage(null)}
                        />
                      ) : avatarLetter}
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>
                        {user?.name || "User"}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginTop: "2px" }}>
                        {user?.email || ""}
                      </div>
                    </div>
                  </div>

                  <DropItem icon="👤" label="Profile" onClick={() => { setDropdownOpen(false); navigate("/profile"); }} />
                  <DropItem icon="🎯" label="Mock Interview" onClick={() => { setDropdownOpen(false); navigate("/MockInterFace"); }} />
                  {isAdmin && (
                    <DropItem icon="⚙️" label="Admin Panel" onClick={() => { setDropdownOpen(false); navigate("/admin"); }} />
                  )}

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "6px", paddingTop: "6px" }}>
                    <DropItem icon="🚪" label="Sign Out" onClick={handleSignOut} danger />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" style={{
              padding: "7px 18px", borderRadius: "20px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", fontWeight: "600", fontSize: "14px",
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
            }}>
              Sign Up
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      </div>
    </nav>
  );
}

function DropItem({ icon, label, onClick, danger }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "8px 12px", borderRadius: "8px", cursor: "pointer",
        fontSize: "13px",
        color: danger
          ? hovered ? "#f87171" : "rgba(248,113,113,0.8)"
          : hovered ? "#fff" : "rgba(255,255,255,0.7)",
        background: hovered
          ? danger ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)"
          : "transparent",
        transition: "all 0.15s",
      }}
    >
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default NavBar;