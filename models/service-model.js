const mongoose=require('mongoose');

const serviceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

const Service=new mongoose.model('Service',serviceSchema);
module.exports=Service; 