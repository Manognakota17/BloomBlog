const exp = require('express');
const app = exp();
require('dotenv').config(); // process.env
const mongoose = require('mongoose');
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");
const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 4000;

//db conection 
mongoose.connect(process.env.DBURL)
    .then(()=> {
        app.listen(port,()=>console.log(`server listening on port ${port}..`))
        console.log("DB connection sucess")
    })
    .catch(err => console.log("Error in DB connection ",err))

app.use(exp.json())
// conect Api rouites
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//error handling
app.use((err,req,res,next)=>{
    console.log("err object in express error handler",err);
    res.send({message:err.message});
})