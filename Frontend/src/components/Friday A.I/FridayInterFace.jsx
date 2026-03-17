import { useState, useRef, useEffect } from "react";
import styles from "./FridayInterFace.module.css";
import { FaPlus } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function FridayInterFace() {

const [question,setQuestion] = useState("");
const [messages,setMessages] = useState([]);
const [typing,setTyping] = useState(false);

const [history,setHistory] = useState([]);
const [currentChatId,setCurrentChatId] = useState(null);

const chatEndRef = useRef(null);

/* AUTO SCROLL */

useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages,typing]);

/* LOAD USER HISTORY */

useEffect(()=>{

const userId = localStorage.getItem("userId");

if(!userId) return;

const savedHistory = localStorage.getItem(`history_${userId}`);

if(savedHistory){
const parsed = JSON.parse(savedHistory);
setHistory(parsed);
}

},[]);

/* NEW CHAT */

const handleNewChat = ()=>{

const newChat = {
id:Date.now(),
messages:[]
};

setCurrentChatId(newChat.id);
setMessages([]);

setHistory(prev=>[newChat,...prev]);

};

/* SEND MESSAGE */

const handleSend = async () => {

if(question.trim()==="") return;

const userQuestion = question;

/* Show Question */

setMessages(prev=>[
...prev,
{type:"question",text:userQuestion}
]);

setQuestion("");
setTyping(true);

try{

const res = await fetch("http://localhost:5000/ask-ai",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({question:userQuestion})
});

const data = await res.json();

setTyping(false);

const answerText = data.answer;

/* Show Answer */

setMessages(prev=>[
...prev,
{type:"answer",text:answerText}
]);

/* SAVE HISTORY */

const userId = localStorage.getItem("userId");

setHistory(prev=>{

const updated = prev.map(chat =>
chat.id === currentChatId
? {
...chat,
messages:[
...chat.messages,
{type:"question",text:userQuestion},
{type:"answer",text:answerText}
]
}
: chat
);

localStorage.setItem(`history_${userId}`,JSON.stringify(updated));

return updated;

});

}

catch(error){

setTyping(false);

setMessages(prev=>[
...prev,
{type:"answer",text:"⚠ Server Error. Try again later."}
]);

}

};

/* ENTER KEY SEND */

const handleKeyPress = (e)=>{
if(e.key==="Enter"){
handleSend();
}
};

return (

<div className={styles.wrapper}>

{/* LEFT PANEL */}

<div className={styles.SettingPannel}> 

<div className={styles.NewChat} onClick={handleNewChat}>
<FaPlus />
<span>New Chat</span>
</div>

<div className={styles.HistoryChats}>

{history.map(chat=>(

<div
key={chat.id}
className={styles.historyItem}
onClick={()=>{
setCurrentChatId(chat.id);
setMessages(chat.messages);
}}
>

Chat {chat.id}

</div>

))}

</div>

</div>

{/* RIGHT PANEL */}

<div className={styles.OutputPannel}>

<div className={styles.DisplayScreen}>

{messages.map((msg,index)=>(
<div
key={index}
className={
msg.type==="question"
? styles.userMessage
: styles.botMessage
}
>

{msg.type==="answer" ? (

<div>

<h2 className={styles.answerHeading}>
AI Answer
</h2>

<ReactMarkdown
components={{
code({inline,className,children}){

const match=/language-(\w+)/.exec(className||"");

return !inline ? (

<div style={{position:"relative"}}>

<button
onClick={()=>navigator.clipboard.writeText(children)}
style={{
position:"absolute",
right:"10px",
top:"10px",
background:"#333",
color:"#fff",
border:"none",
padding:"4px 8px",
cursor:"pointer",
fontSize:"12px"
}}
>
Copy
</button>

<SyntaxHighlighter
style={oneDark}
language={match ? match[1] : "javascript"}
PreTag="div"
>
{String(children).replace(/\n$/,"")}
</SyntaxHighlighter>

</div>

) : (
<code className={className}>
{children}
</code>
);

}
}}
>
{msg.text}
</ReactMarkdown>

</div>

) : (

msg.text

)}

</div>
))}

{typing && (
<div className={styles.botMessage}>
🤖 Friday is thinking...
</div>
)}

<div ref={chatEndRef}></div>

</div>

{/* INPUT PANEL */}

<div className={styles.InputPannel}>

<input
type="text"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
onKeyDown={handleKeyPress}
placeholder="Ask IT / Computer Science question..."
className={styles.InputBox}
/>

<button
className={styles.SendButton}
onClick={handleSend}
>
Send
</button>

</div>

</div>

</div>

);
}

export default FridayInterFace;