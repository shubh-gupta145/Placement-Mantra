const programmingQuestions = {

easy:[
{question:"Which language runs in browser?",options:["Java","C++","Python","JavaScript"],answer:3},
{question:"Which symbol is used for comments in JavaScript (single line)?",options:["//","#","<!-- -->","**"],answer:0},
{question:"Which keyword defines a constant in JavaScript?",options:["var","let","const","define"],answer:2},
{question:"Which operator is used for addition?",options:["-","+","*","/"],answer:1},
{question:"Which function prints output in browser console?",options:["print()","console.log()","log()","write()"],answer:1},
{question:"Which keyword is used to define a function?",options:["func","function","define","method"],answer:1},
{question:"Which data type stores true/false values?",options:["String","Boolean","Number","Object"],answer:1},
{question:"Which bracket is used for arrays in JS?",options:["()","{}","[]","<>"],answer:2},
{question:"Which keyword stops a loop?",options:["break","stop","exit","halt"],answer:0},
{question:"Which method adds element at end of array?",options:["push()","pop()","shift()","unshift()"],answer:0},
{question:"Which method removes last element of array?",options:["push()","shift()","pop()","delete()"],answer:2},
{question:"Which keyword is used for conditional statements?",options:["if","loop","switcher","when"],answer:0},
{question:"Which operator compares value and type?",options:["==","===","!=","<>"],answer:1},
{question:"Which loop runs at least once?",options:["for","while","do...while","foreach"],answer:2},
{question:"Which symbol ends a statement in JS?",options:[".",";",":","/"],answer:1},
{question:"Which keyword defines block scope variable?",options:["var","let","dim","value"],answer:1},
{question:"Which data type represents numbers?",options:["Number","String","Boolean","Array"],answer:0},
{question:"Which method converts string to integer?",options:["parseInt()","toString()","NumberToInt()","convert()"],answer:0},
{question:"Which keyword is used to exit function?",options:["stop","return","break","exit"],answer:1},
{question:"Which function delays execution?",options:["setTimeout()","delay()","wait()","pause()"],answer:0}
],

medium:[
{question:"Which keyword declares variable in JS?",options:["let","define","varName","dim"],answer:0},
{question:"Which method converts object to JSON string?",options:["JSON.parse()","JSON.stringify()","JSON.convert()","JSON.object()"],answer:1},
{question:"Which array method creates a new array with transformed elements?",options:["map()","filter()","reduce()","find()"],answer:0},
{question:"Which concept allows asynchronous programming in JS?",options:["Promises","Loops","Objects","Arrays"],answer:0},
{question:"Which method filters elements based on condition?",options:["map()","filter()","reduce()","push()"],answer:1},
{question:"Which keyword is used to handle errors?",options:["try","catch","throw","All of these"],answer:3},
{question:"Which operator spreads array elements?",options:["...","++","**","??"],answer:0},
{question:"Which method merges arrays?",options:["join()","concat()","slice()","splice()"],answer:1},
{question:"Which keyword pauses async function?",options:["await","stop","pause","delay"],answer:0},
{question:"Which method finds first matching element?",options:["find()","map()","filter()","reduce()"],answer:0}
],

hard:[
{question:"Which data type is immutable in JS?",options:["Object","Array","String","Map"],answer:2},
{question:"Which concept allows functions inside functions?",options:["Closure","Promise","Loop","Callback"],answer:0},
{question:"Which event loop phase executes callbacks from setTimeout?",options:["Timers","Poll","Check","Close"],answer:0},
{question:"Which method is used to deeply clone objects in modern JS?",options:["structuredClone()","clone()","deepCopy()","Object.assign()"],answer:0},
{question:"What is the output type of typeof null?",options:["null","object","undefined","number"],answer:1},
{question:"Which concept prevents modification of object properties?",options:["Object.freeze()","Object.lock()","Object.stop()","Object.close()"],answer:0},
{question:"Which method schedules microtasks in JS?",options:["Promise.then()","setTimeout()","setInterval()","requestAnimationFrame()"],answer:0}
]

};

module.exports = programmingQuestions;