import styles from "./packageDistributer.module.css"
import PackageCard from "../cards/packageCard/packageCard";
import { useEffect, useState } from "react";
const PackageDistributer = ({titles , umrahPackages , fetchData})=>{
    const [dulexPackages , setDulexPackages] = useState([]);
    const [ecoPackages , setEcoPackages] = useState([]);
    useEffect(()=>{
        console.log("all packages:",umrahPackages)
        if(umrahPackages){
            let dulex_pack = umrahPackages.filter((pack)=>pack.category=="dulex")
            let eco_pack = umrahPackages.filter((pack)=>pack.category=="economy")
            setDulexPackages(dulex_pack);
            setEcoPackages(eco_pack);
        }
    },[umrahPackages])

    useEffect(()=>{
        console.log("dulex package:",dulexPackages);
    },[dulexPackages])
    useEffect(()=>{
        console.log("economy package:",ecoPackages);
    },[ecoPackages])
    return(
        <div className={`body-wrapper column ${titles.isEcoTop && "reverse"}`}>
            <div>
        <h2 className="boldHeading center">{titles.dulexTitle}</h2>
        <div className="body-wrapper">
            {
                dulexPackages.map((pkg,i)=>(
                    <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                ))
            }
        </div>
        </div>
        <div>
        <h2 className="boldHeading center">{titles.ecoTitle}</h2>
        <div className="body-wrapper">
            {
                ecoPackages.map((pkg,i)=>(
                    <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                ))
            }
        </div>
        </div>
        </div>
    )
}

export default PackageDistributer;