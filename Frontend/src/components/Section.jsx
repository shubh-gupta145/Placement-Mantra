import styles from "./Section.module.css";
function Section(){
    return(
<>
<div className={styles.container}>
    <div className={styles.box1}>
    <h3>Roadmaps</h3>
    <p><center>In This Page You Will Find Roadmaps For All The Technologies</center></p>
    <button><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3>Free Courses Playlists</h3>
    <p><center>In This Page You Will Find Free Courses Playlists.</center></p>
    <button> <a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3>Internship And Placement</h3>
    <p><center>In This Page You Will Find Internship And Placement Details.</center></p>
    <button><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3>Test You Skill</h3>
    <p><center>In this Page You Will Give Tests To Improve Your Skills.</center></p>
    <br/>
    <button><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3> Good CGPA Tricks </h3>
    <p><center>In This Page You Will Find Good CGPA Tricks.</center></p>
    <button><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3>Tech News</h3>
    <p><center>In This Page You Will Find Latest Tech News.</center></p>
    <button><a href="#">Explore Now</a></button>
</div>
</div>
</>
    );
}
export default Section;