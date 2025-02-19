

import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";



export const test = (req,res)=>{
        res.json({
            message:"hello world"
        })
        
    }

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You are not authorized"));
    }

    try {
        const updates = {};

        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.password) {
            updates.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.file) updates.profilePicture = req.file.path;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({ success: true, ...rest });
    } catch (error) {
        next(error);
    }
};


