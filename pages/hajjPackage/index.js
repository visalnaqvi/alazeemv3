import { useEffect, useState } from "react"
import { getHajjPackages} from "../../services/getData.js"
import PackageCard from "@/components/cards/packageCard/packageCard.js"
import CarouselComp from "@/components/carousel/carousel.js"
import IconList from "@/components/lists/iconList.js"
import ContactBox from "@/components/contactBox/contactBox/contactBox.js"
import Toast from "@/components/notification/toast.js"
import Image from "next/image";
import tick from "../../public/icons/check.png"
import { useWindowSize } from "@uidotdev/usehooks";
import style from "../../styles/Article.module.css";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import styl from "../../styles/Umrah.module.css";
import PackageDistributer from "@/components/packageDistributer/packageDistributer.js"
import Head from "next/head.js"


const HajjUmrah = ()=>{

    const [packages , setPackages] = useState([])
    const [toastMsg , setToastMsg] = useState({msg:""})
    useEffect(()=>{
       fetchData();
    },[])

    const fetchData = async ()=>{
        try{
        setPackages(await getHajjPackages());
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
            <title>Hajj Tour Packages 2024</title>
            </Head>
            {toastMsg.msg && <Toast message={toastMsg.msg} type={toastMsg.status} onClose={onClose} />}
            {
        size.width > 700 ?
            <CarouselComp width={900} height={500} images={desktopImages}  />:
            <CarouselComp width={900} height={350} images={mobileImages} />}
            <div className="margin">
              
            <div>
            <h2 className="boldHeading center">Hajj Packages</h2>
            {packages.length > 0 ? <div className="body-wrapper">
            {
                packages.map((pkg,i)=>(
                    <PackageCard fetchData={fetchData} type="hajj" tour={pkg} key={i} />
                ))
            }
            </div>:<p className="subHeading">Loading Packages...</p>}

            </div>
           
            
            <br></br>
            {/* <ContactBox></ContactBox> */}
            {/* <h2 className="subHeading">Umrah Visa</h2> */}
            {/* <p className="content" >90 Days Umrah Visa or subject to change in days as per the Saudi Arabia Govt guidelines. Requirement of E visa Given Below</p> */}
            {/* <IconList items={[
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
            ]} /> */}
            {/* <h2 className="subHeading">TAWAF - CIRCUMAMBULATION OF THE HOLY KAABA IN WORSHIP
</h2> */}
{/* <p className="content">
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
<p className="content">All the prohibitions imposed on the conduct of pilgrims by Irham are lifted, upon completion of this last obligatory ritual. They can then remove Ihram sheets and change into their regular clothes.</p> */}
</div>
{/* <div className={styl.hajCardWrap} id="haj1"> 
      <div className={styl.hajCard}>
        <div className={styl.left}>
        <h1>HAJ 2024 - Tentative Haj 2024 Pkg</h1>
        <p className={styl.tag}>SHORT PERIOD PACKAGE <strong>17/18 Days</strong></p>

        <div className={styl.infoWrap}>
            <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>Departure</p>
                  <div className={styl.underline}></div>
                  <p className={styl.infoText}>INSHALLAH on 10th JUNE DEL to JED (By Saudi Airlines or any other Airlines) </p>
            </div>
            <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>Arrival</p>
                  <div className={styl.underline}></div>
                  <p className={styl.infoText}>27 June 24 or 28 June 24</p>
            </div>
            <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>Stay</p>
                  <div className={styl.underline}></div>
                  <p className={styl.infoText}>10th JUNE TO 27 June</p>
            </div>
        </div>

      
          <div className={styl.innerWrapLeft}>
          <h2>INCLUSIONS</h2>
          <ul className={styl.nul}>
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image width={20} height={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>Round trip Air fare (DEL/JED/MED-JED/DEL).</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>Surface transport (Jeddah / Makkah / Meena / Arafat / Muzdalfa / Madina / Jeddah) by AC
bus</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>ACCOMADATION ON SHARING BASIS 4 TO 5 PERSON ACCORDING TO HOTEL ARRANGEMENT</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>HAJ VISA WITH INSURANCE</p>
                    </li>   
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>FULL BOARD INDIAN BUFFET MEALS (BREAKFAST, LUNCH & DINNER)</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>Laundry facilities (after Haj in Makkah and Madina) </p>
                    </li>    
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>LOCAL MAKKAH & MADINA ZIYARAT</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>5 LITER ZAM ZAM</p>
                    </li>            
                </ul>

                <h2>PKG EXCULDE</h2>
          <ul className={styl.nul}>
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>QURBANI EXPENSES</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>EXTRA BAGGAGE ALLOWANCE (2 PIECES OF 23KG EACH+7 Kg + Zam Zam)</p>
                    </li>   
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>TAWAF AL-ZIYARAH WILL BE DONE ON OWN EXPENSES</p>
                    </li>   
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>ANYTHING NOT MENTIONED ABOVE.</p>
                    </li>                   
                </ul>
                <h2>DOCUMENTS REQUIRED</h2>
          <ul className={styl.nul}>
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>PASSPORT MINIMUM VALIDILTY ONE YEAR VALIDITY</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>BOTH DOSES VACCINATION CERTIFICATE</p>
                    </li>    
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>4 PASSPORT SIZE PHOTOGRAPH WITH WHITE BACKGORUND</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>PAN CARD</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>ADHAR CARD</p>
                    </li>  
                    <li key={Math.random()}>
                        <div className={styl.img}>
                        <Image height={20} width={20} src={tick} alt="tick icon"></Image>
                        </div>
                        <p>AGE BELOW 12 YEARS NOT ALLOWED</p>
                    </li>          
                </ul>
          </div>
    
       
        
        </div>
        <div className={styl.right}>
        <h2>Tour Itinerary (Tentative)</h2>
              <VerticalTimeline lineColor={ "#00C981" } layout={ '1-column-left' }>
      <VerticalTimelineElement
        className={styl.verticalTimelineElement}
        position="right"
        style={{overflow:"hidden",height:"70px",margin:"0",marginBottom:"30px"}}
        contentArrowStyle={{borderRightColor:"#00C981"}}
        contentStyle={ {borderRadius:"4px",background:"#f8f8f8",padding:"0px"} }
        iconStyle={{ background: '#00C981', color: '#fff',height:"10px",width:"10px",marginLeft:"15px" }}
      >
        <div className={styl.timelineCard}>
          <div className={styl.timelineCardTop}>
            <p style={{fontSize:"20px",margin:"0"}}>10 June 2024 </p>
          </div>
          <div className={styl.timelineCardBottom}>
            <p style={{fontSize:"16px",margin:"0"}}>Departure from Delhi</p>
          </div>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        style={{overflow:"hidden",height:"100px",margin:"0",marginBottom:"30px"}}
        className={styl.verticalTimelineElement}
        position="right"
        contentArrowStyle={{borderRightColor:"#00C981"}}
        contentStyle={ {paddingLeft:"0px",borderRadius:"4px",background:"#f8f8f8",padding:"0px",lineHeight:"0px"} }
        iconStyle={{ background: '#00C981', color: '#fff',height:"10px",width:"10px",marginLeft:"15px" }}
      >
        <div className={styl.timelineCard}>
          <div className={styl.timelineCardTop}>
            <p style={{fontSize:"20px",margin:"0"}}>10 June 24 to 14 June 24</p>
          </div>
          <div className={styl.timelineCardBottom}>
            <p style={{fontSize:"16px",margin:"0"}}>Before Haj stay in Mecca (Aziziya/ Jabal-e-Noor Nuza) Approx 6
KM away from haram shareef.
    </p>
          </div>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className={styl.verticalTimelineElement}
        style={{overflow:"hidden",height:"70px",margin:"0",marginBottom:"30px"}}
        position="right"
        contentArrowStyle={{borderRightColor:"#00C981"}}
        contentStyle={ {paddingLeft:"0px",borderRadius:"4px",background:"#f8f8f8",padding:"0px",lineHeight:"0px"} }
        iconStyle={{ background: '#00C981', color: '#fff',height:"10px",width:"10px",marginLeft:"15px" }}
      >
        <div className={styl.timelineCard}>
          <div className={styl.timelineCardTop}>
            <p style={{fontSize:"20px",margin:"0"}}>14 June 24 to 18 June 24</p>
          </div>
          <div className={styl.timelineCardBottom}>
            <p style={{fontSize:"16px",margin:"0"}}>Stay in Mina, Arafaat, Muzdalfa.</p>
          </div>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className={styl.verticalTimelineElement}
        position="right"
        style={{overflow:"hidden",height:"70px",margin:"0",marginBottom:"30px"}}
        contentArrowStyle={{borderRightColor:"#00C981"}}
        contentStyle={ {paddingLeft:"0px",borderRadius:"4px",background:"#f8f8f8",padding:"0px",lineHeight:"0px"} }
        iconStyle={{ background: '#00C981', color: '#fff',height:"10px",width:"10px",marginLeft:"15px" }}
      >
        <div className={styl.timelineCard}>
          <div className={styl.timelineCardTop}>
            <p style={{fontSize:"20px",margin:"0"}}>19 June 24 to 22 June 24</p>
          </div>
          <div className={styl.timelineCardBottom}>
            <p style={{fontSize:"16px",margin:"0"}}>After Haj stay in Mecca (Aziziya/ Jabal-e-Noor Nuza) Approx 6 KM
away from haram shareef.</p>
          </div>
        </div>
        </VerticalTimelineElement>
      <VerticalTimelineElement
        className={styl.verticalTimelineElement}
        position="right"
        style={{overflow:"hidden",height:"70px",margin:"0",marginBottom:"30px"}}
        contentArrowStyle={{borderRightColor:"#00C981"}}
        contentStyle={ {paddingLeft:"0px",borderRadius:"4px",background:"#f8f8f8",padding:"0px",lineHeight:"0px"} }
        iconStyle={{ background: '#00C981', color: '#fff',height:"10px",width:"10px",marginLeft:"15px" }}
      >
        <div className={styl.timelineCard}>
          <div className={styl.timelineCardTop}>
            <p style={{fontSize:"20px",margin:"0"}}>23 June 24 to 27 June 24</p>
          </div>
          <div className={styl.timelineCardBottom}>
            <p style={{fontSize:"16px",margin:"0"}}>Stay in Madina Al Munnawwara</p>
          </div>
        </div>
        </VerticalTimelineElement>
      <VerticalTimelineElement
        className={styl.verticalTimelineElement}
        position="right"
        style={{overflow:"hidden",height:"70px",margin:"0",marginBottom:"30px"}}
        contentArrowStyle={{borderRightColor:"#00C981"}}
        contentStyle={ {paddingLeft:"0px",borderRadius:"4px",background:"#f8f8f8",padding:"0px",lineHeight:"0px"} }
        iconStyle={{ background: '#00C981', color: '#fff',height:"10px",width:"10px",marginLeft:"15px" }}
      >
        <div className={styl.timelineCard}>
          <div className={styl.timelineCardTop}>
            <p style={{fontSize:"20px",margin:"0"}}>27 June 24 or 28 June 24</p>
          </div>
          <div className={styl.timelineCardBottom}>
            <p style={{fontSize:"16px",margin:"0"}}>Departure from Madina/Jeddah to Delhi</p>
          </div>
        </div>
      </VerticalTimelineElement>
      
              </VerticalTimeline>

              <div className={styl.pricing}>
              <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>ROOM CAPACITY</p>
                  <p className={styl.infoText}>PKG COST (GST not Included)</p>
            </div>
            <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>4/5 Bed SHARING</p>
                  <p className={styl.infoText}>₹ 7,10,000 Per Person</p>
            </div>
            <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>3 BED SHARING</p>
                  <p className={styl.infoText}>₹ 7,85,000 Per Person</p>
            </div>
            <div className={styl.infoWrapCard}>
                  <p className={styl.infoHead}>2 BED SHARING</p>
                  <p className={styl.infoText}>₹ 8,60,000 Per Person</p>
            </div>
            <p className={styl.hajjnewpkgSubHeadingWarn}>(G.S.T. 5% And 5% TCS Extra and any Other Tax by Saudi Govt. Is applicable.)</p>
              </div>
        </div>
        
        <div className={styl.contact}>
         
            <p className={style.ctag}>CALL US NOW FOR MORE INFORMATION</p>
            <p className={styl.chead}>9205184001, 9811042458</p>
         
        </div>
     
      </div>
    
        
      </div> */}
<br></br>
       </div>
    )
}

export default HajjUmrah