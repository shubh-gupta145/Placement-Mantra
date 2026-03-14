import Carsoul from "../Home Page component/Carsoul";
import Footar from "../Home Page component/Footar";
import Section from "../Home Page component/Section";
import styles from "./Home.module.css";
import Friday from "../Friday A.I/Friday";
import Feedback from "./feedback";
import FAQSection from "../Home Page component/FAQSection";
import placementFAQ from "../../data/PlacementPageQues";
import React, { useEffect } from "react";
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
<Friday/>
<FAQSection data={placementFAQ}/>
<Feedback/>
<Footar/>
</div>
</>
    );
}
export default Home;