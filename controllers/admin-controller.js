const User=require('../models/user-model');
const Contact=require('../models/contact-model');

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0});
        if(!users || users.length===0)
        {
            return res.status(404).json({message:"Users Not Found"});
        }
        return res.status(200).json({users});
        next();
    } catch (error) {
        next(error);
    }
}

const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"Contacts Not Found"});
        }
        return res.status(200).json({contacts});
        next();
    } catch (error) {
        next(error);
    }
};

const deleteUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Succesfully"});

    } catch (error) {
        next(error);
    }
};

const getUserById=async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id},{password:0});
        return res.status(200).json({data});

    } catch (error) {
        next(error);
    }
};

const updateUserById=async(req,res)=>{
    try {
        const id = req.params.id;
        const updatedData=req.body;

        const updateUser=await User.updateOne({_id:id},{
            $set: updatedData,
        })
        return res.status(200).json({updatedData});
    } catch (error) {
        next(error);
    }
}

module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById};