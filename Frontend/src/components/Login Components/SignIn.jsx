import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(""); // ✅ Error state

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

    // ✅ Submit se pehle bhi check karo
    if (emailError) {
      alert("Please fix the errors before submitting!");
      return;
    }

    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (data.message === "Login Successful") {
      localStorage.setItem("email", loginData.email);
      localStorage.setItem("token", "loggedIn");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        {/* ✅ Email field */}
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
          style={{ borderColor: emailError ? "red" : "" }}
        />
        {/* ✅ Error message */}
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
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;