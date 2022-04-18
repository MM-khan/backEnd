const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title : String,
    price:String,
    location:String,
    discreption:String,
    image:String
})
module.exports =mongoose.model("ad", schema)