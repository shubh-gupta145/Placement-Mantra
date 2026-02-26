import styles from "./MockInterFace.module.css";
import Footar from "../Home Page component/Footar";
import MockInterviewWorkFlow from "./MockInterviewWorkflow";
import MockEntry from "./MockEntry";
import Header from "./header";
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