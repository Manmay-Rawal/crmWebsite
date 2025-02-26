import express from "express";
import userModel from "../models/userModel.js";
import {userSignup,userLogin, getUser } from "../controllers/userController.js"
import {verifyToken} from"../middlewares/jwt.js"
import { forgetPassword, verifyOtp } from "../controllers/otpController.js";


const userRouter=express.Router()


//APIs
userRouter.get("/",(req,res)=>res.send("user router is working"))

userRouter.get("/all",async(req,res)=>{
    let allUsers=await userModel.find()
    res.status(200).send(allUsers)
})


// user signup
userRouter.post("/signup",userSignup)

// user login
userRouter.post("/login",userLogin)

//get Auth context
userRouter.get("/auth",verifyToken,getUser)

// post user forgetPassword
userRouter.post("/password",forgetPassword)

//post user verify otp
userRouter.post("/verify-otp", (req, res) => {
    console.log("Verify OTP Request Body:", req.body);
    verifyOtp(req, res);
  });
  




export default userRouter

//hii