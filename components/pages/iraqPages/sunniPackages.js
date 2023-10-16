import PackageCard from "@/components/cards/packageCard/packageCard.js"
import background from "../../../public/backgroundImages/iraqZiyaratSunni.jpeg"
import ziyarat from "../../../data/sunniZiyarat"
import IconLongList from "@/components/lists/iconLongList.js";
import SingleImage from "@/components/carousel/singleImage";

const SunniPackages = ({iraqPackages , fetchData})=>{
    return(
        <>
        <SingleImage url={[background , background]} />
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