import { otpModel } from "../models/otpModel.js"
import userModel from "../models/userModel.js"
import { sendOtpMail } from "../utils/nodemailer.js"
import { generateOTP } from "../utils/otp.js"



export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User is not registered" });
        }

        const otp = generateOTP();
        const isUser = await otpModel.findOne({ email });

        if (isUser) {
            await otpModel.updateOne({ email }, { $set: { otp } });
        } else {
            let otpData = new otpModel({ email, otp });
            await otpData.save();
        }

        await sendOtpMail(email, otp);

        return res.status(200).json({ success: true, message: "OTP generated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error", msg: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp} = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User is not registered" });
        }

        // Check if OTP exists for the email
        const otpRecord = await otpModel.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found, please request a new one" });
        }

        // Validate OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP, please try again" });
        }
        if(user){
            return res.status(200).json({success: true, message: "OTP verified successfully", name:user.firstName}); 
        }
        
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
};

