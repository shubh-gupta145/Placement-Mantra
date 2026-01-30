import styles from './ProfileEditPage.module.css';
function ProfileEditPage(){ 
    return(
        <>
        <div className={styles.Container}>
        <div className={styles.ProfileCarsoul}>
    <img src="/" alt="Profile Picture" className={styles.ProfileImage}/>
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
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Name</span>
<div className={styles.valueContainer}>
<span className={styles.InfoValue}>Shubh Gupta</span>
</div>
<span className={styles.EditButton}>Edit</span>
</div>
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Email</span>
<div className={styles.valueContainer}>
<span className={styles.InfoValue}>shubh.gupta@example.com</span>
</div>
<span className={styles.EditButton}>Edit</span>
</div>
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Phone</span>
<div className={styles.valueContainer}>
<span className={styles.InfoValue}>+91 9876543210</span>
</div>
<span className={styles.EditButton}>Edit</span>
</div>
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Gender</span>
<div className={styles.valueContainer}>
<span className={styles.InfoValue}>Male</span>
</div>
<span className={styles.EditButton}>Edit</span>
</div>
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Birthday</span>
<div className={styles.valueContainer}>
    <span className={styles.InfoValue}>15th June 1998</span>
</div>
<span className={styles.EditButton}>Edit</span>
</div>
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Location</span>
<div className={styles.valueContainer}>
<span className={styles.InfoValue}>Trams Yamuna Colony</span>
</div>
<span className={styles.EditButton}>Edit</span>
</div>
<div className={styles.subContainer2}>
<span className={styles.InfoHeaders}>Summary</span>
<div className={styles.valueContainer}>
<span className={styles.InfoValue}>This is my First Time I am Create My id in placement mantra</span>
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