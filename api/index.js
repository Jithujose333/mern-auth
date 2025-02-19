import express from "express"
import mongoose from "mongoose"
import  dotenv from "dotenv"
import cors from 'cors';
import userRoutes from "./routes/user/userRoutes.js"
import authRoutes from "./routes/user/authRoutes.js"
// import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config()


const app = express()



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended :true}))

app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB")
}).catch((error)=>{
    console.log(error)
})



app.listen(3000,()=>{
    console.log("server listening on port 3000!")
})


app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
// app.use('/api', uploadRoutes);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode|| 500
   const message = err.message || "Internal Server Error"
   return res.status(statusCode).json({
    success : false,
    message,
    statusCode,
   })
})