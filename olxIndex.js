require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const port =process.env.PORT || 5000;
var cors = require('cors')
const olxroute= require("./olxRoutes/olxRouter")
const regRoute = require("./olxRoutes/regRouter")
const fileUpload = require("express-fileupload");
const auth = require("./middleware/auth")

mongoose.connect("mongodb+srv://ar-mongodb:m12345m!@cluster0.ikuxl.mongodb.net/olx?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
    const app = express();
    app.use(fileUpload ({
        useTempFiles : true,
        tempFileDir:'/tem/'
    }))
    app.use(cors());
    app.use("/public", express.static("public"))
    app.use(express.json())
    app.use("/olx/" , olxroute);
    app.use("/olx/", regRoute);

    app.get('/auth',auth,(req,res)=>{
        res.send('Confidential Page')
    })

    app.get('/', (req,res)=>{
        res.send("just testing a atlas database connection")
    })


    // const securePass = async(password)=>{

    //     const passwhash = await bcryptjs.hash(password,10);
    //     console.log(passwhash);

    //     const passwmatch = await bcryptjs.compare(password,passwhash);
    //     console.log(passwmatch);
    // };
    // securePass("khansahab");


    // const jwt = require("jsonwebtoken");

    // const createToken = async ()=>{
    // const token = await jwt.sign({_id:"623574525609d43db9995337"},"mehtabalikhanfromswedencitykista",{
    //     expiresIn : "10 seconds"
    // })
    //     console.log(token);
    //     const tokenveri =await jwt.verify(token,"mehtabalikhanfromswedencitykista")
    //     console.log(tokenveri);
    // }
    // createToken()

    // console.log(process.env.SECRET_KEY);

    app.listen(port , ()=>{
        console.log(`olx server ${port} is running`);
    })
})
