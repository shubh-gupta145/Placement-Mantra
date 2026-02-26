import { BrowserRouter, Routes, Route } from "react-router-dom";
import CGPA from "./components/CGPA Components/CGPA";
import Home from "./components/Main compoments/Home";
import TestPage from "./components/Programming Test Page/TestPage";
import InterFace from "./components/Programming Test Page/InterFace";
import NavBar from "./components/Home Page component/NavBar";
import AboutUs from "./components/Main compoments/About";
import MockInterFace from "./components/Mock Interview Components/MockInterFace";
import Friday from "./components/Friday A.I/Friday";
import FridayInterFace from "./components/Friday A.I/FridayInterFace"
import Profile from "./components/Profile Components/Profile"
import ProfileEditPage from "./components/Profile Components/ProfileEditPage"
import VideoPlaylist from "./components/Coding Video Playlist Page/VideoPlaylist"
import MockEntry from "./components/Mock Interview Components/MockEntry";
import InterviewPage from "./components/Mock Interview Components/InterviewPage2";
import CameraView from "./components/Mock Interview Components/CameraView";
import SpeechToText from "./components/Mock Interview Components/SpeechToText";
import InterviewPage2 from "./components/Mock Interview Components/InterviewPage2";
import MockInterview from "./components/Mock Interview Components/Mobile Version/MockInterview";
import RoadmapPage from "./components/Roadmaps Component/RoadmapPage";
import InterFaceInPl from "./components/Internship And Placemnet Calaender/InterFaceIn&Pl";
import News from "./components/Tech News Page/News";
import Feedback from "./components/Main compoments/feedback";
import SignIn from "./components/Login Components/SignIn";
import SignUp from "./components/Login Components/SignUp";
function App(){
    return (
      <>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MockInterFace" element={<MockInterFace />} />
            <Route path="/MockInterview" element={<InterviewPage2/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
            <Route path="/CGPA" element={<CGPA />} />
            <Route path="/Tests" element={<InterFace />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/Friday" element={<FridayInterFace/>}/>
            <Route path="/Roadmaps" element={<RoadmapPage/>}/>
            <Route path="/FreeCoursePlaylist" element={<VideoPlaylist/>}/>
            <Route path="/Internship" element={<InterFaceInPl/>}/>
            <Route path='/TestInterFace' element={<InterFace/>}/>
            <Route path='/Tests' element={<TestPage/>}/>
            <Route path="/TechNewes" element={<News/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="EditProfile" element={<ProfileEditPage/>}/>
          </Routes>
        </BrowserRouter>
      </> 
    );
}
export default App;