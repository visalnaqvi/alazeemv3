import db from "../config/firebase.js"
import { collection } from "firebase/firestore"
import dotenv from "dotenv"
dotenv.config()
export const umrahPackagesCollection = collection(db, `${process.env.NEXT_PUBLIC_UMRAH_COLLECTION}`)
export const iraqPackagesCollection = collection(db, `${process.env.NEXT_PUBLIC_IRAQ_COLLECTION}`)
export const holidayPackagesCollection = collection(db, `${process.env.NEXT_PUBLIC_HOLIDAY_COLLECTION}`)
export const vendorCollection = collection(db, `${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`);
export const userCollection = collection(db,`${process.env.NEXT_PUBLIC_USERS_COLLECTION}`);
export const navCollection = collection(db,`${process.env.NEXT_PUBLIC_NAVLINK_COLLECTION}`);

export const getCollectionName = (packageId)=>{
    switch(packageId){
        case "hajjUmrah" : return `${process.env.NEXT_PUBLIC_UMRAH_COLLECTION}`;

        case "iraq" : return `${process.env.NEXT_PUBLIC_IRAQ_COLLECTION}`;
        
        case "links" : return `${process.env.NEXT_PUBLIC_NAVLINK_COLLECTION}`;

        case "vendors" : return `${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`;

        default : return "";
    }
}