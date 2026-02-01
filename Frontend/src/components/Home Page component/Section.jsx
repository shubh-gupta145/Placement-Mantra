import styles from "./Section.module.css";
function Section(){
    return(
<>
<div className={styles.wrapper_Container}>
<div className={styles.container}>
    <div className={styles.box1}>
    <h3 className={styles.heading}>Roadmaps</h3>
    <p className={styles.para}>In This Page You Will Find Roadmaps For All The Technologies.</p>
    <button className={styles.button}><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3 className={styles.heading} >Free Courses Playlists</h3>
    <p className={styles.para}>In This Page You Will Find Free Courses Playlists.</p>
    <button className={styles.button}> <a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3 className={styles.heading}>Internship And Placement</h3>
    <p className={styles.para}>In This Page You Will Find Internship And Placement Details.</p>
    <button className={styles.button}><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3 className={styles.heading}>Test You Skill</h3>
    <p className={styles.para}>In this Page You Will Give Tests To Improve Your Skills.</p>
    <br/>
    <button className={styles.button}><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3 className={styles.heading}> Good CGPA Tricks </h3>
    <p className={styles.para}>In This Page You Will Find Good CGPA Tricks.</p>
    <button className={styles.button}><a href="#">Explore Now</a></button>
</div>
<div className={styles.box1}>
    <h3 className={styles.heading}>Tech News</h3>
    <p className={styles.para}>In This Page You Will Find Latest Tech News.</p>
    <button className={styles.button}><a href="#">Explore Now</a></button>
</div>
</div>
</div>
</>
    );
}
export default Section;