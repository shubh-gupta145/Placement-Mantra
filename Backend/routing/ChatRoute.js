import express from "express";
import Chat from "../models/Chat.js";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

router.post("/ask", async (req,res)=>{

const {question} = req.body;

try{

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You are an expert Computer Science and IT tutor. Answer only IT related questions."
},
{
role:"user",
content:question
}
]

});

const answer = completion.choices[0].message.content;

await Chat.create({
question,
answer
});

res.json({answer});

}catch(err){

res.status(500).json({error:"AI error"});

}

});

export default router;