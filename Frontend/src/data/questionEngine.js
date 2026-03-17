// ============================================================
//  questionEngine.js  –  Placement Mantra Mock Interview
//  Generates questions based on Role + Timing
// ============================================================

const introQuestions = [
  "Please introduce yourself.",
  "Tell me about yourself and your background.",
  "Can you give me a brief introduction about who you are?",
];

const skillQuestions = {
  "Frontend Developer": [
    "What frontend technologies and frameworks do you work with?",
    "How comfortable are you with HTML, CSS, and JavaScript?",
    "Have you worked with React, Angular, or Vue? Tell me about your experience.",
    "What is your experience with responsive design and CSS frameworks like Tailwind or Bootstrap?",
    "How do you handle state management in frontend applications?",
  ],
  "Backend Developer": [
    "What backend technologies and languages do you specialize in?",
    "Which databases have you worked with — SQL or NoSQL?",
    "How comfortable are you with REST API design and development?",
    "Have you worked with Node.js, Django, Spring Boot, or any other backend framework?",
    "What is your experience with authentication and authorization mechanisms?",
  ],
  "Full Stack Developer": [
    "What is your full stack — which frontend and backend technologies do you use?",
    "How do you manage communication between your frontend and backend?",
    "Which databases have you worked with, and how do you decide which one to use?",
    "How comfortable are you with DevOps practices like CI/CD or Docker?",
    "Tell me about a full stack project you built from scratch.",
  ],
  "Software Developer": [
    "What programming languages are you most proficient in?",
    "How strong are your data structures and algorithms skills?",
    "What software development methodologies have you followed — Agile, Scrum?",
    "How do you approach debugging a complex issue in production?",
    "What version control tools have you used?",
  ],
};

const projectQuestions = {
  "Frontend Developer": [
    "Tell me about a frontend project you have built. What was your role?",
    "Have you deployed any frontend project? Which platform did you use?",
    "What challenges did you face while building your frontend projects?",
    "Did you integrate any APIs in your projects? Explain the flow.",
  ],
  "Backend Developer": [
    "Describe a backend project you built. What problem did it solve?",
    "Have you designed a database schema from scratch? Walk me through it.",
    "Did you build any REST or GraphQL APIs? Tell me about the architecture.",
    "How did you handle error handling and logging in your projects?",
  ],
  "Full Stack Developer": [
    "Walk me through a full stack project you built — architecture to deployment.",
    "How did you handle user authentication in your projects?",
    "What was the biggest technical challenge you solved in any of your projects?",
    "Did you ever optimize performance in a project? What steps did you take?",
  ],
  "Software Developer": [
    "Tell me about the most complex software project you have worked on.",
    "Have you worked on any open source contributions?",
    "Describe a time when you had to refactor code. What approach did you take?",
    "How do you ensure code quality in your projects?",
  ],
};

const internshipQuestions = [
  "Have you done any internship? Tell me about the company and your role.",
  "What was your day-to-day work during your internship?",
  "What did you learn from your internship experience?",
  "Did you work on any live project during your internship?",
  "How was working in a team environment during your internship?",
];

const communicationQuestions = [
  "How do you handle disagreements with a team member?",
  "Describe a situation where you had to explain a technical concept to a non-technical person.",
  "How do you manage your time when working on multiple tasks simultaneously?",
  "Tell me about a time you received critical feedback. How did you respond?",
  "How do you stay updated with the latest trends in your field?",
];

const technicalQuestions = {
  "Frontend Developer": [
    "What is the difference between var, let, and const in JavaScript?",
    "Explain the concept of Virtual DOM in React.",
    "What are React hooks? Name a few and explain their use.",
    "What is CSS specificity and how does it work?",
    "Explain the box model in CSS.",
    "What is event bubbling and event delegation in JavaScript?",
    "What is the difference between synchronous and asynchronous JavaScript?",
    "Explain Promises and async/await with an example.",
    "What is a closure in JavaScript?",
    "How does the useEffect hook work in React?",
    "What is the difference between controlled and uncontrolled components in React?",
    "What are higher-order components in React?",
    "Explain the concept of lazy loading in web development.",
    "What is CORS and how do you handle it?",
    "What are CSS preprocessors like SASS? Have you used them?",
  ],
  "Backend Developer": [
    "What is the difference between SQL and NoSQL databases?",
    "Explain the concept of RESTful APIs. What are the HTTP methods?",
    "What is middleware in the context of backend frameworks?",
    "Explain the concept of ORM. Have you used Sequelize, Mongoose, or Hibernate?",
    "What is JWT and how is it used for authentication?",
    "What is the difference between authentication and authorization?",
    "Explain indexing in databases. Why is it important?",
    "What is normalization in databases?",
    "How do you handle database transactions?",
    "What is caching and how have you implemented it?",
    "Explain microservices architecture vs monolithic architecture.",
    "What is Docker and have you used it in any project?",
    "What are environment variables and why are they important?",
    "How do you secure a REST API?",
    "What is rate limiting and why is it used?",
  ],
  "Full Stack Developer": [
    "How does the client-server architecture work?",
    "What is the difference between server-side rendering and client-side rendering?",
    "Explain the MVC architecture pattern.",
    "What is a session vs a token-based authentication?",
    "How do you optimize a web application for performance?",
    "What is WebSocket and when would you use it over HTTP?",
    "Explain the concept of API versioning.",
    "What is the role of a load balancer?",
    "How do you handle CORS issues?",
    "What is a CDN and when do you use it?",
    "Explain the concept of database sharding.",
    "What is containerization? Have you used Docker or Kubernetes?",
    "How do you handle file uploads in a full stack application?",
    "What is OAuth2 and how does it work?",
    "Explain the difference between monorepo and polyrepo architecture.",
  ],
  "Software Developer": [
    "What is time complexity and space complexity? Give an example.",
    "Explain binary search. What is its time complexity?",
    "What is a linked list? When would you use it over an array?",
    "Explain the concept of recursion with an example.",
    "What is object-oriented programming? Name its four pillars.",
    "What is polymorphism? Give a real-world example.",
    "What is the difference between stack and heap memory?",
    "Explain the concept of multithreading.",
    "What are design patterns? Name a few commonly used ones.",
    "What is the Singleton pattern? When would you use it?",
    "What is the difference between deep copy and shallow copy?",
    "Explain garbage collection in programming languages.",
    "What is a deadlock? How do you prevent it?",
    "What is the difference between an abstract class and an interface?",
    "What is dynamic programming? Give a simple example.",
  ],
};

const hrQuestions = [
  "Where do you see yourself five years from now?",
  "What are your strengths and weaknesses?",
  "Why do you want to join our company?",
  "Are you comfortable with relocating or working remotely?",
  "What are your salary expectations?",
  "How do you handle pressure and tight deadlines?",
  "Tell me about a failure and what you learned from it.",
  "Do you prefer working independently or in a team?",
  "What motivates you to give your best at work?",
  "Do you have any questions for us?",
];

// ─── Helper: shuffle array ──────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ─── Main export ────────────────────────────────────────────
/**
 * generateInterviewQuestions(role, timing)
 * Returns an ordered array of question strings
 */
export function generateInterviewQuestions(role, timing) {
  const t = parseInt(timing);
  const roleKey = role || "Software Developer";

  const intro = introQuestions.slice(0, 1); // always 1 intro

  if (t === 2) {
    // Only Introduction
    return [...intro];
  }

  if (t === 5) {
    // Intro + Skills + Projects (light)
    return [
      ...intro,
      ...pick(skillQuestions[roleKey] || skillQuestions["Software Developer"], 2),
      ...pick(projectQuestions[roleKey] || projectQuestions["Software Developer"], 1),
    ];
  }

  if (t === 10) {
    // Intro + Skills + Projects + Internship + Communication
    return [
      ...intro,
      ...pick(skillQuestions[roleKey] || skillQuestions["Software Developer"], 2),
      ...pick(projectQuestions[roleKey] || projectQuestions["Software Developer"], 2),
      ...pick(internshipQuestions, 2),
      ...pick(communicationQuestions, 2),
    ];
  }

  if (t === 15) {
    // Resume-based: Intro + Skills + Projects + Internship + Communication + Technical
    return [
      ...intro,
      ...pick(skillQuestions[roleKey] || skillQuestions["Software Developer"], 3),
      ...pick(projectQuestions[roleKey] || projectQuestions["Software Developer"], 3),
      ...pick(internshipQuestions, 2),
      ...pick(communicationQuestions, 2),
      ...pick(technicalQuestions[roleKey] || technicalQuestions["Software Developer"], 3),
    ];
  }

  if (t === 30) {
    // Full Interview: all sections
    return [
      ...intro,
      ...pick(skillQuestions[roleKey] || skillQuestions["Software Developer"], 4),
      ...pick(projectQuestions[roleKey] || projectQuestions["Software Developer"], 4),
      ...pick(internshipQuestions, 3),
      ...pick(communicationQuestions, 3),
      ...pick(technicalQuestions[roleKey] || technicalQuestions["Software Developer"], 6),
      ...pick(hrQuestions, 4),
    ];
  }

  return [...intro];
}