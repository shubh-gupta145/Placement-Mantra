import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { FaUserEdit, FaSearch, FaChartLine, FaCheckCircle } from "react-icons/fa";
import styles from './InterFace.module.css';
import Footar from "../Home Page component/Footar";
import HeroCarousel from "./Carsoul";
import { useNavigate } from "react-router-dom";
function InterFace(){

const [topic, setTopic] = useState("");
const [difficulty, setDifficulty] = useState("");
const [name,setName] = useState("");
const navigate = useNavigate();

const handleSubmit = async(e) => {

e.preventDefault();

try{

const response = await fetch("http://localhost:5000/start-test",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
topic,
difficulty
})

});

const data = await response.json();

console.log(data); // debug

navigate("/Tests",{state:data});

}
catch(error){

console.log("Error:",error);

}

};
  return(
    <div className={styles.Container}>
      
      <HeroCarousel/>

      {/* ✅ Test Process Section */}
      <div className={styles.SecondContainer}>
        <h2 className={styles.sectionTitle}>How Our Test System Work</h2>
        <p className={styles.sectionSubtitle}>
          Follow these simple steps to analyze and improve your Programming Skills for better job opportunities.
        </p>

        <div className={styles.stepsWrapper}>

          <div className={styles.stepCard}>
            <FaUserEdit className={styles.icon}/>
            <h3>Fill Details</h3>
            <p>Please Fill The Full Form To Give The Test.</p>
          </div>

          <div className={styles.stepCard}>
            <FaSearch className={styles.icon}/>
            <h3>Attempt All The Questions</h3>
            <p>Attempt all the questions in the test to get a complete analysis.</p>
          </div>

          <div className={styles.stepCard}>
            <FaCheckCircle className={styles.icon}/>
            <h3> Results</h3>
            <p>In This Result You Find Your Mistake And Your Test Score.</p>
          </div>

        </div>
      </div>
<div className={styles.TestContainer}>
  <div className={styles.TestContainerContent}>
    <h1>Fill The Following Details</h1>
<form onSubmit={handleSubmit} className={styles.form}>

<input type="text" placeholder="Enter Your Name"className={styles.inputField} onChange={(e)=>setName(e.target.value)}/>

<select
className={styles.selectField}
onChange={(e)=>setTopic(e.target.value)}
>

<option value="">Select Topic</option>
<option value="DSA">DSA Based Theory Question</option>
<option value="Web">Web Development</option>
<option value="Aptitude">Aptitue</option>
<option value="Programming">Programming Language Question</option>

</select>
<select
className={styles.selectField}
onChange={(e)=>setDifficulty(e.target.value)}
>
<option value="">Select Difficulty</option>
<option value="easy">Easy</option>
<option value="medium">Medium</option>
<option value="hard">Hard</option>
<option value="expert">Expert</option>

</select>
    <button type="Submit" className={styles.submitButton}>
      Submit <FaArrowRight/>
    </button>
</form>
  </div>
</div>
<Footar/>
    </div>
  );
}

export default InterFace;