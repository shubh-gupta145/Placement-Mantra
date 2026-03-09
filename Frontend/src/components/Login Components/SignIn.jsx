import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

function SignIn() {

const navigate = useNavigate();

const [loginData,setLoginData] = useState({
email:"",
password:""
});

const handleChange = (e)=>{
setLoginData({
...loginData,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e) => {

e.preventDefault();

const response = await fetch("http://localhost:5000/signin",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(loginData)

});

const data = await response.json();

if(data.message === "Login Successful"){

// ⭐ EMAIL LOCAL STORAGE ME SAVE KARO
localStorage.setItem("email", loginData.email);

navigate("/");   // Home page

}else{
alert(data.message);
}

};

return (
<div className={styles.container}>
<form className={styles.form} onSubmit={handleSubmit}>

<h2>Welcome Back</h2>

<input
type="email"
name="email"
placeholder="Enter Your Email"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Enter Password"
onChange={handleChange}
required
/>

<button type="submit">Sign In</button>

</form>
</div>
);

}

export default SignIn;