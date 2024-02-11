import { useEffect, useState } from "react"
import { getUmrahPackages , getIraqPackages, getPageTitle } from "../../services/getData.js"
import PackageCard from "@/components/cards/packageCard/packageCard.js"
import CarouselComp from "@/components/carousel/carousel.js"
import IconList from "@/components/lists/iconList.js"
import ContactBox from "@/components/contactBox/contactBox/contactBox.js"
import Toast from "@/components/notification/toast.js"
import { useWindowSize } from "@uidotdev/usehooks";
import PackageDistributer from "@/components/packageDistributer/packageDistributer.js"
import Head from "next/head.js"


const HajjUmrah = ()=>{

    const [umrahPackages , setUmrahPackages] = useState([])
    const [iraqPackages , setIraqPackages] = useState([])
    const [pageTitle , setPageTitle] = useState({})
    const [toastMsg , setToastMsg] = useState({msg:""})
    useEffect(()=>{
       fetchData();
    },[])

    const fetchData = async ()=>{
        try{
        setUmrahPackages(await getUmrahPackages());
        setIraqPackages(await getIraqPackages("sunni"));
        setPageTitle(await getPageTitle("hajjUmrah"))
    }
        catch (err){
            if(err){
                setToastMsg({status:"warning" , msg:"Something went wrong cannot get package"})
            }
        }
    }

    const desktopImages = [
        "/sliders/hajjUmrahSlider/1.webp",
        "/sliders/hajjUmrahSlider/2.webp",
        "/sliders/hajjUmrahSlider/3.webp",
    
    ]


    const mobileImages = [
        "/sliders/hajjUmrahSlider/1_mb.png",
        "/sliders/hajjUmrahSlider/2_mb.png",
        "/sliders/hajjUmrahSlider/3_mb.png",
    
    ]
        const onClose = ()=>{
            setToastMsg({msg:""})
        }
        const size = useWindowSize();
    return (
        <div>
            <Head>
            <title>Uram and Hajj Tour Packages</title>
            </Head>
            {toastMsg.msg && <Toast message={toastMsg.msg} type={toastMsg.status} onClose={onClose} />}
            {
        size.width > 700 ?
            <CarouselComp width={900} height={500} images={desktopImages}  />:
            <CarouselComp width={900} height={350} images={mobileImages} />}
            <div className="margin">
              
            {pageTitle && pageTitle.showCategory ? <div>
            {umrahPackages.length > 0 ? 
            <PackageDistributer titles={pageTitle} fetchData={fetchData} umrahPackages={umrahPackages}/>:<p className="subHeading">Loading Packages...</p>}
            </div>
            :
            <div>
            <h2 className="boldHeading center">Umrah Packages</h2>
            {umrahPackages.length > 0 ? <div className="body-wrapper">
            {
                umrahPackages.map((pkg,i)=>(
                    <PackageCard fetchData={fetchData} type="hajjUmrah" tour={pkg} key={i} />
                ))
            }
            </div>:<p className="subHeading">Loading Packages...</p>}

            </div>}
           
            <h2 className="boldHeading center">Iraq Ziyarat Packages</h2>
            {iraqPackages.length> 0 ? <div className="body-wrapper">
            {
                iraqPackages.map((pkg,i)=>(
                    <PackageCard type="iraq" subType="sunni" tour={pkg} key={i} />
                ))
            }
            </div>: <p className="subHeading">Loading Packages...</p>}
            <br></br>
            <ContactBox></ContactBox>
            <h2 className="subHeading">Umrah Visa</h2>
            <p className="content" >90 Days Umrah Visa or subject to change in days as per the Saudi Arabia Govt guidelines. Requirement of E visa Given Below</p>
            <IconList items={[
                "Passport minimum 6 Months validity",
                "2 Passport size photo white background without Specks",
                "Vaccination Certificate (both Doses)",
                "Aadhar card"
            ]} bold={true} big={true} margin={true}/>
            <h2 className="subHeading">WHAT IS UMRAH?</h2>
            <p className="content" >Umrah is a super spiritual journey for every single Muslim to acknowledge Allah (Subhanahu Wa Ta&apos;ala - Glory to him, the exalted) as the indicator of peace and to commune with him to purge the impurities within. All pilgrim who proceeds on this holy journey, goes along the path to purifying their soul, heart mind and body from the sins committed in the past to be distinguished from others on Resurrection day. Essentially, the meaning of Umrah is to &apos;a visit&apos; to the Holy Kaaba (the Sacred House of God) in Arabic and can be performed by all muslims, anytime in a yearr; unlike Hajj, which is an obligatory pilgrimage to Makkah, performed in every year within the first 10 days of the Islamic month of Dhul Hijjah.</p>
            <h2 className="subHeading">UMRAH RITUALS - HOW TO PERFORM UMRAH</h2>
            <p className="content" >The acts of faith performed by all pilgrims during their spiritual journey to the Holy Kaaba are collectively known as the Umrah rituals.Following are the four acts of Umrah Al Mufradah that involve fulfilling some religious duties and rituals, each anchoring the pilgrim in the right moment towards complete atonement.</p>
            <h2 className="subHeading">IHRAM FROM MIQAT - THE INTENTION TO PERFORM UMRAH</h2>
            <p className="content" >Before pilgrims wish to enter the Al Masjid Al Haram (the sacred boundary of Makkah) and move across to perform Umrah, they should wear Ihram in order to make haram and traverse the five different areas of Miqats in the Haram boundary:</p>
            <IconList bold={true} big={true} margin={true} items={[
                "Dhu'l Hulaifah (Abbyar Ali) is for pilgrims coming from or through Madina",
                "Al-Juhfah (near Rabigh) is for pilgrims coming from or through Syria, Morocco, or Egypt.",
                "Qarn-al manazil (As-Sail Al-Kabeer) is for pilgrims coming from or through Najd or Taif.",
                "Yalamlam (Sa'adiyah) is for pilgrims coming from or through India, Pakistan or Yemen.",
                "Dhat `Irq is for pilgrims coming from or through Iraq."
            ]} />
            <h2 className="subHeading">TAWAF - CIRCUMAMBULATION OF THE HOLY KAABA IN WORSHIP
</h2>
<p className="content">
After assuming a state of Ihram, the Muhrim performs the obligatory act of Tawaf in the Al Masjid Al Haram. The Muhrim must stop reciting the Talbiyah and start circumambulation the holy Kaaba seven times (as a reminder of the angels that circumambulate the celestial realms of Allah&apos;s house, al-Bayt al-Ma&apos;mur),
</p>


<p className="content">They must circumambulate the Masjid Al Haram by starting from the Black Stone and completing it there at with the sincere intention of seeking closeness to Allah. The worship is validated only if the pilgrim recites the prescribed du&apos;aa (supplication) during each one of the seven circumambulations.</p>

<p className="content">
The last circumambulation ends exactly where the first one began, to ensure that the pilgrim completed all seven rounds without moving or falling behind a single step or more. And with the seventh round of circumambulation and performance of eight Istilam, the state of Tawaf concludes.
</p>

<p className="content">
Upon completion of Tawaf, pilgrims can go behind Maqam Ibrahim (the station of Ibrahim) and perform Salat of Tawaf to offer the two short rak&apos;aa&apos;s and thereafter drink the holy Zamzam water from Well of Zamzam in the basement of the Sacred Mosque while supplicating to Allah.
</p>
<h2 className="subHeading">SA&apos;IY - WALKING SEVEN TIMES BETWEEN THE HILLS OF SAFA AND MARWAH IN WORSHIP</h2>
<p className="content">Umrah pilgrims intending to make Sa&apos;iy must make their way out of the Al Masjid Al Haram towards the Masaa&apos; (the place of Sa&apos;iy) which commemorates the struggle Prophet Abraham&apos;s wife Hazarat Hajra went through to search for water for her son in between the hills of Safa in the south and Marwah in the North. In essence, Sa&apos;iy is a great way to spend some time on self-reflection and self-realisation. Pilgrims start Sa&apos;iy by going up the hill of Safa to see the holy Kaaba from the Safa door.</p>

<p className="content">The procedure continues with pilgrims going from Safa to Marwah and returning back to Safa, until the they complete seven laps in total. Each round is nearly 450m long. The seventh round will end at Marwah.</p>

<h2 className="subHeading">HALQ (SHAVING THE HEAD) OR TAQSIR (CLIPPING OR SHORTENING OF THE HAIR FOR MEN AND WOMEN)</h2>
<p className="content">Finally, the last step of your journey, shaving or clipping the hair in Mina. Men should get their head completely shaved, or get their hair clipped. While women are forbidden to shave their heads and only allowed to have a lock or strand of their hair clipped. The act of cutting the hair symbolizes one&apos;s detachment from physical appearances and complete subjection to Allah.</p>
<p className="content">All the prohibitions imposed on the conduct of pilgrims by Irham are lifted, upon completion of this last obligatory ritual. They can then remove Ihram sheets and change into their regular clothes.</p>
</div>
<br></br>
       </div>
    )
}

export default HajjUmrah