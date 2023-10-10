import db from "../config/firebase.js"
import { collection } from "firebase/firestore"
export const umrahPackagesCollection = collection(db, "umrahPackages_v2")
export const iraqPackagesCollection = collection(db, "iraqPackages_v2")
export const holidayPackagesCollection = collection(db, "holiday_packages_v2")
export const vendorCollection = collection(db, "vendor_v2");
export const userCollection = collection(db,"users_v2");