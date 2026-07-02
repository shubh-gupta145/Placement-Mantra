import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import axios from "../../axios.js";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(e.target.value)) {
        setEmailError("❌ Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError) {
      alert("Please fix the errors before submitting!");
      return;
    }

    try {
      const response = await axios.post("/signin", loginData);
      const data = response.data;

      if (data.message === "Login Successful") {

        // ✅ Step 1: AuthContext update
        login(data.user, data.token);

        // ✅ Step 2: Extra keys
        localStorage.setItem("email", loginData.email);
        localStorage.setItem("userEmail", loginData.email);
        if (data.token) localStorage.setItem("pm_admin_token", data.token);
        if (data.user)  localStorage.setItem("pm_admin_user", JSON.stringify(data.user));

        // ✅ Step 3: Attendance checkin — sirf student ke liye
        const userRole = data.user?.role;
        if (userRole !== "admin" && data.token) {
          try {
            await axios.post("/api/attendance/checkin", {}, {
              headers: { Authorization: `Bearer ${data.token}` },
            });
            console.log("Attendance checkin ✅");
          } catch (err) {
            console.log("Attendance error:", err);
          }

          // Heartbeat — har 30 second mein
          const heartbeat = setInterval(async () => {
            const token = localStorage.getItem("pm_admin_token");
            if (!token) { clearInterval(heartbeat); return; }
            try {
              await axios.post("/api/track/heartbeat", {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
            } catch (err) {
              console.log("Heartbeat error:", err);
            }
          }, 30000);

          localStorage.setItem("heartbeat_id", String(heartbeat));
        }

        window.dispatchEvent(new Event("storage"));
        navigate("/");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Signin error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
          style={{ borderColor: emailError ? "red" : "" }}
        />
        {emailError && (
          <p style={{ color: "red", fontSize: "13px", marginTop: "-10px" }}>
            {emailError}
          </p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <p>
          {/* <Link to="/forgot-password">Forgot Password?</Link> */}
        </p>

        <button type="submit">Sign In</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;