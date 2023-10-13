import db from "@/config/firebase.js";
import { addDoc, doc, setDoc, updateDoc , collection } from "firebase/firestore";
import dotenv from "dotenv"
dotenv.config()

export const updateOrder = async(newOrder , docId , packageId)=>{
    try{const collectionName = getCollectionName(packageId);

    const docRef = doc(db , collectionName , docId);
    await updateDoc(docRef , {
        order:newOrder
    });
    }catch (err){
        if(err){
            return {status:"warning" , msg:"Something went wrong cannot update order"}
        }
    }
}

const getCollectionName = (packageId)=>{
    switch(packageId){
        case "hajjUmrah" : return `${process.env.NEXT_PUBLIC_UMRAH_COLLECTION}`;

        case "iraq" : return `${process.env.NEXT_PUBLIC_IRAQ_COLLECTION}`;
        
        case "links" : return `${process.env.NEXT_PUBLIC_NAVLINK_COLLECTION}`;

        default : return "";
    }
}

export const updatePackageData = async (details , packageId ) =>{
    const collectionName = getCollectionName(packageId);

    const docRef = doc(db , collectionName , details.id);
    try{
        await setDoc(docRef , details);
        return {status:"success",msg:"Package Updated Successfully"}
    }catch (err){
        if(err){
            console.log(err);
            return {status:"warning" , msg:"Something went wrong cannot update database"};
        }
    }
}

export const addNewPackage = async (details , packageId)=>{
    try{const collectionName = getCollectionName(packageId)
    const docRef = await addDoc(collection(db,collectionName),details);
    details.id = docRef.id;
    await updatePackageData(details , packageId);
}
    catch (err){
        if(err){
            return {status:"warning" , msg:"Something went wrong add new package"}
        }
    }
}

export const updateNavLink = async (details , packageId ) =>{
    const collectionName = getCollectionName(packageId);

    const docRef = doc(db , collectionName , details.id);
    try{
        await setDoc(docRef , details);
        return {status:"success",msg:"Package Updated Successfully"}
    }catch (err){
        if(err){
            console.log(err);
            return {status:"warning" , msg:"Something went wrong cannot update database"};
        }
    }
}