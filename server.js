require('dotenv').config();
const express=require('express');
const app=express();
const authroute=require('./router/auth-router');
const contactRoute=require('./router/contact-router');
const serviceRoute=require('./router/service-router');
const adminRoute=require('./router/admin-router');
const connectDB=require('./utils/db');
const errorMiddleware=require('./middlewares/error-middleware');
const cors=require('cors');

const corsOptions={
    origin: "*",
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD",],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth/",authroute);
app.use("/api/form/",contactRoute);
app.use("/api/data/",serviceRoute);
app.use("/api/admin",adminRoute);
app.use(errorMiddleware((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }));

const PORT=process.env.PORT || 5000;

// const path=require('path');
// app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"client","build")));
//     app.sendFile(path.resolve(__dirname,"client","build","index.html"));
// });
app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Listening at PORT : ${PORT}`);
    });
});
