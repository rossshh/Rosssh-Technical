const Service=require('../models/service-model');

const services=async(req,res)=>{
    try {   
        const serviceData=await Service.find();
        if(!serviceData)
        {
            console.log("Services Not found");
        }
        return res.status(200).json({serviceData});
    } catch (error) {
        console.log("service error",error);
    }
}
module.exports=services;
