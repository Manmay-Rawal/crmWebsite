import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:Number,required:true},
    createdAt: { type: Date, default: Date.now, expires: 300 }// after 5 min it will be deleted
},{timestamps:true})

export const otpModel=mongoose.model("otp",otpSchema)