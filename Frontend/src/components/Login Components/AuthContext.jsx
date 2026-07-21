import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // App open hone par localStorage se user load karo
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser  = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        // ✅ FIX: agar localStorage mein corrupt/invalid JSON hai (purane version
        // ka data, manual edit, etc.) toh JSON.parse crash karke poori app ko
        // white-screen kar sakta hai. Ab safely clear karke aage badhta hai.
        console.error("Corrupt auth data in localStorage, clearing:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Login function — signin API call ke baad yeh call karo
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // ✅ FIX: SignIn.jsx mein "pm_admin_token" / "pm_admin_user" / "heartbeat_id"
    // bhi set hote hain, logout par unhe bhi clean karna zaroori hai warna
    // heartbeat interval chalta reh sakta hai aur stale token localStorage mein reh jaata hai.
    localStorage.removeItem("pm_admin_token");
    localStorage.removeItem("pm_admin_user");
    localStorage.removeItem("email");
    localStorage.removeItem("userEmail");
    const heartbeatId = localStorage.getItem("heartbeat_id");
    if (heartbeatId) {
      clearInterval(Number(heartbeatId));
      localStorage.removeItem("heartbeat_id");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}