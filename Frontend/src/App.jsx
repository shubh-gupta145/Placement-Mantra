import { Routes, Route, Navigate } from "react-router-dom";
import CGPA from "./components/CGPA Components/CGPA";
import Home from "./components/Main compoments/Home";
import TestPage from "./components/Programming Test Page/TestPage";
import InterFace from "./components/Programming Test Page/InterFace";
import NavBar from "./components/HomePagecomponent/NavBar";
import AboutUs from "./components/Main compoments/About";
import MockInterFace from "./components/Mock Interview Components/MockInterFace";
import FridayInterFace from "./components/Friday A.I/FridayInterFace";
import Profile from "./components/Profile Components/Profile";
import ProfileEditPage from "./components/Profile Components/ProfileEditPage";
import VideoPlaylist from "./components/Coding Video Playlist Page/VideoPlaylist";
import InterviewPage2 from "./components/Mock Interview Components/InterFace Components/InterviewPage2";
import RoadmapPage from "./components/Roadmaps Component/RoadmapPage";
import News from "./components/Tech News Page/News";
import SignIn from "./components/Login Components/SignIn";
import SignUp from "./components/Login Components/SignUp";
import ForgetPassword from "./components/Login Components/ForgetPassword";
import ResetPassword from "./components/Login Components/ResetPassword";
import InterFaceIntern from "./components/Internship And Placemnet Calaender/InterFaceIntern";
import InterviewResult from "./components/Mock Interview Components/InterFace Components/InterviewResult";
import AdminLayout from './components/Admin Panel/AdminLayout';
import Dashboard from './components/Admin Panel/Dashboard';
import Notifications from './components/Admin Panel/Notifications';
import Users from './components/Admin Panel/Users';
import Attendance from './components/Admin Panel/Attendance';
import Analytics from './components/Admin Panel/Analytics';
import FeedbackPage from './components/Admin Panel/FeedbackPage';
import NotFoundPage from "./components/Main compoments/404";

const AdminGuard = ({ children }) => {
  const token = localStorage.getItem('pm_admin_token');
  const user = JSON.parse(localStorage.getItem('pm_admin_user') || '{}');
  if (!token || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <NavBar />
      <Routes>
{/* Admin login page — ab seedha /signin se hoga */}
{/* Agar koi /admin/login pe jaye toh /signin pe bhejo */}
<Route path="/admin/login" element={<Navigate to="/signin" replace />} />

<Route path="/admin" element={
  <AdminGuard>
    <AdminLayout />
  </AdminGuard>
}>
  <Route index               element={<Dashboard />}     />
  <Route path="notifications" element={<Notifications />} />
  <Route path="users"         element={<Users />}         />
  <Route path="attendance"    element={<Attendance />}    />
  <Route path="analytics"     element={<Analytics />}     />
  <Route path="feedback"      element={<FeedbackPage />}  />
</Route>
<Route path="/" element={<Home />} />
<Route path="/MockInterFace" element={<MockInterFace />} />
<Route path="/MockInterview" element={<InterviewPage2 />} />
<Route path="/InterviewResult" element={<InterviewResult />} />
<Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/CGPA" element={<CGPA />} />
<Route path="/Tests" element={<TestPage />} />
<Route path="/About" element={<AboutUs />} />
<Route path="/Friday" element={<FridayInterFace />} />
<Route path="/Roadmaps" element={<RoadmapPage />} />
<Route path="/FreeCoursePlaylist" element={<VideoPlaylist />} />
<Route path="/Internship" element={<InterFaceIntern />} />
<Route path="/TestInterFace" element={<InterFace />} />
<Route path="/TechNewes" element={<News />} />
<Route path="/profile" element={<Profile />} />
<Route path="/EditProfile" element={<ProfileEditPage />} />
<Route path="/forgot-password" element={<ForgetPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}

export default App;