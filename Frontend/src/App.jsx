import FAQSection from "./components/FAQSection";
import NavBar from "./components/NavBar";
import Carsoul from "./components/Carsoul";
import Section from "./components/Section";
import Footar from "./components/Footar";
import MockInterview from "./components/MockInterview";
import Mic from "./components/Mic";
import LoginForm from "./components/Form";
import Profile from "./components/Profile";
import ContributionGraph from "./components/ContributionGraph";
function App(){
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
return (
<>
 {/* {isLoggedIn ? (
        <>
          <ContributionGraph isLoggedIn={isLoggedIn} />
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )} */}
{/* <MockInterview/> */}
{/* <NavBar/>
<Carsoul/>
<Section/>
<FAQSection/>
<Footar/> */}
{/* <LoginForm/> */}
{/* <Profile/> */}
<ContributionGraph/>
</>
);
}
export default App;