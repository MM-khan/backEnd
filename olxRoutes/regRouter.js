const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const regRouter = express.Router()
const register = require("../olxModal/regModal");

regRouter.get("/registers", async(req,res)=>{
    const data = await register.find();
    res.send(data);
    res.end()
});
regRouter.post("/registers", async(req,res)=>{

    register.findOne({
        email: req.body.email
    }, function (err, user) {
        console.log(user);
        if (user !== null) {
            res.send({
                message:"user already exits"
            })
        }else{
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                hashPassword = hash
                console.log(hashPassword)
                const user = new register({
                    firstName: req.body.firstName,
                    lastname:req.body.lastname,
                    email: req.body.email,
                    password: hashPassword,
                    confirmPassword:req.body.confirmPassword,
                    gender:req.body.gender
                })
                await user.save()
                const token = jwt.sign({email:user.email,password:user.password,
                    firstName:user.firstName},'12345')
                const data = {
                    token: token,
                    message:"user registered succesfully",
                    user:{
                        firstName:user.firstName,
                        lastname:user.lastname,
                        email:user.email,
                        gender:user.gender
                    }
                }
                console.log(data)
                res.send(data)
            });
        }
        
    })
    // const password = req.body.password;
    // const confpassword = req.body.confirmpassword;

    // if(password === confpassword){

    //     const registered = new register({
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname,
    //         email: req.body.email,
    //         gender: req.body.gender,
    //         password:password,
    //         confirmpassword:confpassword

    //     })
    //     const regtoken = await registered.createjwtoken()
    //     console.log(`this is json web token ${regtoken}`);

    //     res.cookie("jwt" , regtoken ,{
    //         expires:new Date(Date.now()),
    //         httpOnly:true
    // })
    // console.log(cookie);

    // await registered.save();
    // res.send(registered)
    // }else{
    //     console.log('password not matched');
    // }
});

regRouter.post("/login", async(req,res)=>{

    register.findOne({
        email: req.body.email
    }, function (err, user) {
        if (user == null) {
            res.send({
                message:"user not found"
            })
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                console.log(result)
                if (result) {
                    const token = jwt.sign({email:user.email,password:user.password,
                    firstName:user.firstName},'12345')
                    const data = {
                        token: token,
                        message:"user login successful"
                    }
                    console.log(data)
                    res.send(data)
                }else{
                    res.send({
                        message:"Invalid credentials. Either email or password wrong."
                    })
                }
            });
        }
    });
    
        // const email = req.body.email;
    //     const passw = req.body.password;

    // const userdata = await register.findOne({email:email});

    // const isMatch = await bcrypt.compare(passw,userdata.password);

    // const regtoken = await userdata.createjwtoken()
    // console.log(`this is json web token ${regtoken}`);

    // res.cookie("jwt" , regtoken,{
    //     expires:new Date(Date.now()),
    //     httpOnly:true
    // })
    // console.log(cookie);

    // if(isMatch){
    //     res.status(201);
    //     res.send('submited successful');
    //     console.log('submited successful');
    // }else{
    //     res.send("Invalid login details");
    // }
})

module.exports = regRouter