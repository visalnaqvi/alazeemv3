import { and, collection, getDocs, query, where } from "firebase/firestore"
import db from "../config/firebase.js"
import jwt from "jsonwebtoken";

const userCollection = collection(db,"users_v2")
export const checkUser  = async (userId , passowrd)=>{
    const q = query(userCollection , where("userId","==",userId) , where('password',"==",passowrd));

    const userSnapShot = await getDocs(q);

    if(userSnapShot.docs.length==0){
        return false;
    }

    const payload = userSnapShot.docs[0].data();
    console.log("payload=====",payload.userId.toString())
    if(payload){
        console.log("payload==",payload)
       const token = generateToken(payload.userId)
       localStorage.setItem("token",token);
       return token;
    }

}

const generateToken =  (userId)=>{
    console.log("usserr",userId)
    const token = jwt.sign({ payload: userId }, 'XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN', {
        expiresIn: '1h'
      });
    return token;
}