const webQuestions = {

easy:[
{
question:"HTML stands for?",
options:[
"Hyper Text Markup Language",
"High Transfer Machine Language",
"Home Tool Markup Language",
"Hyperlink Tool Markup Language"
],
answer:0
},
{
question:"CSS stands for?",
options:[
"Computer Style Sheets",
"Cascading Style Sheets",
"Colorful Style Sheets",
"Complete Style Sheets"
],
answer:1
},
{
question:"JavaScript is a _______ language?",
options:[
"High-level programming language",
"Low-level programming language",
"Machine language",
"Assembly language"
],
answer:0
},
{
question:"Which CSS property is used to change the text color of an element?",
options:[
"color",
"font-style",
"text-align",
"background"
],
answer:0
},
{question:"Which HTML tag is used to define an unordered list?",
options:[
"<ul>",
"<ol>",
"<li>",
"<list>"
],
answer:0
},
{
question:"Which JavaScript keyword is used to declare a variable?",
options:[
"var",
"let",
"const",
"declare"
],
answer:0
},
{
question:"What does SEO stand for in web development?",
options:[
"Search Engine Optimization",
"Search Engine Operation",
"Systematic Evaluation of Online Presence",
"Site Evaluation and Optimization"
],
answer:0
},
{
question:"what is the Mean of responsive web design?",
options:[
"Website design that adapts to different screen sizes",
"Website mein animations hona",
"Website ka fast load hona",
"Server ka jaldi response dena "
],
answer:0
},
{
question:"Who developed React?",
options:[
"Facebook",
"Google",
"Microsoft",
"Apple"
],
answer:0
},
{
question:"What is the file extension used for React components?",
options:[
".jsx",
".js",
".html",
".css"
],
answer:0
},
{
question:"Which method is used to render a React component to the DOM?",
options:[
"ReactDOM.render()",
"React.render()",
"ReactDOM.create()",
"React.create()"
],
answer:0
},
{
question:"What is the virtual DOM in React?",
options:[
"A lightweight copy of the actual DOM",
"A new programming language",
"A database for storing components",
"A tool for optimizing performance"
],
answer:0
},
{
question:"Which hook is used to manage state in functional components?",
options:[
"useState",
"useEffect",
"useRef",
"useContext"
],
answer:0
},
{
question:"Which hook is used to perform side effects in functional components?",
options:[
"useState",
"useEffect",
"useRef",
"useContext"
],
answer:1
},
{
question:"What does the 'useRef' hook do in React?",
options:[
"Creates a reference to a DOM element",
"Manages state in functional components",
"Performs side effects in functional components",
"Provides context to components"
],
answer:0
},
{
question:"What is Function In JS?",
options:[
"Declare The Variable",
"Special type Component",
"Certain Line of Block Of Code For Particular Problem",
"Special Type Value"
],
answer:2
},
{
question:"What is the purpose of the <meta> tag in HTML?",
options:[
"Define metadata about the HTML document",
"Create hyperlinks",
"Add images to the page",
"Style text elements"
],
answer:0
},
{
question:"What is the difference between margin and padding in CSS?",
options:[
"Margin is the space outside the border, padding is inside",
"Both are the same",
"Margin is inside the border, padding is outside",
"Neither affects spacing"
],
answer:0
},
{
question:"What is a closure in JavaScript?",
options:[
"A function that has access to its outer scope",
"A way to close browser windows",
"An error handling mechanism",
"A type of loop"
],
answer:0
},
{
question:"What is JSX in React?",
options:[
"A syntax extension for JavaScript",
"A new programming language",
"A CSS preprocessor",
"A database query language"
],
answer:0
},
],

medium:[
{
question:"Which HTML tag is used to define a table row?",
options:["<tr>","<td>","<th>","<table>"],
answer:0
},
{
question:"Which CSS property controls the space between elements inside a flex container?",
options:["margin","padding","gap","spacing"],
answer:2
},
{
question:"Which JavaScript method converts JSON data into a JavaScript object?",
options:["JSON.parse()","JSON.stringify()","JSON.convert()","JSON.toObject()"],
answer:0
},
{
question:"Which HTML attribute is used to open a link in a new tab?",
options:["target='_blank'","newtab","open='new'","href='_blank'"],
answer:0
},
{
question:"Which CSS property is used to make a website responsive?",
options:["display","position","media queries","float"],
answer:2
},
{
question:"Which JavaScript keyword is used to declare a block-scoped variable?",
options:["var","let","const","both let and const"],
answer:3
},
{
question:"Which HTML tag is used to embed JavaScript code?",
options:["<javascript>","<js>","<script>","<code>"],
answer:2
},
{
question:"Which CSS property is used to change the background color?",
options:["background-style","bgcolor","background-color","color"],
answer:2
},
{
question:"Which JavaScript function is used to select an element by its id?",
options:["getElementByClass()","querySelectorAll()","getElementById()","getElement()"],
answer:2
},
{
question:"Which HTTP method is typically used to update data in REST APIs?",
options:["GET","POST","PUT","DELETE"],
answer:2
}
],

hard:[
{
question:"Which React hook is used to persist a mutable value that does not trigger re-render when updated?",
options:["useState","useRef","useEffect","useMemo"],
answer:1
},
{
question:"Which lifecycle phase does useEffect run in React Functional Components by default?",
options:["Before render","After render","During render","Before state update"],
answer:1
},
{
question:"Which JavaScript concept allows a function to access variables from its outer scope even after the outer function has executed?",
options:["Hoisting","Closure","Callback","Promise"],
answer:1
},
{
question:"Which browser API is used to store data that persists even after the browser is closed?",
options:["sessionStorage","localStorage","cookies","indexedDB"],
answer:1
},
{
question:"Which React hook is used for performance optimization by memoizing expensive calculations?",
options:["useEffect","useMemo","useRef","useState"],
answer:1
},
{
question:"Which HTTP status code indicates that a resource was successfully created?",
options:["200","201","204","301"],
answer:1
},
{
question:"Which JavaScript feature allows handling asynchronous operations in a cleaner syntax compared to promises?",
options:["Callbacks","Async/Await","Generators","Event Loop"],
answer:1
}
],
};

module.exports = webQuestions;