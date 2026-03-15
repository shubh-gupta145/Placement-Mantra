import styles from "./MockInterFace.module.css";
import Footar from "../Home Page component/Footar";
import MockInterviewWorkFlow from "./InterFace Components/MockInterviewWorkflow";
import MockEntry from "./InterFace Components/MockEntry";
import Header from "./InterFace Components/Header";
import FAQSection from "../Home Page component/FAQSection";
import MockFAQ from "../../data/MocksQues";
function MockInterFace(){
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