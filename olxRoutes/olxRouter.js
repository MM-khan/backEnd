const express = require("express");

const olxrouter = express.Router()
const ad = require("../olxModal/olxModal");


olxrouter.get("/ads", async(req,res)=>{
    const ads = await ad.find();
    res.send(ads);
    res.end()
});

olxrouter.post("/ads",async(req,res) =>{
    let adImage;
    let uploadpath;
    let serverpath

     let values = JSON.parse(req.body.values)
    // res.send('Working')
    //  console.log(req.files.image);

    if(req.files){

        adImage = req.files.image;
        console.log(adImage);
        uploadpath = __dirname + "/../public/storage/ad/" + adImage.name;
        serverpath = req.protocol +"://"+req.hostname +":5000" + "/public/storage/ad/" + adImage.name;
        adImage.mv(uploadpath, function(err){
            if(err)
                console.log(err)
        });
    }else{
            uploadpath = null
        }
        const ads = new ad({
            title : values.title,
            price : values.price,
            location : values.location,
            discreption : values.discreption,
            image:serverpath
        })
        await ads.save()
        res.send(ads)
    //     res.send("working")
})

module.exports = olxrouter