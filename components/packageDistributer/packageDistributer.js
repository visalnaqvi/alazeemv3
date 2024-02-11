import styles from "./packageDistributer.module.css"
import PackageCard from "../cards/packageCard/packageCard";
import { useEffect, useState } from "react";
const PackageDistributer = ({titles , umrahPackages , fetchData})=>{
    const [dulexPackages , setDulexPackages] = useState([]);
    const [ecoPackages , setEcoPackages] = useState([]);
    const [ramzanPackages , setRamzanPackages] = useState([]);
    useEffect(()=>{
        if(umrahPackages){
            let dulex_pack = umrahPackages.filter((pack)=>pack.category=="dulex")
            let eco_pack = umrahPackages.filter((pack)=>pack.category=="economy")
            let ramzan_pack = umrahPackages.filter((pack)=>pack.category=="ramzan")
            setDulexPackages(dulex_pack);
            setEcoPackages(eco_pack);
            setRamzanPackages(ramzan_pack)
        }
    },[umrahPackages])
   //  ${titles.isEcoTop && "reverse"}
    return(
        <div className={`body-wrapper column
     
         `}>
         { ramzanPackages.length>0 && <div style={{width:"100%"}}>
                
                <h2 className="boldHeading center">{titles.ramzanTitle}</h2>
                <div className="body-wrapper">
                    {
                        ramzanPackages.map((pkg,i)=>(
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
                </div>}


        {dulexPackages.length>0 && <div style={{width:"100%"}}>
                
        <h2 className="boldHeading center">{titles.dulexTitle}</h2>
        <div className="body-wrapper">
            {
                dulexPackages.map((pkg,i)=>(
                    <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                ))
            }
        </div>
        </div>}
        {ecoPackages.length > 0 && <div>
        <h2 className="boldHeading center">{titles.ecoTitle}</h2>
        <div className="body-wrapper">
            {
                ecoPackages.map((pkg,i)=>(
                    <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                ))
            }
        </div>
        </div>}
        
        </div>
    )
}

export default PackageDistributer;