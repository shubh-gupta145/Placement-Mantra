require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dsa = require("./questions/dsaQuestions");
const web = require("./questions/webQuestions");
const aptitude = require("./questions/aptitudeQuestions");
const programming = require("./questions/programmingQuestions");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected ✅"))
.catch(err=>console.log(err));


/* =========================
   User Schema
========================= */

const userSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
}

});

const User = mongoose.model("User",userSchema);


/* =========================
   Sign Up API
========================= */

app.post("/signup", async (req,res)=>{

try{

const {name,email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
return res.json({message:"User already exists"});
}

const newUser = new User({
name,
email,
password
});

await newUser.save();

res.json({message:"Signup Successful"});

}

catch(error){
res.status(500).json({error:error.message});
}

});


/* =========================
   Sign In API
========================= */

app.post("/signin", async (req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.json({message:"User not found"});
}

if(user.password !== password){
return res.json({message:"Wrong Password"});
}

res.json({message:"Login Successful"});

}

catch(error){
res.status(500).json({error:error.message});
}

});


/* =========================
   Questions System
========================= */

const questions = {
DSA: dsa,
Web: web,
Aptitude: aptitude,
Programming: programming
};


/* Start Test */

app.post("/start-test",(req,res)=>{

const {topic,difficulty} = req.body;

if(!questions[topic] || !questions[topic][difficulty]){
return res.status(400).json({message:"Invalid topic or difficulty"});
}

const selected = questions[topic][difficulty];

res.json(selected);

});


/* Submit Test */

app.post("/submit-test",(req,res)=>{

const {answers,questions:qs} = req.body;

if(!answers || !qs){
return res.status(400).json({message:"Invalid data"});
}

let correct = 0;

qs.forEach((q,index)=>{

if(answers[index] === q.answer){
correct++;
}

});

let wrong = qs.length - correct;

let percentage = ((correct/qs.length)*100).toFixed(2);

res.json({
correct,
wrong,
percentage
});

});


/* =========================
   Server Start
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});