import { useState } from "react";
import styles from "./Auth.module.css";
import {Link} from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // feedback message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Your Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {status && <p>{status}</p>}

        <p>
          Remember your password? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;