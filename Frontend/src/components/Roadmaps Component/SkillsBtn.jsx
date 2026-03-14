import styles from "./SkillsBtn.module.css";

function SkillsBtn({setSelectedSkill}){

return(

<div className={styles.SkillsContainer}>

<div className={styles.Skill} onClick={()=>setSelectedSkill("frontend")}>Frontend Developer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("backend")}>Backend Developer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("fullstack")}>Full Stack Developer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("ai")}>AI Developer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("ml")}>ML Developer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("datascientist")}>Data Scientist</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("dataanalysis")}>Data Analysis</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("hacker")}>Hacker</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("cloud")}>Cloud Engineer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("ui")}>UI Designer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("python")}>Python Developer</div>

<div className={styles.Skill} onClick={()=>setSelectedSkill("java")}>Java Developer</div>

</div>

)

}

export default SkillsBtn;