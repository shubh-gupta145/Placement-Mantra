import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./ProfileEditPage.module.css";

function ProfileEditPage() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.Container}>
      
      {/* ================= PROFILE HEADER ================= */}
      <div className={styles.ProfileCarsoul}>
        <div className={styles.ImageWrapper}>
          <img
            src={image || "/default-profile.png"}
            alt="Profile"
            className={styles.ProfileImage}
          />

          <div className={styles.PlusIcon} onClick={handleImageClick}>
            <FaPlus />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className={styles.NameContainer}>
          <span className={styles.ProfileName}>Shubh Gupta</span>
          <span className={styles.ProfileId}>Profile ID: iQ1451546</span>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className={styles.MainInfoWrapper}>

        {/* -------- SMALL CONTAINER -------- */}
        <div className={styles.UserInfoContainer}>

          <div className={styles.subContainer}>
            <h4>Basic Info</h4>
          </div>

          <div className={styles.subContainer}>
            <span className={styles.InfoHeaders}>LinkedIn ID</span>
            <div className={styles.IDContainer}>
              <input
                type="text"
                placeholder="Enter Your LinkedIn ID"
                className={styles.InfoValue}
              />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer}>
            <span className={styles.InfoHeaders}>Leetcode ID</span>
            <div className={styles.IDContainer}>
              <input
                type="text"
                placeholder="Enter Your Leetcode ID"
                className={styles.InfoValue}
              />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer}>
            <span className={styles.InfoHeaders}>GitHub ID</span>
            <div className={styles.IDContainer}>
              <input
                type="text"
                placeholder="Enter Your GitHub ID"
                className={styles.InfoValue}
              />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

        </div>

        {/* -------- BIG CONTAINER -------- */}
        <div className={styles.EditContainer}>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Name</span>
            <div className={styles.valueContainer}>
              <input type="text" placeholder="Enter Your Name" className={styles.InfoValue} />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Email</span>
            <div className={styles.valueContainer}>
              <input type="email" placeholder="Enter Your Email" className={styles.InfoValue} />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Phone</span>
            <div className={styles.valueContainer}>
              <input type="number" placeholder="Enter Your Phone Number" className={styles.InfoValue} />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Gender</span>
            <div className={styles.valueContainer}>
              <select className={styles.InfoValue}>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Birthday</span>
            <div className={styles.valueContainer}>
              <input type="date" className={styles.InfoValue} />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Location</span>
            <div className={styles.valueContainer}>
              <input type="text" placeholder="Enter Your Location" className={styles.InfoValue} />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Summary</span>
            <div className={styles.valueContainer}>
              <input type="text" placeholder="Enter Your Summary" className={styles.InfoValue} />
            </div>
            <span className={styles.EditButton}>Edit</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileEditPage;