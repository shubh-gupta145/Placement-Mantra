import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // ✅ FIX: Backend returns "User registered successfully ✅" — yahi check karo
      if (data.message === "User registered successfully ✅") {
        alert("Account created successfully! Please sign in.");
        navigate("/signin");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
        />

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

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;