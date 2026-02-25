import { useState } from "react";
import styles from "./Auth.module.css";

function SignIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    // Later connect backend login API
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
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>

        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;