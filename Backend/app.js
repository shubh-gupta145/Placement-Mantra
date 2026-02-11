const express = require('express');
const app = express();
const PORT = 5173;
app.post('/MockData',(req,res,next)=>{
res.send(`
<h1>Hello reqest is Fullfill</h1>
    `);
});
app.listen(PORT, () => {
    console.log(`Server at Running on http://localhost:${PORT}`);
});