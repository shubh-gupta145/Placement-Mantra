import { useState } from "react";
import styles from "./Auth.module.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);

    // Later you can connect backend API here
    // fetch("/api/register", { method: "POST", body: JSON.stringify(formData) })
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
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;