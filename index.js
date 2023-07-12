const express= require("express");
const app= express();
const cors= require('cors');
const port = process.env.PORT | 3000;

// midleware 
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
      res.send('USER MANAGEMENT SERVER IS RUNNING ...')
})

app.listen(port, ()=>{
      console.log(`Example app listening on port ${port}`)
})