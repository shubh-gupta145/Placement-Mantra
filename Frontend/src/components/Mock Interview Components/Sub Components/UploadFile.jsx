import { FaUpload } from "react-icons/fa";
import styles from "./Upload.module.css";

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
