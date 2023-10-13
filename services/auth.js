import { addDoc, and, collection, doc, getDocs, query, where } from "firebase/firestore"
import { userCollection } from "@/config/collections";
import jwt from "jsonwebtoken";


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
    const token = jwt.sign({payload}, 'XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN', {
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
        const payload = jwt.verify(token , "XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN" );
     
        return payload.payload.role == 'admin';
    }catch(err){
            localStorage.removeItem("token")
    }
    
}

export const checkStorageForToken = ()=>{
    try{
        let token = localStorage.getItem("token");
        if(token){
            const payload = jwt.verify(token , "XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN" );
          
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