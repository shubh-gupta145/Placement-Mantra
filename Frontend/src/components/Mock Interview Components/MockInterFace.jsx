import styles from "./MockInterFace.module.css";
import Footar from "../Home Page component/Footar";
import MockInterviewWorkFlow from "./InterFace Components/MockInterviewWorkflow";
import MockEntry from "./InterFace Components/MockEntry";
import Header from "./InterFace Components/Header";
import FAQSection from "../Home Page component/FAQSection";
function MockInterFace(){
    return(
<>
<div className={styles.container}>
  <Header/>
  <MockInterviewWorkFlow/>
  <MockEntry/>
<FAQSection/>
<Footar/>

</div>
</>
    );
}
export default MockInterFace;