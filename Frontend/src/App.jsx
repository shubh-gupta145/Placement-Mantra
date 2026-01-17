import MockInterview from "./components/MockInterview";
import Mic from "./components/Mic";
import LoginForm from "./components/Form";
import Profile from "./components/Profile";
import ContributionGraph from "./components/ContributionGraph";
import Home from "./components/Main compoments/Home";
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
<Home/>
</>
);
}
export default App;