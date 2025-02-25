import db from "../config/firebase.js"
import { getDocs, setDoc, orderBy, query, getDoc, doc, where, collection } from "firebase/firestore";
import { navCollection, umrahPackagesCollection, hajjCollection, iraqPackagesCollection, holidayPackagesCollection, flightCollection, tagsCollection, turkeyCollection, getCollectionName } from "@/config/collections.js";
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

export const getCitiesFromTags = async () => {
    try {
        const docRef = doc(db, process.env.NEXT_PUBLIC_TAGS_COLLECTION, "tags");

        // Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const citiesArray = data.cities;
            return citiesArray;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }

}
export const getHajjPackages = async () => {
    try {
        const q = query(hajjCollection, orderBy("order"));

        const hajjSnapshot = await getDocs(q);

        let hajjPackages = []

        hajjSnapshot.forEach(doc => {
            hajjPackages.push(doc.data());
        })


        return hajjPackages;
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }

}

export const getTurkeyPackages = async () => {
    try {
        const q = query(turkeyCollection, orderBy("order"));

        const tuekySnapshot = await getDocs(q);

        let turkeyPackages = []

        tuekySnapshot.forEach(doc => {
            turkeyPackages.push(doc.data());
        })


        return turkeyPackages;
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }

}

export const getFlightFare = async () => {
    try {
        const q = query(flightCollection, orderBy("order"));

        const snapshot = await getDocs(q);

        let flights = []

        snapshot.forEach(doc => {
            flights.push(doc.data());
        })


        return flights;
    } catch (err) {
        if (err) {
            return { status: "warning", msg: "Something went wrong cannot get package" }
        }
    }

}


export const getIraqPackages = async (type) => {
    try {
        const q = query(iraqPackagesCollection, orderBy("order"));

        const iraqSnapshot = await getDocs(q);

        let iraqPackages = []
        console.log("snap shot", iraqSnapshot)
        iraqSnapshot.forEach(doc => {
            console.log("doc", doc.data())
            if (doc.data().type && doc.data().type == type) {
                iraqPackages.push(doc.data());
            }
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

export const getPageDocument = async () => {
    try {
        const q = query(collection(db, "page_titles"));
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

        case "hajj": return await getHajjPackages();

        case "flight-fare": return await getFlightFare();

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
            case "hajj": collectionRef = `${process.env.NEXT_PUBLIC_HAJJ_COLLECTION}`;
                break;
            case "turkey": collectionRef = `${process.env.NEXT_PUBLIC_TURKEY_COLLECTION}`;
                break;
            case "flight-fare": collectionRef = `${process.env.NEXT_PUBLIC_FLIGHT_COLLECTION}`;
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