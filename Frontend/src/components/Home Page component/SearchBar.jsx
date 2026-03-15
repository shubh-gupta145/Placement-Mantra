import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ menuOpen }) {

const [query,setQuery] = useState("");
const navigate = useNavigate();

const pages = [
{ name:"home", path:"/" },
{ name:"profile", path:"/profile" },
{ name:"mock interview", path:"/MockInterFace" },
{ name:"resume builder", path:"/resume" },
{ name:"aptitude test", path:"/test" },
{ name:"signup", path:"/SignUp" }
];

const handleSearch = (e)=>{

if(e.key === "Enter"){

const userInput = query.toLowerCase().trim();

const page = pages.find(p => {

const pageName = p.name.toLowerCase();

return (
pageName.includes(userInput) || 
userInput.includes(pageName) ||
pageName.split(" ").some(word => word.startsWith(userInput))
);

});

if(page){
navigate(page.path);
}else{
alert("Page not found");
}

}

};

return(

<div className={`${styles.Second_nav_container} ${menuOpen ? styles.showMenu : ""}`}>

<input
className={styles.SearchBar}
type="text"
placeholder="You can also search here"
value={query}
onChange={(e)=>setQuery(e.target.value)}
onKeyDown={handleSearch}
/>

<Link className={styles.links} to="/SignUp">Sign Up</Link>

</div>

);

}

export default Navbar;