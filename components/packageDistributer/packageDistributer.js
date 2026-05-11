import styles from "./packageDistributer.module.css"
import PackageCard from "../cards/packageCard/packageCard";
import { useEffect, useState } from "react";
import { updatePackageData } from "@/services/updateData";
const PackageDistributer = ({ titles, umrahPackages, fetchData,sections }) => {
    const [pkgStruct , setPkgStruct] = useState([])
    useEffect(() => {
        if (umrahPackages) {
            let pkgs = []
            sections.forEach(section => {
                let pkg = umrahPackages.filter((pack)=>pack.sectionId.includes(section.id))
                pkgs.push({sectionTitle:section.title , data:pkg})
            });     

            setPkgStruct(pkgs)
        }
    }, [umrahPackages])
       
    return (
        <div className={`body-wrapper column`}>
            {
                pkgStruct.map((pkg,index)=>(
                    <div key={index} className="full-width">
                        {pkg.data.length > 0 && 
                        <div className="full-width">
                            <h2 className="boldHeading center">{pkg.sectionTitle}</h2>  

                            <div className="body-wrapper">
                                {
                                    pkg.data.map((pkg, i) => (
                                        <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                                    ))
                                }
                            </div>
                        </div>}
                    </div>
                ))
            }
        </div>
    )
}

export default PackageDistributer;