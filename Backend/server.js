const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const questions = require("./questions");


// Start Test
app.post("/start-test",(req,res)=>{

const {topic,difficulty} = req.body;

if(!questions[topic] || !questions[topic][difficulty]){
return res.status(400).json({message:"Invalid topic or difficulty"});
}

const selected = questions[topic][difficulty];

res.json(selected);

});


// Submit Test
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
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});