import db from "@/config/firebase.js";
import { getCollectionName } from "@/config/collections";
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
    return {status:"success",msg:"Package Updated Successfully"}
}
    catch (err){
        if(err){
            return {status:"warning" , msg:"Something went wrong add new package"}
        }
    }
}

export const updatePageSetting = async (details ) =>{
  
    console.log("somethin", details)
    const docRef = doc(db , "page_titles" , "hajjUmrah");
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