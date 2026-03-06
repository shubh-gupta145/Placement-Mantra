import SkillsBtn from "./SkillsBtn";
import styles from "./RoadmapPage.module.css";
import DataScientistRoadmap from "./Roadmaps/DataScientistRoadmap";
function RoadmapPage(){
return(
    <>
    <div className={styles.Container}>
        <div className={styles.JobTitleContainer}>
<SkillsBtn/>
        </div>
        <div className={styles.replyContainer}>
<DataScientistRoadmap/>
        </div>
    </div>
    </>
);
}
export default RoadmapPage;