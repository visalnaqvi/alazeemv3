import Image from "next/image";
import background from "../../public/backgroundImages/HolidayPackages.jpeg"
import { useEffect, useState } from "react";
import { getHolidayPackages } from "@/services/getData";
import ImageCardFormal from "@/components/cards/imageCardFormal/imageCardFormal";
import ContactBox from "@/components/contactBox/contactBox/contactBox";
const HolidayPackages = ()=>{

    const [srinagarPackages, setSrinagarPackages] = useState([]);
    const [keralaPackages, setKeralaPackages] = useState([]);
    const [manaliPackages, setManaliPackages] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
        setSrinagarPackages(await getHolidayPackages("SRINAGAR"));
        setKeralaPackages(await getHolidayPackages("KERALA"));
        setManaliPackages(await getHolidayPackages("HIMACHAL"));
    }

    return(
        <div>
            <div className="backgroundImgWrapper" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Image className="backgroundImg" width={"100%"} height={500} src={background} alt="iraq ziyarat packages" />
            </div>
            <div className="margin">
                <br></br>
                <br></br>
                <p className="content">
                AA Tour & Travels duly recognized travel organization in Indian tourism industry. We are a professionally managed closely held agency and management control is vested with the firstgeneration promoter entrepreneurs. Transaction level operations are executed by a team of professionally qualified professionals, who are well versed with the complexities of travel & tourism trade. The team is well aware and equipped to cater to requirements of various market segments and understands the nuances of tourism in India and abroad. AA TOUR & TRAVELS to offer and organize all travel related services under one umbrella.</p>
                <br></br>
                <p className="content">
                We are recognized by IATA. we have team of expert to give the best as per the need of valuable clients in inbound packages like Kashmir Packages, Kerala Packages, Himachal Packages, Goa packages, East Indian Tourist Spots as well as outbound Thailand (Bangkok), Singapore, Malaysia, Maldives Europe, Dubai and other Destinations. Some of tourist highlight spots given below.
                </p>

                <h2 className="subHeading">EXPLORE SRINAGAR</h2>
                <div className="body-wrapper justify-start">
                {
                    srinagarPackages.map((pkg,i)=>(
                        <ImageCardFormal tour={pkg} key={i} />
                    ))
                }
                </div>

                <h2 className="subHeading">EXPLORE KERALA</h2>
                <div className="body-wrapper justify-start">
                {
                    keralaPackages.map((pkg,i)=>(
                        <ImageCardFormal tour={pkg} key={i} />
                    ))
                }
                </div>

                <h2 className="subHeading">EXPLORE MANALAI (HIMACHAL)</h2>
                <div className="body-wrapper justify-start">
                {
                    manaliPackages.map((pkg,i)=>(
                        <ImageCardFormal tour={pkg} key={i} />
                    ))
                }
                </div>
            </div>
            <br></br>

        </div>
    )
}

export default HolidayPackages;