import styles from "./Profile.module.css";
function Profile(){
    return(
<>
<div className={styles.container}>
<div className={styles.First_container}>
<div className={styles.imageContainer}>
<img src="" alt="Profile Picture"/>
</div>
<span className={styles.span}>shubh Gupta</span> 
<p>Hello coder my name is shubh gupta. I am the software developer I am create Very excited project like Placement Mantra Resume Craft and Pocket manger.</p>
<button className={styles.button}>Edit Profile</button>
<div className={styles.listContainer}>
<ul>
    <li> India </li>
    <li> M.P.S College </li>
    <li> Git Hub Profile</li>
    <li> Linkdin Profile</li>
    <li> Leetcode Profile</li>
</ul>
<span className={styles.span}>Skills java python</span>
</div>
</div>
<div className={styles.Second_container}>

</div>
</div>
</>
    );
}
export default Profile;