import { getCollectionName } from "@/config/collections";
import { deleteDoc , doc} from "firebase/firestore";
import db from "@/config/firebase.js";
export const deletePackage = async (packageId , collectionId)=>{
    try{
        let collectionName = getCollectionName(collectionId);
        await deleteDoc(doc(db, collectionName, packageId));
        return {status:"success" , msg:"deleted successfully"}
    }catch(err){
        console.log(err);
        return {status:"warning",msg:"cannot delete package"}
    }
   
}