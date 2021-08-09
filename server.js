const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: false }));   // urlencoder
app.use(express.json());                                            // jsonify 

app.use(express.static('public'));
const Voter = require('./model');                              //Schema
const URI = "YOUR MONGO URI";
// db connection
mongoose.connect(URI, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((res) => console.log("connected successfuly")).catch((err) => console.log(err));

//route home
app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/public/templates/index.html');
})
//route view (get)
app.get('/viewdata',(req,res)=>{
    res.sendFile(__dirname+'/public/templates/view.html');
})
//route update (put)
app.get('/update',(req,res)=>{
    res.sendFile(__dirname+'/public/templates/update.html');
})
//route del (delete)
app.get('/del',(req,res)=>{
    res.sendFile(__dirname+'/public/templates/del.html');
})

// Send data to db
var name, age
app.post('/voter', (req, res, next) => {
    name = req.body.name;
    age =  req.body.age;
    if (age == 0) {
        res.json({"info":"Min eligibity is 18yrs old", "result": "invalid age" });
    }
    else if (age <= 17) {
        res.json({"info":"Min eligibity is 18yrs old", "result": "Your under aged to vote" });
    }
    else {
        const value = new Voter({
            "name": name,
            "age": age,
        });
        value.save().then((data) => {
            console.log(data);
            res.json({ "result": data, "info": `Hello ${name}, since your are ${age} yrs old, your eligible to make your vote.` });
        }).catch(next);
    }
});

// get data from db
app.get('/voter/get/:id', (req, res,next) => {
    console.log( req.params.id)
    Voter.findOne({ "_id": req.params.id }).then((data) => {
        if(data==null){
            res.json({"result":"Data Not found"});
        }
        else{
            res.json({"result":data,"info":"Your data:"});
        }
       
    }).catch(next);
});

// // Delete data from db
app.delete('/voter/del', (req, res,next) => {
    Voter.findByIdAndRemove({ "_id": req.body.id })
    .then((data) => {
        if(data==null){
            res.json({"info":"Data Not Found","data":"Request success"});
        }else{
            res.json({"data":data,"info":"Deleted successfully"});
        }
    }).catch(next);
});
   

// // Update data from db
app.put('/voter/update', (req, res,next) => {
   
    Voter.findByIdAndUpdate({ _id: req.body.id },{"name":req.body.name ,"age":req.params.age} ).then(() => {
        Voter.findOne({_id: req.body.id }).then((data)=>{
            res.json({"result":data,"info":"Updated successfuly!"})
        })
   .catch(next);
 })
});




app.listen(5000, () => console.log("Listening to 5000..."));