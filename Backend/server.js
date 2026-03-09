require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* =========================
   PROFILE MODEL
   File Name: ProfileUser.js
========================= */

const Profile = require("./models/ProfileUser");

const dsa = require("./questions/dsaQuestions");
const web = require("./questions/webQuestions");
const aptitude = require("./questions/aptitudeQuestions");
const programming = require("./questions/programmingQuestions");
const feedbackRoute = require("./routing/feedback");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", feedbackRoute);


/* =========================
   SAVE PROFILE
========================= */

app.post("/save-profile", async (req,res)=>{

try{

const profile = new Profile(req.body);

await profile.save();

res.json({message:"Profile Saved Successfully"});

}

catch(error){
res.status(500).json({error:error.message});
}

});


/* =========================
   GET PROFILE
========================= */

app.get("/get-profile/:email", async (req,res)=>{

try{

const profile = await Profile.findOne({email:req.params.email});

res.json(profile);

}

catch(error){
res.status(500).json({error:error.message});
}

});


/* =========================
   UPDATE PROFILE
   (Auto create if not exist)
========================= */

app.put("/update-profile/:email", async (req,res)=>{

try{

let profile = await Profile.findOne({email:req.params.email});

if(!profile){

profile = new Profile(req.body);

await profile.save();

}

else{

profile = await Profile.findOneAndUpdate(

{email:req.params.email},
req.body,
{new:true}

);

}

res.json(profile);

}

catch(error){
res.status(500).json({error:error.message});
}

});


/* =========================
   MongoDB Connection
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected ✅"))
.catch(err=>console.log(err));


/* =========================
   USER SCHEMA (Login System)
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
   SIGN UP API
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
   SIGN IN API
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
   QUESTIONS SYSTEM
========================= */

const questions = {
DSA: dsa,
Web: web,
Aptitude: aptitude,
Programming: programming
};


/* =========================
   START TEST
========================= */

app.post("/start-test",(req,res)=>{

const {topic,difficulty} = req.body;

if(!questions[topic] || !questions[topic][difficulty]){
return res.status(400).json({message:"Invalid topic or difficulty"});
}

const selected = questions[topic][difficulty];

res.json(selected);

});


/* =========================
   SUBMIT TEST
========================= */

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
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});