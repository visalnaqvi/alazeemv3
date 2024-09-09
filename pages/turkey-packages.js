import PackageCard from "@/components/cards/packageCard/packageCard.js"
import background from "../public/backgroundImages/turkey.png"
import background_mb from "../public/backgroundImages/turkey.png"
import ziyarat from "../data/shiaZiyarat.js"
import IconLongList from "@/components/lists/iconLongList.js";
import Image from "next/image";
import SingleImage from "@/components/carousel/singleImage";

import { useEffect, useState } from "react"
import { getTurkeyPackages } from "../services/getData.js"

import Toast from "@/components/notification/toast.js"
import { useRouter } from "next/router.js"

const ShiaZiyarat = ()=>{
    const [turkeyPackages, setTurkeyPackages] = useState([])
    const [toastMsg, setToastMsg] = useState({ msg: "" })
    const [isLoading , setIsLoading] = useState(true);
    const router = useRouter();

    const { type } = router.query;

    const isShia = type == "karbala-iraq-ziyarat";
    const title = type == "karbala-iraq-ziyarat"?"Karbala Ziyarat":"Iraq Ziyarat";
    useEffect(() => {
        fetchData();
    }, [isShia])
    const onClose = () => {
        setToastMsg({ msg: "" })
    }
    const fetchData = async () => {
        try { 
            setTurkeyPackages(await getTurkeyPackages()); 
        setIsLoading(false)
    }
        catch (err) {
            if (err) {
                setToastMsg({ status: "warning", msg: "Something went wrong cannot get package" })
            }
        }
    }
    return(
        <>
        
                <SingleImage url={[background , background_mb]} />
    
            <div className="margin">
                <div className="body-wrapper" style={{marginTop:"40px"}}>
                    {
                        turkeyPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="turkey" tour={pkg} key={i} />
                        ))
                    }
                </div>
                <br></br>
                <br></br>

                <p className="content">Turkey, officially known as the Republic of Turkey, is a transcontinental country located mainly on the Anatolian Peninsula in Western Asia, with a smaller portion on the Balkan Peninsula in Southeastern Europe. It is bordered by eight countries: Greece and Bulgaria to the northwest; Georgia to the northeast; Armenia, Azerbaijan, and Iran to the east; and Iraq and Syria to the south. The country also has coastlines along the Aegean Sea to the west, the Mediterranean Sea to the south, and the Black Sea to the north.</p>
                <br></br>
                <p className="content">Turkey is a major global tourist destination, attracting millions of visitors annually due to its unique blend of natural beauty, historical sites, cultural heritage, and diverse landscapes. That making it a prime spot for tourists from around the world.</p>
                <br></br>
                <h2 className="boldHeading">1.	Historical and Archaeological Sites:</h2>
                <p className="content">
                    <strong>Istanbul:</strong>As a former capital of the Byzantine and Ottoman Empires, Istanbul is rich in historical landmarks. Key sites include the Hagia Sophia, Blue Mosque, Topkapi Palace, and Basilica Cistern

                </p>
                <br></br>
                <p className="content"><strong>Ephesus:</strong>Located in western Turkey, Ephesus is one of the best-preserved ancient cities in the Mediterranean region, showcasing remarkable ruins such as the Library of Celsus, the Great Theatre, and the Temple of Artemis (one of the Seven Wonders of the Ancient World).</p>

                <br></br>
                <p className="content"><strong>Cappadocia:</strong>Known for its surreal landscapes, fairy chimneys, rock-hewn churches, and cave dwellings, Cappadocia is also famous for hot air balloon rides offering breathtaking views of the region.</p>
                <br></br>
                <p className="content"><strong>Pamukkale and Hierapolis:</strong>Pamukkale, also known as "Cotton Castle," is famous for its terraces of mineral-rich thermal waters. Nearby Hierapolis, an ancient Roman spa city, adds historical depth to this natural wonder.</p>
                <br></br>
                <h2 className="boldHeading">2.	Cultural and Culinary Attractions:</h2>
                <p className="content">Turkey boasts a rich and diverse cultural heritage that spans multiple civilizations. This diversity is reflected in its cuisine, which includes a variety of dishes such as kebabs, mezes, baklava, and Turkish tea and coffee. Local markets, like the Grand Bazaar in Istanbul, offer a vibrant shopping experience with goods ranging from spices to carpets and jewellery.</p>
                <br></br>
                <h2 className="boldHeading">3. Coastal Resorts and Beaches:</h2>
                <p className="content">
                    <strong>Turkish Riviera (Turquoise Coast):</strong>The southwestern coast, known as the Turkish Riviera or Turquoise Coast, is famous for its beautiful beaches, clear turquoise waters, and luxury resorts. Popular destinations include Antalya, Bodrum, Marmaris, and Fethiye. These areas offer a mix of historical sites, beaches, and vibrant nightlife.</p>
                <br></br>
                <p className="content"><strong>Bodrum and Marmaris:</strong>Known for their marinas, beaches, and nightlife, these towns are also rich in history, with ancient ruins and museums.</p>
                <br></br>
                <h2 className="boldHeading">4.	Natural Beauty and Outdoor Activities:</h2>
                <p className="content">
                    <strong>Mount Ararat:</strong>The highest peak in Turkey, Mount Ararat, is a popular destination for climbers and adventurers. It is also traditionally associated with the story of Noah's Ark.</p>
                <br></br>
                <p className="content"><strong>Lake Van and Nemrut Mountain:</strong>Lake Van, the largest lake in Turkey, and Nemrut Mountain, with its giant statues and royal tombs, are significant attractions in eastern Turkey.</p>
                <br></br>
                <p className="content"><strong>Outdoor Activities:</strong>Turkey offers diverse outdoor activities, including hiking, skiing (in regions like Uludağ and Palandöken), sailing along the coast, paragliding in Ölüdeniz, and white-water rafting in the rivers of the Black Sea region.</p>
                <h2 className="boldHeading">5.	Hot Springs and Thermal Resorts:</h2>
                <p className="content">
                Turkey has numerous hot springs and thermal resorts due to its geothermal activity, which is popular among tourists seeking health and wellness experiences. Pamukkale and Bursa are famous for their thermal baths.</p>
                <br></br>
               
            </div>
            </>
    )
}

export default ShiaZiyarat;