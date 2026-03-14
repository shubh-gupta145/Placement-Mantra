import styles from "./CGPA.module.css";
import FAQSection from "../Home Page component/FAQSection";
import CGPAFAQ from "../../data/CGPAQues";
function CGPA(){
return(
<>
<div className={styles.container}>
    
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
        <p className={styles.Tipspara}>Focus on subjects with more credits as they have a greater impact on your CGPA. Allocate more study time to these subjects to maximize your overall grade.</p>
    </div>
    <div className={styles.TipContainer}>
        <h3>Tip 2: Use Active Learning Techniques</h3>
        <p className={styles.Tipspara}>Employ active learning methods like Active Recall and Spaced Repetition to enhance retention and understanding of the material.</p>
    </div>
    <div className={styles.TipContainer}>
        <h3>Tip 3: Practice with Previous Years' Papers</h3>
        <p className={styles.Tipspara}>Regularly practice with previous years' question papers to understand the exam pattern and improve your time management skills.</p>
    </div>
    <div className={styles.TipContainer}>
        <h3>Tip 4: Maintain a Consistent Study Routine</h3>
        <p className={styles.Tipspara}>Stick to a consistent study schedule rather than cramming at the last minute to ensure steady progress and better performance.</p>
    </div>
</div>
<FAQSection data={CGPAFAQ}/>
<div className={styles.ThirdContainer}>
    <h2>Here Are the Some Video For Increasing CGPA In the Short Time </h2>
<div className={styles.VideoContainer}>

    <div className={styles.Video1Container}>
        <p>Created By College Wallah</p>
        <a 
          href="https://www.youtube.com/watch?v=UttzVuaF-f0&t=16s&pp=ygUJY2dwYSB0aXBz" 
          target="_blank" 
          rel="noopener noreferrer"
        >
            <img 
              className={styles.image}
              src="./images/Video Thumbail/RaghavSir.png" 
              alt="College Wallah Video"
            />
        </a>
    </div>

    <div className={styles.Video2Container}>
        <p>Created By Apna College</p>
        <a 
          href="https://www.youtube.com/watch?v=EA5_PP9d-OQ&pp=ygUJY2dwYSB0aXBz" 
          target="_blank" 
          rel="noopener noreferrer"
        >
            <img 
              className={styles.image}
              src="./images/Video Thumbail/ShradhaDidi.png" 
              alt="Apna College Video"
            />
        </a>
    </div>

    <div className={styles.Video3Container}>
        <p>Created By Amar Sir</p>
        <a 
          href="https://www.youtube.com/watch?v=N5mvpJGyUQg&pp=ygUJY2dwYSB0aXBz" 
          target="_blank" 
          rel="noopener noreferrer"
        >
            <img 
              className={styles.image}
              src="./images/Video Thumbail/AmanSir.png" 
              alt="Amar Sir Video"
            />
        </a>
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