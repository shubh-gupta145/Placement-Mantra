import styles from "./SkillsBtn.module.css";
function SkillsBtn(){
    return(
<>
<div className={styles.SkillsContainer}>
<div className={styles.Skill}>Fronted developer</div>
<div className={styles.Skill}>Backend developer</div>
<div className={styles.Skill}>Full Stack developer</div>
<div className={styles.Skill}> A.I developer</div>
<div className={styles.Skill}> ML  developer</div>
<div className={styles.Skill}> Data Scientist</div>
<div className={styles.Skill}>Data Analysis</div>
<div className={styles.Skill}>Software Developer</div>
<div className={styles.Skill}>Software Engineer</div>
<div className={styles.Skill}>Hacker</div>
<div className={styles.Skill}>Cyber Security Expert</div>
<div className={styles.Skill}>Prompt Engineer</div>
</div>
</>
    );
}
export default SkillsBtn;