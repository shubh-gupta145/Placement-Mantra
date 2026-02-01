import { BrowserRouter, Routes, Route } from "react-router-dom";
import CGPA from "./components/CGPA Components/CGPA";
import VideoPlaylist from "./components/Coding Video Playlist Page/VideoPlaylist";
import Friday from "./components/Friday A.I/Friday";
import FridayInterFace from "./components/Friday A.I/FridayInterFace";
import LogInSignUp from "./components/Login Components/LogInSignUp";
import Home from "./components/Main compoments/Home";
import MockInterview from "./components/Mock Interview Components/MockInterview";
import Profile from "./components/Profile Components/Profile";
import ProfileEditPage from "./components/Profile Components/ProfileEditPage";
import InterFace from "./components/Programming Test Page/InterFace";
import ProgrammingCarsoul from "./components/Programming Test Page/ProgrammingCarsoul";
import TestPage from "./components/Programming Test Page/TestPage";
import NavBar from "./components/Home Page component/NavBar";
import AboutUs from "./components/Main compoments/About";

function App(){
    return (
    <>
        <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Mocks" element={<MockInterview />} />
        <Route path="/CGPA" element={<CGPA />} />
        <Route path="/Tests" element={<TestPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/SignUp" element={<LogInSignUp />} />
      </Routes>

    </BrowserRouter>
</>
);
}
export default App;