const User=require('../models/user-model');
const bcrypt=require('bcryptjs');

const home=async (req,res)=>{
    try{
        res.status(200).send("Home");
    }
    catch(error)
    {
        console.log(error);
    }
};

const register=async (req,res)=>{
    try{
        const {username,email,phone,password}=req.body ;

        // const userExist=await User.findOne({ $or: [{email},{username}] }) ;
        const userExist=await User.findOne({email}) ;

        if(userExist)
        {
            return res.status(400).json({msg:"Email already exists"});
        }
        else{
            // Hashing Password
            const saltRound=await bcrypt.genSalt(10);
            const hash_password=await bcrypt.hash(password,saltRound);
            // New User
            const userCreated=await User.create({username,email,phone,password:hash_password});
            console.log(userCreated);
            res.status(200).json({
                data: userCreated, 
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
            });
        }
    }
    catch(error)
    {
        console.log("Register function error",error);
    }
}

const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist)
        {
            const isMatch=await bcrypt.compare(password,userExist.password);

            if(isMatch)
            {
                res.status(200).json({
                    data: userExist,
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                    }
                );
            }
            else{
                return res.status(400).json({msg:"Invalid Credentials"});
            }
        }
    } catch (error) {
        console.log("Login function error",error);
    }
}

//To send user data

const user=async(req,res)=>{
    try{
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }
    catch(error)
    {
        console.log("User function error",error);
    }
}
module.exports={home,register,login,user};