import styles from "./MockInterFace.module.css";
import Mic from "./Mic"
import Search_button from "./search_button";
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
</div>
</>
    );
}
export default MockInterFace;