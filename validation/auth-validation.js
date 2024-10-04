const {z}=require('zod');

const signupSchema=z.object({
    username: z
    .string({required_error: "Username is Required" })
    .trim()
    .min(3,{message:"Name must of atleast 3 characters"}),

    email: z
    .string({required_error: "Email is Required" })
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Enter Valid Email"}),

    phone: z
    .string({required_error:"Phone is Required"})
    .trim()
    .min(10, { message: "Invalid phone number format" })
    .max(10,{message:"Maximum Should be 10 digits"}),
    
    password: z
    .string({required_error:"Password is Required"})
    .min(6,{message:"Password must have atleast 6 characters"})
    .max(16,{message:"Password should less than 16 chars"})
});
module.exports=signupSchema;

