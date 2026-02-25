import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from './ProfileEditPage.module.css';

function ProfileEditPage(){ 

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

    return(
        <>
        <div className={styles.Container}>

        <div className={styles.ProfileCarsoul}>
            
            {/* Image Wrapper */}
            <div className={styles.ImageWrapper}>
                <img 
                    src={image || "/default-profile.png"} 
                    alt="Profile Picture" 
                    className={styles.ProfileImage}
                />

                {/* Plus Icon */}
                <div 
                    className={styles.PlusIcon}
                    onClick={handleImageClick}
                >
                    <FaPlus />
                </div>

                {/* Hidden Input */}
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{display:"none"}}
                />
            </div>

            <div className={styles.NameContainer}>
                <span className={styles.ProfileName}>Shubh Gupta</span>
                <span className={styles.ProfileId}>Profile ID:iQ1451546</span>
            </div>

        </div>

        <div className={styles.UserInfoContainer}>
            <div className={styles.subContainer}>
                <h4>Basic Info</h4>
            </div>

            <div className={styles.EditContainer}>

                {/* Your existing fields remain unchanged */}

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Name</span>
                    <div className={styles.valueContainer}>
                        <input type="text" placeholder="Enter The Your Name " className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Email</span>
                    <div className={styles.valueContainer}>
                        <input type="email" placeholder="Enter The Your EmailID " className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Phone</span>
                    <div className={styles.valueContainer}>
                     <input type="number" placeholder="Enter The Your Phone Number " className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Gender</span>
                    <div className={styles.valueContainer}>
                     <input type="" placeholder="Select Your Gender" className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Birthday</span>
                    <div className={styles.valueContainer}>
                     <input type="date" placeholder="Enter The Your Birth Date " className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Location</span>
                    <div className={styles.valueContainer}>
                     <input type="text" placeholder="Enter The Your Name " className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

                <div className={styles.subContainer2}>
                    <span className={styles.InfoHeaders}>Summary</span>
                    <div className={styles.valueContainer}>
                         <input type="text" placeholder="Enter The Your Name " className={styles.InfoValue}/>
                    </div>
                    <span className={styles.EditButton}>Edit</span>
                </div>

            </div>
        </div>

        </div>
        </>
    )
}
export default ProfileEditPage;