import SkillsBtn from "./SkillsBtn";
import AIDeveloperRoadmap from "./Roadmaps/AIDeveloperRoadmap";
import styles from "./RoadmapPage.module.css";
import BackendRoadmap from "./Roadmaps/BackendRoadmap";
import FrontedRoadmap from "./Roadmaps/FrontedRoadmap";
import FullStackRoadmap from "./Roadmaps/FullStackRoadmap";
import MLDeveloperRoadmap from "./Roadmaps/MLDeveloperRoadmap";
import DataScientistRoadmap from "./Roadmaps/DataScientistRoadmap";
function RoadmapPage(){
return(
    <>
    <div className={styles.Container}>
        <div className={styles.JobTitleContainer}>
<SkillsBtn/>
        </div>
        <div className={styles.replyContainer}>
{/* <FrontedRoadmap/> */}
{/* <BackendRoadmap/> */}
{/* <FullStackRoadmap/> */}
{/* <AIDeveloperRoadmap/> */}
{/* <MLDeveloperRoadmap/> */}
<DataScientistRoadmap/>
        </div>
    </div>
    </>
);
}
export default RoadmapPage;