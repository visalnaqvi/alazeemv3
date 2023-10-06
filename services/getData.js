import db from "../config/firebase.js"
import { collection, getDocs, orderBy , query, getDoc , doc, where } from "firebase/firestore"; 

const umrahPackagesCollection = collection(db, "umrahPackages_v2")
const iraqPackagesCollection = collection(db, "iraqPackages_v2")
const holidayPackagesCollection = collection(db, "holiday_packages_v2")
export const getUmrahPackages =  async ()=>{
    const q = query(umrahPackagesCollection, orderBy("order"));

    const umrahSnapshot = await getDocs(q);

    let umrahPackages = []

    umrahSnapshot.forEach(doc=>{
        umrahPackages.push(doc.data());
    })

    return umrahPackages;
}

export const getIraqPackages =  async (type)=>{
    const q = type=="all" ? query(iraqPackagesCollection) : query(iraqPackagesCollection, where("type","==",type));

    const iraqSnapshot = await getDocs(q);

    let iraqPackages = []

    iraqSnapshot.forEach(doc=>{
        iraqPackages.push(doc.data());
    })


    return iraqPackages;
}


export const getPageTitle =  async (id)=>{
    const docRef = doc(db, "page_titles", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return {};
    }
}

export const getHolidayPackages = async (city)=>{
    const q = city=="all" ? query(holidayPackagesCollection) : query(holidayPackagesCollection, where("city","==",city));

    const holidaySnapshot = await getDocs(q);

    let holidayPackages = []

    holidaySnapshot.forEach(doc=>{
        holidayPackages.push(doc.data());
    })


    return holidayPackages;

}

export const getAdminPackages = async (packageid) =>{
    switch(packageid){
        case "hajjUmrah": return await getUmrahPackages();
                      
        case "iraq" : return await getIraqPackages("all");
                        
        case "holiday" : return await getHolidayPackages("all");

        default : return [];
                     
    }
}


