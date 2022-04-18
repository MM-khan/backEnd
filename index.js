const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/router")
const port = 8000;

mongoose.connect("mongodb://localhost:27017/rest-API",{useNewUrlParser:true})
.then(()=>{
    
    const app = express()
    app.use(express.json())
    app.use("/api" , router)

    app.listen(port ,()=>{
        console.log("mongoose server running");
    })
    })