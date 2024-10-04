const Contact=require('../models/contact-model');

const contact= async (req,res)=>{
    try {
        const response=req.body;
         await Contact.create(response);
         return res.status(200).json({message:"Message Sent Succesfully"});
    } catch (error) {
        return res.status(401).json({message:"Something went Error"})
    }
}
module.exports=contact;