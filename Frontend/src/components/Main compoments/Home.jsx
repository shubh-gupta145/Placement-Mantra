import Carsoul from "../HomePagecomponent/Carsoul";
import Footar from "../HomePagecomponent/Footar";
import Section from "../HomePagecomponent/Section";
import styles from "./Home.module.css";
import Friday from "../Friday A.I/Friday";
import FAQSection from "../HomePagecomponent/FAQSection";
import placementFAQ from "../../data/PlacementPageQues";
import EnglishSpeaking from "../English Speaking page/EnglishSpeaking";
import Feedbackpopup from '../HomePagecomponent/Feedbackpopup';
import axios from "../../axios.js"; 
import ResumeHero from "../HomePagecomponent/ResumeHero.jsx";
import ResumeAnalyse from "../../ResumeAnalyse.jsx";

function Home(){ 
    return (
<>
<div className={styles.container}>
<Carsoul/>
<Section/>
<EnglishSpeaking/>
<Friday/>
<FAQSection data={placementFAQ}/>
<Feedbackpopup currentFeature="aptitude" />
<ResumeAnalyse/>
<ResumeHero/>
<Footar/>
</div>
</>
    );
}
export default Home;