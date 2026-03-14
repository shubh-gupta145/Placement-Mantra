import { FaUpload } from "react-icons/fa";
import styles from "./Upload.module.css";
const handleUpload = async (file) => {

const formData = new FormData();

formData.append("resume", file);

const res = await fetch("http://localhost:5000/api/upload-resume", {
method: "POST",
body: formData
});

const data = await res.json();

console.log(data.questions);
}

const UploadFile = () => {
  return (
    <div className={styles.uploadWrapper}>
      {/* Hidden file input */}
      <input
        type="file"
        id="fileUpload"
        className={styles.fileInput}
      />

      {/* Upload icon */}
      <label htmlFor="fileUpload" className={styles.UploadIcon}>
        <FaUpload size={20} />
      </label>
    </div>
  );
};

export default UploadFile;
