const mongoose=require('mongoose');

// const URI="mongodb://127.0.0.1:27017/backend_admin";
// const URI="mongodb+srv://roshanvats2003:29082003@clusterrosssh.fyx46bc.mongodb.net/backend_admin?retryWrites=true&w=majority&appName=ClusterRosssh"
const URI=process.env.MONGODB_URI;

const connectDB=async ()=>{
    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error("Database Connection Failed",error);
        process.exit(0);
    }
}
module.exports=connectDB;