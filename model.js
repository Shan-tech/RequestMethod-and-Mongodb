const mongoose=require('mongoose');
const dbSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
});
const Voter=mongoose.model('Voter',dbSchema);
module.exports=Voter;