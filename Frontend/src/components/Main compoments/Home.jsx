import Carsoul from "../Home Page component/Carsoul";
import FAQSection from "../Home Page component/FAQSection";
import Footar from "../Home Page component/Footar";
import NavBar from "../Home Page component/NavBar";
import Section from "../Home Page component/Section";
import ResumeCarsoul from "../Home Page component/ResumeCarsoul";
import styles from "./Home.module.css";
import Friday from "../Friday A.I/Friday";
import Feedback from "./feedback";
import React, { useEffect } from "react";
function Home(){

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);
    return (
<>
<div className={styles.container}>
<Carsoul/>
<Section/>
<Friday/>
<ResumeCarsoul/>
<FAQSection/>
<Feedback/>
<Footar/>
</div>
</>
    );
}
export default Home;