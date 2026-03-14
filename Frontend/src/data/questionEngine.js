export function generateInterviewQuestions(role, time, resumeData = null) {

let questions = [];

/* -------- 2 MINUTES -------- */

if(time == 2){

questions.push(
"Please introduce yourself."
);

}

/* -------- 5 MINUTES -------- */

if(time == 5){

questions = [
"Please introduce yourself.",
"What are your main technical skills?",
"Can you briefly tell me about the projects you have worked on?",
"Which technologies did you use in those projects?"
];

}

/* -------- 10 MINUTES -------- */

if(time == 10){

questions = [
"Please introduce yourself.",
"What are your core technical skills?",
"Tell me about the projects you have built.",
"What challenges did you face while building those projects?",
"How did you solve those problems?",
"Do you have any previous work experience or internship?"
];

}

/* -------- 15 MINUTES -------- */

if(time == 15){

questions = [
"Please introduce yourself.",
"What are your main skills?",
"Tell me about your projects.",
"Explain one project in detail."
];

if(resumeData){

questions.push(
"Can you explain the technologies mentioned in your resume?"
);

}

}

/* -------- 30 MINUTES -------- */

if(time == 30){

questions = [
"Please introduce yourself.",
"Tell me about your previous experience or internship.",
"What projects have you built?",
"What challenges did you face in your projects?",
"What are your strongest technical skills?",
"Why do you want to join our company?",
"How would you rate your communication skills?"
];

}

/* -------- ROLE BASED SKILL QUESTIONS -------- */

if(role === "Frontend Developer"){

questions.push(
"What is React?",
"What is the Virtual DOM?",
"What is the difference between let, var, and const?"
);

}

if(role === "Backend Developer"){

questions.push(
"What is REST API?",
"What is the difference between SQL and NoSQL?",
"What is middleware in Express?"
);

}

if(role === "Full Stack Developer"){

questions.push(
"Explain the architecture of a full stack application.",
"How do frontend and backend communicate?"
);

}

if(role === "Software Developer"){

questions.push(
"What is Object Oriented Programming?",
"Explain the concept of data structures."
);

}

/* -------- IT PROBLEM QUESTION -------- */

if(time == 30){

questions.push(
"I will give you a technical problem. How would you solve it?"
);

}

return questions;

}