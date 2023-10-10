import { and, collection, getDocs, query, where } from "firebase/firestore"
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
       const token = generateToken(payload.userId)
       localStorage.setItem("token",token);
       return token;
    }

}

const generateToken =  (userId)=>{
    const token = jwt.sign({ payload: userId }, 'XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN', {
        expiresIn: '1h'
      });
    return token;
}