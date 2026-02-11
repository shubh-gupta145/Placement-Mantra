import { BrowserRouter, Routes, Route } from "react-router-dom";
import CGPA from "./components/CGPA Components/CGPA";
import LogInSignUp from "./components/Login Components/LogInSignUp";
import Home from "./components/Main compoments/Home";
import TestPage from "./components/Programming Test Page/TestPage";
import NavBar from "./components/Home Page component/NavBar";
import AboutUs from "./components/Main compoments/About";
import MockInterFace from "./components/Mock Interview Components/MockInterFace";
import Friday from "./components/Friday A.I/Friday";
import FridayInterFace from "./components/Friday A.I/FridayInterFace"
import MockEntry from "./components/Mock Interview Components/MockEntry";
import InterviewPage from "./components/Mock Interview Components/InterviewPage2";
import InterviewPage1 from "./components/Mock Interview Components/InterviewPage1";
import CameraView from "./components/Mock Interview Components/CameraView";
import SpeechToText from "./components/Mock Interview Components/SpeechToText";
import SkillsBtn from "./components/Friday A.I/SkillsBtn";
import InterviewPage2 from "./components/Mock Interview Components/InterviewPage1";
import MockInterview from "./components/Mock Interview Components/Mobile Version/MockInterview";

function App(){
    return (
      <>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Mocks" element={<MockInterFace />} />
            <Route path="/CGPA" element={<CGPA />} />
            <Route path="/Tests" element={<TestPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/SignUp" element={<LogInSignUp />} />
            <Route path="/Friday" element={<FridayInterFace/>}/>
            <Route path="/MockInterview" element={<InterviewPage1/>}/>
          </Routes>
        </BrowserRouter>
      </> 
    );
}
export default App;