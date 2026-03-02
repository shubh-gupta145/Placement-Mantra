const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors()); 
app.get("/api/test", (req, res) => {
  res.json({ message: "Connection Successful ✅" });
});
app.post('/MockData',(req,res,next)=>{
res.send(`
<h1>Hello reqest is Fullfill</h1>
    `);
});
app.listen(PORT, () => {
    console.log(`Server at Running on http://localhost:${PORT}`);
});