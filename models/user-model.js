const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
});

//JSON WEB TOKEN
userSchema.methods.generateToken=async function() {
    try {
       return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin,
       },
       process.env.SECRET_KEY,
       {
        expiresIn:"30d",
       }
    ) 
    } 
    catch (error) {
        console.error(error);
    }
}


//define the model or collection name

const User=new mongoose.model("User",userSchema);

module.exports=User;