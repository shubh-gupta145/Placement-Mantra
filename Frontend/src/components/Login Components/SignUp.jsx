import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate, Link } from "react-router-dom";

/* ══════════════════════════════
   STEP 1 — Form
   STEP 2 — OTP
══════════════════════════════ */

function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── Password strength ── */
  const checkPasswordStrength = (password) => {
    if (password.length < 10) return 0;
    let score = 0;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    return score;
  };

  const getStrengthInfo = (score, len) => {
    if (len === 0)   return { label: "", color: "" };
    if (len < 10)    return { label: "Too Short",   color: "#ff4d4d" };
    if (score <= 1)  return { label: "Weak",        color: "#ff4d4d" };
    if (score === 2) return { label: "Fair",        color: "#ffd700" };
    if (score === 3) return { label: "Strong",      color: "#9acd32" };
    return            { label: "Very Strong",       color: "#00c853" };
  };

  const isPasswordAccepted = (p) => p.length >= 10 && checkPasswordStrength(p) >= 3;

  /* ── Countdown timer ── */
  const startTimer = () => {
    setTimer(60);
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(interval); setTimerActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  /* ── Input change handler ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(value) ? "Please enter a valid email address" : "");
    }

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  /* ── Step 1 Submit — send OTP to email ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError) return;
    if (!isPasswordAccepted(formData.password)) {
      alert("Please enter a strong password (10+ chars, uppercase, number, symbol)");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();

      if (data.message === "User already exists") {
        setEmailError("This email is already registered");
        setLoading(false);
        return;
      }

      setStep(2);
      startTimer();

    } catch (err) {
      console.error("Send OTP error:", err);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2 — Verify OTP + Create Account ── */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Enter 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     formData.name,
          email:    formData.email,
          password: formData.password,
          otp,
        }),
      });

      const data = await response.json();

      if (data.message === "User registered successfully ✅") {
        alert("Account created successfully! Please sign in.");
        navigate("/signin");
      } else {
        setOtpError(data.message || "Verification failed");
      }

    } catch (err) {
      console.error("OTP verify error:", err);
      setOtpError("Verification failed. Try resending OTP.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend OTP ── */
  const handleResend = async () => {
    if (timerActive) return;
    setLoading(true);
    try {
      await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      setOtpError("");
      startTimer();
    } catch (err) {
      alert("Failed to resend OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const { label, color } = getStrengthInfo(passwordStrength, formData.password.length);
  const showBar = formData.password.length > 0;
  const filledSegments = formData.password.length < 10 ? 1 : passwordStrength;

  /* ══ STEP 1 — FORM ══ */
  if (step === 1) {
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            onChange={handleChange}
            value={formData.name}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={formData.email}
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
            value={formData.password}
            required
            style={{
              borderColor: showBar
                ? isPasswordAccepted(formData.password) ? "#00c853" : color
                : "",
            }}
          />

          {showBar && (
            <>
              <div style={{ display: "flex", gap: "4px", marginTop: "-8px" }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1, height: "5px", borderRadius: "3px",
                      backgroundColor: filledSegments >= i ? color : "#ddd",
                      transition: "background-color 0.3s",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "12px", color, fontWeight: "600", marginTop: "2px" }}>
                {label}
              </p>
            </>
          )}

          <p style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.45)",
            marginTop: "-6px",
            textAlign: "center",
          }}>
            OTP will be sent to your email to verify
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP & Continue"}
          </button>

          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    );
  }

  /* ══ STEP 2 — OTP VERIFICATION ══ */
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleVerifyOtp}>

        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "rgba(99,102,241,0.15)",
            border: "2px solid rgba(99,102,241,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px",
            fontSize: "22px",
          }}>
            📧
          </div>
          <h2 style={{ marginBottom: "6px" }}>Verify Email</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0 }}>
            OTP sent to {formData.email}
          </p>
          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              background: "none", border: "none", color: "#6366f1",
              fontSize: "13px", cursor: "pointer", marginTop: "4px",
              fontFamily: "inherit",
            }}
          >
            Change email
          </button>
        </div>

        {/* OTP Input */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
            setOtp(val);
            setOtpError("");
          }}
          maxLength={6}
          required
          style={{
            letterSpacing: "8px",
            fontSize: "20px",
            textAlign: "center",
            borderColor: otpError ? "red" : "",
          }}
        />

        {otpError && (
          <p style={{ color: "red", fontSize: "13px", marginTop: "-10px", textAlign: "center" }}>
            {otpError}
          </p>
        )}

        {/* Timer + Resend */}
        <div style={{ textAlign: "center", marginTop: "-4px" }}>
          {timerActive ? (
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>
              Resend OTP in <span style={{ color: "#6366f1", fontWeight: 600 }}>{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              style={{
                background: "none", border: "none",
                color: "#6366f1", fontSize: "13px",
                cursor: "pointer", fontFamily: "inherit",
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </button>
          )}
        </div>

        <button type="submit" disabled={loading || otp.length !== 6}>
          {loading ? "Verifying..." : "Verify & Create Account"}
        </button>

      </form>
    </div>
  );
}

export default SignUp;