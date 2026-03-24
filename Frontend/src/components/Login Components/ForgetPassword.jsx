import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

    // ✅ Real-time email validation
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
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.message === "Login Successful") {

        // ✅ Aapka existing code
        localStorage.setItem("email", loginData.email);
        localStorage.setItem("token", "loggedIn");

        // ── Admin Panel ke liye ──
        if (data.token) {
          localStorage.setItem("pm_admin_token", data.token);
        }
        if (data.user) {
          localStorage.setItem("pm_admin_user", JSON.stringify(data.user));
        }

        // ── Attendance Checkin ──
        // Sirf student ka track karo — admin ka nahi
        const userRole = data.user?.role;
        if (userRole !== 'admin' && data.token) {
          try {
            await fetch("http://localhost:5000/api/attendance/checkin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.token}`
              }
            });
            console.log("Attendance checkin ✅");
          } catch (err) {
            console.log("Attendance error:", err);
          }

          // ── Heartbeat — har 30 second mein time track ──
          const heartbeat = setInterval(async () => {
            const token = localStorage.getItem("pm_admin_token");
            if (!token) {
              clearInterval(heartbeat);
              return;
            }
            try {
              await fetch("http://localhost:5000/api/track/heartbeat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
              });
            } catch (err) {
              console.log("Heartbeat error:", err);
            }
          }, 30000);

          // Heartbeat ID save karo — logout pe band karne ke liye
          localStorage.setItem("heartbeat_id", String(heartbeat));
        }

        window.dispatchEvent(new Event("storage"));
        navigate("/");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Signin error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        {/* Email */}
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

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
