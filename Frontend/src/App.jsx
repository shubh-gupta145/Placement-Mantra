import { Routes, Route } from "react-router-dom";

import CGPA from "./components/CGPA Components/CGPA";
import Home from "./components/Main compoments/Home";
import TestPage from "./components/Programming Test Page/TestPage";
import InterFace from "./components/Programming Test Page/InterFace";
import NavBar from "./components/Home Page component/NavBar";
import AboutUs from "./components/Main compoments/About";
import MockInterFace from "./components/Mock Interview Components/MockInterFace";
import FridayInterFace from "./components/Friday A.I/FridayInterFace";
import Profile from "./components/Profile Components/Profile";
import ProfileEditPage from "./components/Profile Components/ProfileEditPage";
import VideoPlaylist from "./components/Coding Video Playlist Page/VideoPlaylist";
import InterviewPage2 from "./components/Mock Interview Components/InterFace Components/InterviewPage2";
import RoadmapPage from "./components/Roadmaps Component/RoadmapPage";
import InterFaceInPl from "./components/Internship And Placemnet Calaender/InterFaceIn&Pl";
import News from "./components/Tech News Page/News";
import SignIn from "./components/Login Components/SignIn";
import SignUp from "./components/Login Components/SignUp";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MockInterFace" element={<MockInterFace />} />
        <Route path="/MockInterview" element={<InterviewPage2 />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/CGPA" element={<CGPA />} />
        <Route path="/Tests" element={<TestPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Friday" element={<FridayInterFace />} />
        <Route path="/Roadmaps" element={<RoadmapPage />} />
        <Route path="/FreeCoursePlaylist" element={<VideoPlaylist />} />
        <Route path="/Internship" element={<InterFaceInPl />} />
        <Route path="/TestInterFace" element={<InterFace />} />
        <Route path="/TechNewes" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/EditProfile" element={<ProfileEditPage />} />
      </Routes>
    </>
  );
}

export default App;