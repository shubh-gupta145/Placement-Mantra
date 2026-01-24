import styles from "./CGPA.module.css";
import FAQSection from "../Home Page component/FAQSection";
import NavBar from "../Home Page component/NavBar";
function CGPA(){
return(
<>
<div className={styles.container}>
    <NavBar/>
            <h1 className={styles.heading}>How we are increasing CGPA</h1>
    <div className={styles.FirstContainer}>
        <p className={styles.para}> To increase your CGPA, you should prioritize high-credit subjects and ensure you score maximum marks in internal assessments, assignments, and attendance, as these provide a vital safety net for your overall grade. Rather than passive reading, utilize active learning techniques like Active Recall and Spaced Repetition, while consistently practicing with previous years' question papers to understand exam patterns. During exams, focus on clear presentation by using diagrams and headings to make your answers more readable for the examiner. Ultimately, maintaining a consistent study routine rather than last-minute cramming will help you achieve a higher SGPA each term, which is the most effective way to steadily lift your cumulative average.</p>
        <div className={styles.ImageContainer}>
<img src='/images/CGPAIncreasePicture.jpg' className={styles.Image} alt="CGPA Increase Image"/>
        </div>
</div>
<h2 className={styles.heading}>CGPA Increase Tips And Tricks</h2>
<div className={styles.SecondContainer}>
    <div className={styles.TipContainer}>
        <h3>Tip 1: Prioritize High-Credit Subjects</h3>
        <p>Focus on subjects with more credits as they have a greater impact on your CGPA. Allocate more study time to these subjects to maximize your overall grade.</p>
    </div>
    <div className={styles.TipContainer}>
        <h3>Tip 2: Use Active Learning Techniques</h3>
        <p>Employ active learning methods like Active Recall and Spaced Repetition to enhance retention and understanding of the material.</p>
    </div>
    <div className={styles.TipContainer}>
        <h3>Tip 3: Practice with Previous Years' Papers</h3>
        <p>Regularly practice with previous years' question papers to understand the exam pattern and improve your time management skills.</p>
    </div>
    <div className={styles.TipContainer}>
        <h3>Tip 4: Maintain a Consistent Study Routine</h3>
        <p>Stick to a consistent study schedule rather than cramming at the last minute to ensure steady progress and better performance.</p>
    </div>
</div>
<FAQSection/>
<div className={styles.ThirdContainer}>
    <h2>Here Are the Some Video Links For Increasing CGPA in the Short Time </h2>
    <div className={styles.VideoContainer}>
        <div className={styles.Video1Container}>
            <p>Created By Apna College</p>
            <img src='' alt="Video Thumbnail"/>
        </div>
        <div className={styles.Video2Container}>
            <p>Created By Nishant Chara</p>
            <img src='' alt="Video Thumbnail"/>
        </div>
        <div className={styles.Video3Container}>
            <p>Created By Code With Harry </p>
            <img src='' alt="Video Thumbnail"/>
        </div>
    </div>
<div className="CalgulateContainer">
    {/* Logic */}
</div>
</div>
</div>
</>
);
}
export default CGPA;