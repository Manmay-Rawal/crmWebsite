import bcrypt from "bcrypt"


const saltRound=10

 export const createHashPassword=async(password)=>{
    try{
          return bcrypt.hashSync(password,saltRound)  
    }
    catch(error){
        throw new error("error while Hashing password")
    }
 }


 export const comparePassword=async(password,hashedpass)=>{
    try{
        return bcrypt.compareSync(password,hashedpass)
    }catch(error){
        throw new Error("error while comparing password")
    }
 }