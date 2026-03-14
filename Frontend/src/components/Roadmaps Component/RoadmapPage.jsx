import { useState } from "react";
import SkillsBtn from "./SkillsBtn";
import styles from "./RoadmapPage.module.css";
import FrontendRoadmap from "./Roadmaps/FrontedRoadmap";
import BackendRoadmap from "./Roadmaps/BackendRoadmap";
import FullStackRoadmap from "./Roadmaps/FullStackRoadmap";
import AIDeveloperRoadmap from "./Roadmaps/AIDeveloperRoadmap";
import MLDeveloperRoadmap from "./Roadmaps/MLDeveloperRoadmap";
import DataScientistRoadmap from "./Roadmaps/DataScientistRoadmap";
import DataAnalysisRoadmap from "./Roadmaps/DataAnalysisRoadmap";
import HackerRoadmap from "./Roadmaps/HackerRoadmap";
import CloudEngineerRoadmap from "./Roadmaps/CloudEngineerRoadmap";
import UIDesignerRoadmap from "./Roadmaps/UIDesignerRoadmap";
import PythonDeveloperRoadmap from "./Roadmaps/PythonDeveloperRoadmap";
import JavaDeveloperRoadmap from "./Roadmaps/JavaDeveloperRoadmap";

function RoadmapPage(){

const [selectedSkill,setSelectedSkill] = useState("frontend");

const roadmapComponents = {
frontend: <FrontendRoadmap/>,
backend: <BackendRoadmap/>,
fullstack: <FullStackRoadmap/>,
ai: <AIDeveloperRoadmap/>,
ml: <MLDeveloperRoadmap/>,
datascientist: <DataScientistRoadmap/>,
dataanalysis: <DataAnalysisRoadmap/>,
hacker: <HackerRoadmap/>,
cloud: <CloudEngineerRoadmap/>,
ui: <UIDesignerRoadmap/>,
python: <PythonDeveloperRoadmap/>,
java: <JavaDeveloperRoadmap/>
};

return(
<>
<div className={styles.Container}>

<div className={styles.JobTitleContainer}>
<SkillsBtn setSelectedSkill={setSelectedSkill}/>
</div>

<div className={styles.replyContainer}>
{roadmapComponents[selectedSkill]}
</div>

</div>
</>
);

}

export default RoadmapPage;