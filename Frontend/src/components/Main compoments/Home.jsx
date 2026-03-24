import Carsoul from "../HomePagecomponent/Carsoul";
import Footar from "../HomePagecomponent/Footar";
import Section from "../HomePagecomponent/Section";
import styles from "./Home.module.css";
import Friday from "../Friday A.I/Friday";
import FAQSection from "../HomePagecomponent/FAQSection";
import placementFAQ from "../../data/PlacementPageQues";
import EnglishSpeaking from "../English Speaking page/EnglishSpeaking";
import FeedbackForm from '../Admin Panel/Feedback/FeedbackForm';
function Home(){ 
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/test")
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  // }, []);
    return (
<>
<div className={styles.container}>
<Carsoul/>
<Section/>
<EnglishSpeaking/>
<Friday/>
<FAQSection data={placementFAQ}/>
<FeedbackForm/>
<Footar/>
</div>
</>
    );
}
export default Home;