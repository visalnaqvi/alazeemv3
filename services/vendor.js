import { query, collection, getDocs, getDoc, doc, setDoc , addDoc } from "firebase/firestore";
import db from "../config/firebase.js"
import { vendorCollection } from "@/config/collections.js";
import dotenv from "dotenv"
dotenv.config()
export const getAllVendorsList = async () => {
    try {
        const q = query(vendorCollection)
        const snapShot = await getDocs(q);
        let allVendors = []
        snapShot.forEach((doc) => {
            allVendors.push(doc.data())
        })

        return allVendors;
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get vendor details" }
        }
    }

}

export const getVendorDetailsFromId = async (vendorId) => {
    try {
        const docRef = doc(db, `${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`, vendorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
            
        } else {
            return [];
        }
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get vendor details" }
        }
    }

}

export const updateVendor = async (details) => {
    const docRef = doc(db, `${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`, details.id);
    try {
        await setDoc(docRef, details)
        return { status: "success", msg: "Vendor Update Successfully" }
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot update vendor" }
        }
    }
}

export const handleVendorDelete = async (vendorIds, docDetails) => {
    try {
        vendorIds.forEach(async (vendor) => {
            const docRef = doc(db, `${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`, vendor);
            let dataSnap = await getDoc(docRef);

            if (dataSnap.exists()) {
                let data = dataSnap.data();
                let packages = data.packages;
                let newPackages = packages.filter(p => p.id != docDetails.id)
                data.packages = [...newPackages];
                await updateVendor(data);
            }
        })
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot delete vendor" }
        }
    }


}

export const handleNewVendor = async (vendorIds, docDetails) => {
    try {
        vendorIds.forEach(async (vendor) => {
            const docRef = doc(db, `${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`, vendor);
           
            let docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let data = docSnap.data();
                let packages = data.packages;
                let newPackages = [...packages, docDetails]
                data.packages = [...newPackages]
                let res = await updateVendor(data)
                if (res.status == "warning") {
                    return res;
                }
            }
        })

        return { status: "success", msg: "Package Update Successfully" }
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot update package" }
        }
    }

}

export const addNewVendor = async (details)=>{
    try{
    const docRef = await addDoc(collection(db,`${process.env.NEXT_PUBLIC_VENDOR_COLLECTION}`),details);
    details.id = docRef.id;
   
    await updateVendor(details);
    return {status:"success",msg:"New Vendor Added Successfully"}
}
    catch (err){
        if(err){
         
            return {status:"warning" , msg:"Something went wrong add new vendor"}
        }
    }
}

export const getPackageVendor = async (packageId)=>{
    try{
        let allVendors = await getAllVendorsList();
        let packageVendors =[]
        allVendors.forEach(p => {
            p.packages.forEach(t => {
                if (t.id == packageId) {
                    packageVendors.push(p);
                }
            })
        })
        return packageVendors;
    }catch(err){
        return {status:"warning",msg:"Something went wrong cannot get vendor"}
    }
}