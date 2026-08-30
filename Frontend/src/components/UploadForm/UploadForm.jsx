import { useRef, useState } from "react";
import styles from "./UploadForm.module.css";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function UploadForm({ onSubmit, loading, errorMessage }) {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileError, setFileError] = useState("");
  const [touched, setTouched] = useState(false);

  const validateAndSetFile = (candidate) => {
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setFileError("Sirf PDF ya DOCX file allowed hai");
      return;
    }
    if (candidate.size > 5 * 1024 * 1024) {
      setFileError("File size 5MB se kam honi chahiye");
      return;
    }
    setFileError("");
    setFile(candidate);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!file || !companyName.trim() || jobDescription.trim().length < 50) {
      return;
    }

    onSubmit({
      file,
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      jobDescription: jobDescription.trim(),
    });
  };

  const jdTooShort = jobDescription.trim().length > 0 && jobDescription.trim().length < 50;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {/* ── Resume Upload ── */}
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""} ${
            file ? styles.dropzoneFilled : ""
          } ${touched && !file ? styles.dropzoneError : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            hidden
            onChange={(e) => validateAndSetFile(e.target.files?.[0])}
          />

          {!file ? (
            <>
              <div className={styles.dropIcon}>⇪</div>
              <p className={styles.dropTitle}>Drop resume here or click to browse</p>
              <p className={styles.dropHint}>PDF or DOCX · max 5MB</p>
            </>
          ) : (
            <>
              <div className={styles.fileIcon}>✓</div>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.dropHint}>{(file.size / 1024).toFixed(0)} KB · click to replace</p>
            </>
          )}
        </div>
        {fileError && <p className={styles.fieldError}>{fileError}</p>}
        {touched && !file && !fileError && (
          <p className={styles.fieldError}>Resume upload karna zaroori hai</p>
        )}

        {/* ── Company + Job Title ── */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              className={`${styles.input} ${touched && !companyName.trim() ? styles.inputError : ""}`}
              placeholder="e.g. Google, TCS, Zomato"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              maxLength={100}
            />
            {touched && !companyName.trim() && (
              <p className={styles.fieldError}>Company name zaroori hai</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="jobTitle">
              Job Title <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="jobTitle"
              type="text"
              className={styles.input}
              placeholder="e.g. Frontend Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              maxLength={100}
            />
          </div>
        </div>

        {/* ── Job Description ── */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="jobDescription">
              Job Description
            </label>
            <span className={styles.charCount}>{jobDescription.length} chars</span>
          </div>
          <textarea
            id="jobDescription"
            className={`${styles.textarea} ${jdTooShort || (touched && !jobDescription.trim()) ? styles.inputError : ""}`}
            placeholder="Paste the full job description here — responsibilities, required skills, qualifications..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
          />
          {touched && !jobDescription.trim() && (
            <p className={styles.fieldError}>Job description zaroori hai</p>
          )}
          {jdTooShort && (
            <p className={styles.fieldError}>Kam se kam 50 characters ki JD paste karo</p>
          )}
        </div>
      </div>

      {errorMessage && <div className={styles.apiError}>{errorMessage}</div>}

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner} /> Scanning...
          </>
        ) : (
          "Run ATS Scan"
        )}
      </button>
    </form>
  );
}

export default UploadForm;
