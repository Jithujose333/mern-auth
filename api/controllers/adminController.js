import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'



export const adminDashboard = async(req ,res ,next)=>{
    try {
        const userDetails = await User.find({isAdmin:false})
        res.status(200).json({ success: true, users: userDetails });

    } catch (error) {
        next(error)
    }
}



export const adminUpdateUser = async (req, res, next) => {
    
    console.log(req.body.username)
    try {
        const updates = {};
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({ success: true, updatedUser: rest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const adminDeleteUser = async(req,res,next) =>{
    
   try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted...')
   } catch (error) {
    next(error)
   }
}


export const adminAddUser = async (req,res,next)=> {

    const {username,email,password,role} = req.body
console.log(req.body)
    

const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  });

  if (existingUser) {
    return res.status(400).json({ message: "Username or email already exists" });
  }

    const hashedPassword = bcryptjs.hashSync(password,10)
    if(role==="Admin"){
    var newUser = new User({username,email,password:hashedPassword,isAdmin:true})
    }else{
        var newUser = new User({username,email,password:hashedPassword})
    }
    try {

        await newUser.save()

       

     res.status(201).json({message:"user created sucessfully",user:req.body.role==="Admin"?'':req.body})
        
    } catch (error) {

     next(error)
    }

}

