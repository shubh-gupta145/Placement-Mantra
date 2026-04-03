import { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileEditPage.module.css";

function ProfileEditPage() {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name:"",
    email:"",
    phone:"",
    gender:"",
    birthday:"",
    location:"",
    summary:"",
    github:"",
    linkedin:"",
    leetcode:"",
    image:""
  });

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  /* ================= LOAD PROFILE DATA ================= */

  useEffect(()=>{
    const email = localStorage.getItem("email") || localStorage.getItem("userEmail");
    if(!email) return;

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/get-profile/${email}`)
    .then(res=>res.json())
    .then(data=>{
      if(data){
        setProfileData({ ...data, email: email });
        setImage(data.image);
      }
    });
  },[]);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e)=>{
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE ================= */

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // ✅ FIXED - Base64 conversion
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result; // ✅ Permanent base64 string

        setImage(base64Image);
        setProfileData(prev => ({
          ...prev,
          image: base64Image // ✅ Server pe save hoga
        }));
      };

      reader.readAsDataURL(file); // ✅ File ko base64 mein convert karo
    }
  };

  /* ================= SAVE PROFILE ================= */

  const handleSubmit = async ()=>{
    const email = localStorage.getItem("email") || localStorage.getItem("userEmail");

    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/update-profile/${email}`,{
        method:"PUT",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(profileData)
      });

      await res.json();
      alert("Profile Updated Successfully ✅");
      navigate("/profile");
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className={styles.Container}>
      
      {/* PROFILE HEADER */}
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
          <span className={styles.ProfileName}>{profileData.name}</span>
          <span className={styles.ProfileId}>Profile ID</span>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className={styles.MainInfoWrapper}>

        <div className={styles.UserInfoContainer}>

          <div className={styles.subContainer}>
            <h4>Basic Info</h4>
          </div>

          <div className={styles.subContainer}>
            <span className={styles.InfoHeaders}>LinkedIn ID</span>
            <div className={styles.IDContainer}>
              <input
                type="text"
                name="linkedin"
                value={profileData.linkedin}
                onChange={handleChange}
                placeholder="Enter Your LinkedIn ID"
                className={styles.InfoValue}
              />
            </div>
          </div>

          <div className={styles.subContainer}>
            <span className={styles.InfoHeaders}>Leetcode ID</span>
            <div className={styles.IDContainer}>
              <input
                type="text"
                name="leetcode"
                value={profileData.leetcode}
                onChange={handleChange}
                placeholder="Enter Your Leetcode ID"
                className={styles.InfoValue}
              />
            </div>
          </div>

          <div className={styles.subContainer}>
            <span className={styles.InfoHeaders}>GitHub ID</span>
            <div className={styles.IDContainer}>
              <input
                type="text"
                name="github"
                value={profileData.github}
                onChange={handleChange}
                placeholder="Enter Your GitHub ID"
                className={styles.InfoValue}
              />
            </div>
          </div>

        </div>

        <div className={styles.EditContainer}>

          {["name","email","phone","location","summary"].map((field)=>(
            <div key={field} className={styles.subContainer2}>
              <span className={styles.InfoHeaders}>
                {field.charAt(0).toUpperCase()+field.slice(1)}
              </span>
              <div className={styles.valueContainer}>
                <input
                  type="text"
                  name={field}
                  value={profileData[field]}
                  onChange={handleChange}
                  placeholder={`Enter Your ${field}`}
                  className={styles.InfoValue}
                />
              </div>
            </div>
          ))}

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Gender</span>
            <div className={styles.valueContainer}>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className={styles.InfoValue}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className={styles.subContainer2}>
            <span className={styles.InfoHeaders}>Birthday</span>
            <div className={styles.valueContainer}>
              <input
                type="date"
                name="birthday"
                value={profileData.birthday}
                onChange={handleChange}
                className={styles.InfoValue}
              />
            </div>
          </div>

          <button onClick={handleSubmit} className={styles.saveBtn}>
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileEditPage;