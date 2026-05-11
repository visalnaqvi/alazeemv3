import PackageCard from "@/components/cards/packageCard/packageCard.js"
import background from "../../../public/backgroundImages/iraqZiyaratSunni.jpeg"
import ziyarat from "../../../data/sunniZiyarat"
import IconLongList from "@/components/lists/iconLongList.js";
import SingleImage from "@/components/carousel/singleImage";
import { useEffect, useState } from "react"
const SunniPackages = ({iraqPackages , fetchData, sections})=>{
    const [pkgStruct , setPkgStruct] = useState([])
        useEffect(() => {
            if (iraqPackages) {
                let pkgs = []
                sections.forEach(section => {
                    let pkg = iraqPackages.filter((pack)=>pack.sectionId.includes(section.id))
                    pkgs.push({sectionTitle:section.title , data:pkg})
                });     
    
                setPkgStruct(pkgs)
            }
        }, [iraqPackages])
    return(
        <>
        <SingleImage url={[background , background]} />
            <div className="margin">
                <div className="body-wrapper">
                    {
                        pkgStruct.map((pkg,index)=>(
                            <div key={index} className="full-width">
                                {pkg.data.length > 0 && 
                                <div className="full-width">
                                    <h2 className="boldHeading center">{pkg.sectionTitle}</h2>  

                                    <div className="body-wrapper">
                                        {
                                            pkg.data.map((pkg, i) => (
                                                <PackageCard fetchData={fetchData}  type="iraq" subType="sunni" tour={pkg} key={i} />
                                            ))
                                        }
                                    </div>
                                </div>}
                            </div>
                        ))
                    }
                    {/* {
                        iraqPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="iraq" subType="sunni" tour={pkg} key={i} />
                        ))
                    } */}
                </div>
                <br></br>
                <br></br>

                <div className="body-wrapper items-start justify-around">
                    <div style={{width:"48%"}}>
                        <div className="greenBox">
                        <p className="boldHeading center small">Ziyarat</p>
                        </div>
                        <IconLongList items={ziyarat[0]} />
                    </div>
                    <div style={{width:"48%"}}>
                    <div className="greenBox">
                    <p className="boldHeading center small">Ziyarat</p>
                    </div>
                        <IconLongList items={ziyarat[1]} />
                    </div>
                </div>
            </div>
            </>
    )
}

export default SunniPackages;