import nodemailer from "nodemailer";
import { config } from "dotenv";
config();


const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_ADD,
        pass:process.env.EMAIL_PASS
    }
})

export const sendOtpMail = async(to,otp)=>{
    try {
        const mailoption={
            from:process.env.EMAIL_ADD,
            to,
            subject:"Otp Request for mail login",
            text:`Otp for this ${process.env.EMAIL_ADD} mail update ${otp}`
        }
        console.log(mailoption)
        await transport.sendMail(mailoption);
    } catch (error) {
        console.error("Error while sending mail:", error);
        throw new Error("error while sending mail")
        
    }
}