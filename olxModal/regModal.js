const mongoose = require("mongoose");


 const regSchema = mongoose.Schema({
     firstName :{
         type : String,
         require:true
     },
     lastname :{
        type : String,
        require:true
    },
    email:{
        type : String,
        require:true,
        unique:true
    },
    gender :{
        type : String,
        require:true
    },
    password :{
        type : String,
        require:true
    },
    confirmpassword :{
        type : String,
        require:true
    },
    // tokens :[{
    //     jwtoken:{
    //         type:String,
    //         require:true
    //     }
    // }]
     
 });

//   regSchema.methods.createjwtoken = async function(){
//     const token = await jwt.sign({_id:this._id.toString()} , process.env.SECRET_KEY)
//     this.tokens = this.tokens.concat({jwtoken:token});
//     await this.save();
//     return token;

//   }

//  regSchema.pre("save", async function(next){
//      if(this.isModified("password")){
//          //console.log(`this is orignal password ${this.password}`);
//          this.password =await bcrypt.hash(this.password,10);
//          this.confirmpassword =await bcrypt.hash(this.password,10);
//          //console.log(`this is hash password ${this.password}`);


//         //   this.confirmpassword = undefined
//      }
//      next()
//  })

 module.exports =mongoose.model("register",regSchema) 