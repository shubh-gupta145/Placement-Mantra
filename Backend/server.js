require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Groq = require("groq-sdk");

/* =========================
   PROFILE MODEL
========================= */

const Profile = require("./models/ProfileUser");

/* =========================
   CHAT MODEL
========================= */

const Chat = require("./models/Chat");

/* =========================
   QUESTIONS FILES
========================= */

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
   ENV DEBUG
========================= */

console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

/* =========================
   GROQ SETUP
========================= */

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* =========================
   FRIDAY AI CHAT API
========================= */

app.post("/ask-ai", async (req, res) => {

try {

const { question } = req.body;

if (!question) {
return res.status(400).json({ error: "Question is required" });
}

console.log("User Question:", question);

const completion = await groq.chat.completions.create({

model: "llama-3.3-70b-versatile",

messages: [
{
role: "system",
content:
"You are an expert IT and Computer Science tutor. Answer only programming and computer science related questions."
},
{
role: "user",
content: question
}
]

});

const answer = completion.choices[0].message.content;

console.log("AI Answer:", answer);

/* Save Chat */

const newChat = new Chat({
question,
answer
});

await newChat.save();

res.json({ answer });

}

catch (error) {

console.error("GROQ ERROR:", error);

res.status(500).json({
error: "Server Error",
details: error.message
});

}

});

/* =========================
   GET CHAT HISTORY
========================= */

app.get("/chat-history", async (req, res) => {

try {

const chats = await Chat.find().sort({ createdAt: -1 });

res.json(chats);

}

catch (error) {

console.error(error);

res.status(500).json({ error: error.message });

}

});

/* =========================
   SAVE PROFILE
========================= */

app.post("/save-profile", async (req, res) => {

try {

const profile = new Profile(req.body);

await profile.save();

res.json({ message: "Profile Saved Successfully" });

}

catch (error) {

console.error(error);

res.status(500).json({ error: error.message });

}

});

/* =========================
   GET PROFILE
========================= */

app.get("/get-profile/:email", async (req, res) => {

try {

const profile = await Profile.findOne({ email: req.params.email });

res.json(profile);

}

catch (error) {

console.error(error);

res.status(500).json({ error: error.message });

}

});

/* =========================
   UPDATE PROFILE
========================= */

app.put("/update-profile/:email", async (req, res) => {

try {

let profile = await Profile.findOne({ email: req.params.email });

if (!profile) {

profile = new Profile(req.body);
await profile.save();

}

else {

profile = await Profile.findOneAndUpdate(
{ email: req.params.email },
req.body,
{ new: true }
);

}

res.json(profile);

}

catch (error) {

console.error(error);

res.status(500).json({ error: error.message });

}

});

/* =========================
   MongoDB Connection
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error:", err));

/* =========================
   USER SCHEMA
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
   SIGN UP
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

console.error(error);

res.status(500).json({error:error.message});

}

});

/* =========================
   SIGN IN
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

console.error(error);

res.status(500).json({error:error.message});

}

});

/* =========================
   QUESTIONS SYSTEM
========================= */

const questions = {
DSA:dsa,
Web:web,
Aptitude:aptitude,
Programming:programming
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