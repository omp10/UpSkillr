import {User} from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req,res) => {
    try {
       
        const {name, email, password, role} = req.body; 
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        
        // Validate role if provided
        let userRole = "student"; // Default
        if(role){
            if(["instructor", "student"].includes(role)){
                userRole = role;
            } else {
                return res.status(400).json({
                    success:false,
                    message:"Invalid role. Role must be either 'student' or 'instructor'."
                })
            }
        }
        
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role: userRole
        });
        
        // Automatically log the user in after registration
        const userWithoutPassword = await User.findById(newUser._id).select("-password");
        if(!userWithoutPassword){
            return res.status(500).json({
                success:false,
                message:"Failed to retrieve user after creation"
            });
        }
        
        // Use generateToken to automatically log in and return user data
        generateToken(res, userWithoutPassword, "Account created successfully.");
        
    } catch (error) {
        console.log("Registration error:", error);
        
        // Handle duplicate email error
        if(error.code === 11000 || error.keyPattern?.email){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        
        // Handle validation errors
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                success:false,
                message: error.message || "Validation error"
            })
        }
        
        return res.status(500).json({
            success:false,
            message: error.message || "Failed to register"
        })
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        
        // Get user without password for response
        const userWithoutPassword = await User.findById(user._id).select("-password");
        generateToken(res, userWithoutPassword, `Welcome back ${user.name}`);

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the cookie with same settings as when it was set
        // Must match exactly: httpOnly, secure, sameSite, path
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        
        // Also set it to empty string with maxAge 0 as backup
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0,
            path: "/",
        });
        
        return res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        });
    }
}