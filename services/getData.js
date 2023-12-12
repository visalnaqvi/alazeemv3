import db from "../config/firebase.js"
import { getDocs, orderBy, query, getDoc, doc, where, collection } from "firebase/firestore";
import { navCollection, umrahPackagesCollection, iraqPackagesCollection, holidayPackagesCollection } from "@/config/collections.js";
import { getAllVendorsList } from "./vendor.js";
import dotenv from "dotenv"
dotenv.config()
export const getUmrahPackages = async () => {
    try {
        const q = query(umrahPackagesCollection, orderBy("order"));

        const umrahSnapshot = await getDocs(q);

        let umrahPackages = []

        umrahSnapshot.forEach(doc => {
            umrahPackages.push(doc.data());
        })


        return umrahPackages;
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }

}

export const getIraqPackages = async (type) => {
    try {
        const q = type == "all" ? query(iraqPackagesCollection, orderBy("order")) : query(iraqPackagesCollection, where("type", "==", type));

        const iraqSnapshot = await getDocs(q);

        let iraqPackages = []

        iraqSnapshot.forEach(doc => {
            iraqPackages.push(doc.data());
        })


        return iraqPackages;
    }
    catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }
}


export const getPageTitle = async (id) => {
    const docRef = doc(db, "page_titles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return {};
    }
}

export const getHolidayPackages = async (city) => {
    try {
        const q = city == "all" ? query(holidayPackagesCollection) : query(holidayPackagesCollection, where("city", "==", city));

        const holidaySnapshot = await getDocs(q);

        let holidayPackages = []

        holidaySnapshot.forEach(doc => {
            holidayPackages.push(doc.data());
        })


        return holidayPackages;
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }

}

export const getPageDocument = async ()=>{
    try {
        const q = query(collection(db,"page_titles"));
        const docs = await getDocs(q);
        let data = [];
        docs.forEach(doc => data.push(doc.data()));
        return data;
    } catch (err) {
        console.log(err)
    }
}

export const getAdminPackages = async (packageid) => {
    switch (packageid) {
        case "hajjUmrah": return await getUmrahPackages();

        case "iraq": return await getIraqPackages("all");

        case "holiday": return await getHolidayPackages("all");

        case "vendors": return await getAllVendorsList();

        case "page-setting": return await getPageDocument();

        default: return [];

    }
}

export const getPackageWithId = async (collection, packageId) => {
    try {
        let collectionRef;
        switch (collection) {
            case "hajjUmrah": collectionRef = `${process.env.NEXT_PUBLIC_UMRAH_COLLECTION}`;
                break;
            case "iraq": collectionRef = `${process.env.NEXT_PUBLIC_IRAQ_COLLECTION}`;
                break;
            case "holiday": collectionRef = `${process.env.NEXT_PUBLIC_HOLIDAY_COLLECTION}`;
                break;
            default: return;
        }

        const docRef = doc(db, collectionRef, packageId)
        const document = await getDoc(docRef)
        if (document.exists()) {
            return document.data();
        } else {
            return {};
        }
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }
}


export const getNavLinks = async () => {
    try {
        const q = query(navCollection, orderBy("order"));
        const docs = await getDocs(q);
        let data = [];
        docs.forEach(doc => data.push(doc.data()));
        return data;
    } catch (err) {
        console.log(err)
    }
}

export const getNavLinkFromId = async (linkId) => {
    try {
        const docRef = doc(db, `${process.env.NEXT_PUBLIC_NAVLINK_COLLECTION}`, linkId);
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