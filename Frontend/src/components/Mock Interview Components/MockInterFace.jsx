import styles from "./MockInterFace.module.css";
import Footar from "../HomePagecomponent/Footar";
import MockInterviewWorkFlow from "./InterFace Components/MockInterviewWorkflow";
import MockEntry from "./InterFace Components/MockEntry";
import Header from "./InterFace Components/Header";
import FAQSection from "../HomePagecomponent/FAQSection";
import MockFAQ from "../../data/MocksQues";
import useFeatureTrack from '../../utils/useFeatureTrack';
function MockInterFace(){
     useFeatureTrack('mock-interview'); 
    return(
        <>
<div className={styles.container}>
  <Header/>
  <MockInterviewWorkFlow/>
  <MockEntry/>
<FAQSection data={MockFAQ}/>
<Footar/>

</div>
</>
    );
}
export default MockInterFace;