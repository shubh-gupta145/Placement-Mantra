import Carsoul from "../Home Page component/Carsoul";
import FAQSection from "../Home Page component/FAQSection";
import Footar from "../Home Page component/Footar";
import NavBar from "../Home Page component/NavBar";
import Section from "../Home Page component/Section";
import styles from "./Home.module.css";
function Home(){
    return (
<>
<div className={styles.container}>
<NavBar/>
<Carsoul/>
<Section/>
<FAQSection/>
<Footar/>
</div>
</>
    );
}
export default Home;