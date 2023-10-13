import { addDoc, getDocs, query, where } from "firebase/firestore"
import { userCollection } from "@/config/collections";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const checkUser  = async (userId , passowrd)=>{
    const q = query(userCollection , where("userId","==",userId) , where('password',"==",passowrd));

    const userSnapShot = await getDocs(q);

    if(userSnapShot.docs.length==0){
        return false;
    }

    const payload = userSnapShot.docs[0].data();
    if(payload){
        payload.passowrd = "huuurrrrrrr"
       const token = generateToken(payload)
       return token;
    }

}

const generateToken =  (payload)=>{
    const token = jwt.sign({payload}, `${process.env.NEXT_PUBLIC_SECRECT_KEY_JWT}`, {
        expiresIn: '1h'
      });
    localStorage.setItem("token",token);
    return token;
}

export const checkStorageForAdminToken = ()=>{
    try{
        let token = localStorage.getItem("token");
        if(!token){
            return false;
        }
        const payload = jwt.verify(token , `${process.env.NEXT_PUBLIC_SECRECT_KEY_JWT}` );
     
        return payload.payload.role == 'admin';
    }catch(err){
            localStorage.removeItem("token")
    }
    
}

export const checkStorageForToken = ()=>{
    try{
        let token = localStorage.getItem("token");
        if(token){
            const payload = jwt.verify(token , `${process.env.NEXT_PUBLIC_SECRECT_KEY_JWT}` );
          
            return payload.payload;
        }
    }catch(err){
        if(err.name=="TokenExpiredError"){
            localStorage.removeItem("token")
        }
    }
    

    return null;
   
}

export const addUser = async (data)=>{
    try{
        await addDoc(userCollection , data);
        let token = generateToken(data);
        return token;
    }catch(err){
        return {status:"warning" , msg:"Something went wrong"}
    }
    
}