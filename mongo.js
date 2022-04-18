
const express = require("express")
 const app = express()
 const mongodb = require("mongodb").MongoClient
 const port = 5000;
const link = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
 
app.use(express.json())
mongodb.connect(link)
     .then(client =>{
    const db = client.db("hospital");
    const collection = db.collection("patients");
    const docCollection = db.collection("doctors")

    
 app.get("/" , (req,res)=>{res.send("hello home page") });

 app.get("/hospital",(req,res)=>{
     let data
     collection.find().toArray()
     .then(result =>{
         data=result
         console.log(result);
         res.send(JSON.stringify(data))
         res.end()
     })
     .catch(error => console.log(error))
 })
 app.get("/doctors",(req,res)=>{
     let data
     docCollection.find().toArray()
     .then(response =>{
         data = response;
         console.log(response);
         res.send(JSON.stringify(data))
         res.end()
     })
 });
 app.post("/patients",(req,res)=>{
     let data = req.body
     console.log(data);
     collection.insertOne(data)
     res.send("post patients data")
     
 });
 app.delete("/patients",(req,res)=>{
     let id = req.body.name
     const name ={
         "name":id
     }
     collection.deleteOne(name)
     console.log(id);
     res.send("delete item successful");

 });
 app.put("/patients",(req,res)=>{
     const match = req.body.match
     const update = req.body.update
     console.log(match,update);
    collection.updateOne(match,
        {$set :update}
        );
    
    res.send("updated successfully patients collection");
    res.end()
 });
 app.put("/doctors",(req,res)=>{
     const match = req.body.match;
     const update = req.body.update

     docCollection.updateOne(
         match,
         {$set : update}
     )
     res.send("updated document")
 })

});
 app.listen(port,()=>{
     console.log(`mongodb connect port ${port}`);
 })