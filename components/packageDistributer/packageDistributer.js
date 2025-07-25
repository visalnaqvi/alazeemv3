import styles from "./packageDistributer.module.css"
import PackageCard from "../cards/packageCard/packageCard";
import { useEffect, useState } from "react";
const PackageDistributer = ({ titles, umrahPackages, fetchData }) => {
    const [dulexPackages, setDulexPackages] = useState([]);
    const [ecoPackages, setEcoPackages] = useState([]);
    const [ramzanPackages, setRamzanPackages] = useState([]);
    useEffect(() => {
        if (umrahPackages) {
            let dulex_pack = umrahPackages.filter((pack) => pack.category == "dulex")
            let eco_pack = umrahPackages.filter((pack) => pack.category == "economy")
            let ramzan_pack = umrahPackages.filter((pack) => pack.category == "ramzan")
            console.log(umrahPackages)
            setDulexPackages(dulex_pack);
            setEcoPackages(eco_pack);
            setRamzanPackages(ramzan_pack)
        }
    }, [umrahPackages])
    //  ${titles.isEcoTop && "reverse"}
    if (ramzanPackages.length == 0 && ecoPackages.length == 0 && dulexPackages.length == 0) {
        return (
            <div style={{ fontSize: '20px', fontWeight: 600, textAlign: "center", marginTop: "40px", marginBottom: "100px", width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8", borderRadius: "5px" }}>No Umrah Packages Found</div>
        )
    }
    return (
        <div className={`body-wrapper column`}>
            {ecoPackages.length > 0 && <div>
                <h2 className="boldHeading center">{titles.ecoTitle}</h2>
                <div className="body-wrapper">
                    {
                        ecoPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>}



            {dulexPackages.length > 0 && <div style={{ width: "100%" }}>

                <h2 className="boldHeading center">{titles.dulexTitle}</h2>
                <div className="body-wrapper">
                    {
                        dulexPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>}

            {ramzanPackages.length > 0 && <div style={{ width: "100%" }}>

                <h2 className="boldHeading center">{titles.ramzanTitle}</h2>
                <div className="body-wrapper">
                    {
                        ramzanPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                        ))
                    }
                </div>
            </div>}


        </div>
    )
}

export default PackageDistributer;