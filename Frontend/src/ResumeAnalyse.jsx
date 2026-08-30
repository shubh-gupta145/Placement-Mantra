import { useState } from "react";
import axios from "../../axios.js";
import UploadForm from "../../components/UploadForm/UploadForm";
import Loader from "../../components/Loader/Loader";
import ResultsPanel from "../../components/ResultsPanel/ResultsPanel";
import styles from "./Home.module.css";

function ResumeAnalyse() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async ({ file, companyName, jobTitle, jobDescription }) => {
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await axios.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Analyze error:", err);
      setErrorMessage(
        err.response?.data?.message || "Scan fail ho gaya. Thodi der baad try karo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage("");
  };

  return (
    <main className={styles.main}>
      {!result && !loading && (
        <div className={styles.hero}>
          <span className={styles.eyebrow}>ATS COMPATIBILITY SCANNER</span>
          <h1 className={styles.heading}>
            Know your odds <span className={styles.headingAccent}>before</span> you hit apply
          </h1>
          <p className={styles.subtext}>
            Upload your resume and the job description — get an instant match score,
            gap analysis, and specific fixes to boost your shortlisting chances.
          </p>
        </div>
      )}

      <div className={styles.content}>
        {loading && <Loader />}
        {!loading && result && <ResultsPanel result={result} onReset={handleReset} />}
        {!loading && !result && (
          <UploadForm onSubmit={handleSubmit} loading={loading} errorMessage={errorMessage} />
        )}
      </div>
    </main>
  );
}

export default ResumeAnalyse;
