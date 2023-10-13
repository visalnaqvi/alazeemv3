import PackageCard from "@/components/cards/packageCard/packageCard.js"
import background from "../../../public/backgroundImages/iraqZiyaratSunni.jpeg"
import ziyarat from "../../../data/sunniZiyarat"
import IconLongList from "@/components/lists/iconLongList.js";
import Image from "next/image";

const SunniPackages = ({iraqPackages , fetchData})=>{
    return(
        <>
        <div className="backgroundImgWrapper">
                <Image className="backgroundImg" width={"100%"} height={500} src={background} alt="iraq ziyarat packages" />
            </div>
            <div className="margin">
                <div className="body-wrapper">
                    {
                        iraqPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="iraq" subType="sunni" tour={pkg} key={i} />
                        ))
                    }
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