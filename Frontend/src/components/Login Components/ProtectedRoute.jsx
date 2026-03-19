import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";

function ProtectedRoute({ children }) {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return (
      <>
        {showPopup && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <h2>🔒 Access Denied</h2>
              <p>First You Sign In Our Website</p>
              <div className={styles.buttons}>
                <button onClick={() => navigate("/signin")}>Sign In</button>
                <button onClick={() => navigate(-1)}>Go Back</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return children;
}

export default ProtectedRoute;