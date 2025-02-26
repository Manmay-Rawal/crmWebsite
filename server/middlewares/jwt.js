import jwt from "jsonwebtoken"

import { config } from "dotenv"
config()
const secretKey=process.env.JWT_SECRET

export const verifyToken=async(req,res,next)=>{
    try{
        let authToken=req.headers.authorization.split(" ")[1]
        console.log(authToken);
        
        if(authToken){
            try {
                const { id } =jwt.verify(authToken,secretKey)
                req.id=id
                next()
            } catch (error) {
                return res.status(400).send({error:"token verification failed",msg:error.message})
            }
            
        }else{
            return res.status(400).send({error:"authorization token is required"})
        }

    }catch(error){
        return res.status(500).send({error:"internal server error",msg:error.message})
    }
}