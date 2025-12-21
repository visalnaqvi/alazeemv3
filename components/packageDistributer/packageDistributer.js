import styles from "./packageDistributer.module.css"
import PackageCard from "../cards/packageCard/packageCard";
import { useEffect, useState } from "react";
import { updatePackageData } from "@/services/updateData";
const PackageDistributer = ({ titles, umrahPackages, fetchData,sections }) => {
    // const [dulexPackages, setDulexPackages] = useState([]);
    // const [ecoPackages, setEcoPackages] = useState([]);
    // const [ramzanPackages, setRamzanPackages] = useState([]);
    const [pkgStruct , setPkgStruct] = useState([])
    useEffect(() => {
        if (umrahPackages) {
            // let dulex_pack = umrahPackages.filter((pack) => pack.category == "dulex")
            // let eco_pack = umrahPackages.filter((pack) => pack.category == "economy")
            // let ramzan_pack = umrahPackages.filter((pack) => pack.category == "ramzan")
            let pkgs = []
            sections.forEach(section => {
                let pkg = umrahPackages.filter((pack)=>pack.sectionData.some(s => s.id === section.id))
                pkgs.push({sectionTitle:section.title , data:pkg})
            });

            setPkgStruct(pkgs)

            // temp(umrahPackages)
            // setDulexPackages(dulex_pack);
            // setEcoPackages(eco_pack);
            // setRamzanPackages(ramzan_pack)
        }
    }, [umrahPackages])

       const getSectionTitle = (sectionId) =>
        sections?.find(s => s.id == sectionId)?.title || "";

    // const temp = async (pks) =>{
    //     pks.map(async (p,index)=>{
    //        await updatePackageData({...p , sectionData:[{id:p.sectionId , price:p.price}]} , "hajjUmrah")
    //     })
    // }
    
    // if (ramzanPackages.length == 0 && ecoPackages.length == 0 && dulexPackages.length == 0) {
    //     return (
    //         <div style={{ fontSize: '20px', fontWeight: 600, textAlign: "center", marginTop: "40px", marginBottom: "100px", width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8", borderRadius: "5px" }}>No Umrah Packages Found</div>
    //     )
    // }
    return (
        <div className={`body-wrapper column`}>
            {
                pkgStruct.map((pkg,index)=>(
                    <div key={index}>
                        {pkg.data.length > 0 && <div>
                                        <h2 className="boldHeading center">{pkg.sectionTitle}</h2>  

                <div className="body-wrapper">
                    {
                        pkg.data.map((pkg, i) => (
                            <PackageCard getSectionTitle={getSectionTitle} fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>}
                    </div>
                ))
            }
            {/* {ecoPackages.length > 0 && <div>
                <h2 className="boldHeading center">{titles.ecoTitle} - eco title</h2>
                <div className="body-wrapper">
                    {
                        ecoPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>}



            {dulexPackages.length > 0 && <div style={{ width: "100%" }}>

                <h2 className="boldHeading center">{titles.dulexTitle} - dulex title</h2>
                <div className="body-wrapper">
                    {
                        dulexPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>}

            {ramzanPackages.length > 0 && <div style={{ width: "100%" }}>

                <h2 className="boldHeading center">{titles.ramzanTitle} - ramzan title</h2>
                <div className="body-wrapper">
                    {
                        ramzanPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>} */}


        </div>
    )
}

export default PackageDistributer;