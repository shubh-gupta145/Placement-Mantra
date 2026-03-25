import styles from "./MockInterFace.module.css";
import MockInterviewWorkFlow from "./InterFace Components/MockInterviewWorkflow";
import MockEntry from "./InterFace Components/MockEntry";
import Header from "./InterFace Components/Header";
import FAQSection from "../HomePagecomponent/FAQSection";
import MockFAQ from "../../data/MocksQues";
import useFeatureTrack from '../../utils/useFeatureTrack';
import Footer from "../HomePagecomponent/Footar";
import FeedbackPopup from "../HomePagecomponent/Feedbackpopup";
function MockInterFace(){
     useFeatureTrack('mock-interview'); 
    return(
        <>
        <FeedbackPopup currentFeature="Mock Interview" />
<div className={styles.container}>
  <Header/>
  <MockInterviewWorkFlow/>
  <MockEntry/>
<FAQSection data={MockFAQ}/>
<Footer/>

</div>
</>
    );
}
export default MockInterFace;