import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // read ?token=... from URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setStatus("Password must be at least 6 characters.");
      return;
    }

    if (!token) {
      setStatus("Invalid reset link. Please request a new one.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      setStatus(data.message);

      // Redirect to Sign In after 2 seconds on success
      if (response.ok) {
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {status && <p>{status}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;