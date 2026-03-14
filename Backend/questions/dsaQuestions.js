const dsaQuestions = {

easy:[
{question:"What is Stack?",options:["LIFO","FIFO","Tree","Graph"],answer:0},
{question:"Which data structure follows FIFO?",options:["Stack","Queue","Tree","Graph"],answer:1},
{question:"Which data structure uses nodes and pointers?",options:["Array","Linked List","Stack","Queue"],answer:1},
{question:"Which structure is used in recursion?",options:["Queue","Stack","Tree","Graph"],answer:1},
{question:"Which traversal visits Root → Left → Right?",options:["Inorder","Preorder","Postorder","Level Order"],answer:1},
{question:"Which data structure stores elements in contiguous memory?",options:["Array","Linked List","Tree","Graph"],answer:0},
{question:"Which operation removes top element of stack?",options:["Push","Pop","Peek","Insert"],answer:1},
{question:"Which search works only on sorted arrays?",options:["Linear Search","Binary Search","DFS","BFS"],answer:1},
{question:"Which structure is used in BFS?",options:["Stack","Queue","Heap","Tree"],answer:1},
{question:"Which structure is used in DFS?",options:["Queue","Stack","Array","Graph"],answer:1},
{question:"Which tree has maximum two children?",options:["Binary Tree","Graph","Heap","Trie"],answer:0},
{question:"Which sorting algorithm is simplest?",options:["Bubble Sort","Quick Sort","Merge Sort","Heap Sort"],answer:0},
{question:"Which search checks each element sequentially?",options:["Binary Search","Linear Search","DFS","BFS"],answer:1},
{question:"What is the root node?",options:["First node of tree","Last node","Middle node","Leaf node"],answer:0},
{question:"Which node has no children?",options:["Root","Leaf","Parent","Sibling"],answer:1},
{question:"Which DS uses key-value pair?",options:["Hash Table","Stack","Queue","Tree"],answer:0},
{question:"Which traversal gives sorted output in BST?",options:["Inorder","Preorder","Postorder","Level Order"],answer:0},
{question:"Which operation adds element in stack?",options:["Push","Pop","Peek","Delete"],answer:0},
{question:"Which data structure uses hashing?",options:["Hash Table","Stack","Queue","Graph"],answer:0},
{question:"Which structure represents hierarchical data?",options:["Tree","Array","Stack","Queue"],answer:0}
],

medium:[
{question:"Time complexity of Binary Search?",options:["O(n)","O(log n)","O(n log n)","O(1)"],answer:1},
{question:"Worst case complexity of Linear Search?",options:["O(1)","O(log n)","O(n)","O(n²)"],answer:2},
{question:"Which traversal uses recursion commonly?",options:["BFS","DFS","Binary Search","Level Order"],answer:1},
{question:"Which data structure is used in BFS?",options:["Stack","Queue","Heap","Tree"],answer:1},
{question:"Which sorting algorithm is stable?",options:["Merge Sort","Quick Sort","Heap Sort","Selection Sort"],answer:0},
{question:"Which structure implements priority scheduling?",options:["Heap","Queue","Stack","Array"],answer:0},
{question:"Time complexity of inserting in heap?",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:1},
{question:"Which algorithm finds Minimum Spanning Tree?",options:["Kruskal","Binary Search","Quick Sort","DFS"],answer:0},
{question:"Which algorithm detects cycle in graph?",options:["DFS","Binary Search","Merge Sort","Heap Sort"],answer:0},
{question:"Which structure is best for undo operations?",options:["Stack","Queue","Heap","Tree"],answer:0}
],

hard:[
{question:"Which data structure is used in Dijkstra algorithm?",options:["Stack","Queue","Priority Queue","Linked List"],answer:2},
{question:"Average time complexity of Quick Sort?",options:["O(n)","O(n log n)","O(n²)","O(log n)"],answer:1},
{question:"Worst case time complexity of Quick Sort?",options:["O(n log n)","O(n²)","O(log n)","O(n)"],answer:1},
{question:"Time complexity of building heap from array?",options:["O(n)","O(n log n)","O(log n)","O(n²)"],answer:0},
{question:"Which algorithm finds strongly connected components?",options:["Kosaraju","Kruskal","Prim","Dijkstra"],answer:0},
{question:"Which algorithm is used for Topological Sort?",options:["DFS","Binary Search","Quick Sort","Heap Sort"],answer:0},
{question:"Which structure is used to implement LRU Cache efficiently?",options:["Stack","Queue","HashMap + Doubly Linked List","Tree"],answer:2}
]

};

module.exports = dsaQuestions;