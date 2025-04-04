import style from "../styles/Article.module.css";
import styl from "../styles/Umrah.module.css";
import Image from "next/image";
import tick from "../public/icons/check.png"
import Head from "next/dist/shared/lib/head";
import Script from 'next/script'
import "firebase/firestore"
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const HajjPackage = () => {




  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Umrah package,
          Best umrah package,
          Cheapest umrah package,
          Umrah package from Delhi,
          December umrah packages,
          Jan umrah packages,
          Feb umrah packages,
          Ramzan umrah package,
          Cheapest Ramzan umrah package,
          Best Ramzan umrah package,
          Ramzan umrah package from Delhi,
          March umrah package,
          April umrah package,
          May umrah package,
          June umrah package,
          July umrah package,
          August umrah package,
          Sept umrah packages,
          Oct umrah package,
          Nov umrah package,
          Dec umrah packages,
          Cheapest Air fare to Jeddah,
          Umrah visa,
          Cheapest umrah visa,
          Best umrah operator,
          Haj package,
          best umrah packages from sri nagar,
best umrah packages from Lucknow,
umrah packages from Sri Nagar,
umrah packages from Lucknow,
Haj packages 2023,
          "
        />
        <meta
          name="description"
          content="Best Tour and Travels Agency in Delhi Laxmi Nagar.Hajj Umrah Tour Package available. Hajj Umrah economic tour packages. Including Hotel Booking , Travel Planning etc.Umrah Package by Al Azeem Tours and Travel"
        />

        <title>
          Best Hajj 2023 Packages by AA Travels (Al-Azeem)
        </title>
        <link rel="icon" href="%PUBLIC_URL%/logo192.png" />

        <link rel="icon" href="/logo512.png" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      </Head>

      <div className={styl.displayBox}>
      </div>


      {/* <div className={styl.quicLinks}>
        <p>Quick Link:<a href="#haj1">HAJ 2023 (16 – 20 Days PACKAGE)</a>
        <a href="#haj2">HAJ 2023 (35 – 40 Days PACKAGE)</a>
        <a href="#umrah">Umrah Packages</a></p>
      </div> */}


      <div className={styl.hajCardWrap} id="haj1">
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
            <VerticalTimeline lineColor={"#00C981"} layout={'1-column-left'}>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ borderRadius: "4px", background: "#f8f8f8", padding: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>10 June 2024 </p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Departure from Delhi</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                style={{ overflow: "hidden", height: "100px", margin: "0", marginBottom: "30px" }}
                className={styl.verticalTimelineElement}
                position="right"
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>10 June 24 to 14 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Before Haj stay in Mecca (Aziziya/ Jabal-e-Noor Nuza) Approx 6
                      KM away from haram shareef.
                    </p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                position="right"
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>14 June 24 to 18 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Stay in Mina, Arafaat, Muzdalfa.</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>19 June 24 to 22 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>After Haj stay in Mecca (Aziziya/ Jabal-e-Noor Nuza) Approx 6 KM
                      away from haram shareef.</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>23 June 24 to 27 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Stay in Madina Al Munnawwara</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>27 June 24 or 28 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Departure from Madina/Jeddah to Delhi</p>
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
            <p className={styl.chead}>9205184001, 9717040012</p>

          </div>

        </div>


      </div>




      <div className={styl.hajCardWrap} id="haj2">
        <div className={styl.hajCard}>
          <div className={styl.left}>
            <h1>HAJ 2024 - Tentative Haj 2024 Pkg</h1>
            <p className={styl.tag}>SHIFTING PACKAGE <strong>37 DAYS</strong></p>

            <div className={styl.infoWrap}>
              <div className={styl.infoWrapCard}>
                <p className={styl.infoHead}>Departure</p>
                <div className={styl.underline}></div>
                <p className={styl.infoText}>INSHALLAH 10 June 2024 (By Saudi Airlines or any other Airlines)</p>
              </div>
              <div className={styl.infoWrapCard}>
                <p className={styl.infoHead}>Arrival</p>
                <div className={styl.underline}></div>
                <p className={styl.infoText}>17 July 2024 or 18 July 2024</p>
              </div>
              <div className={styl.infoWrapCard}>
                <p className={styl.infoHead}>Stay</p>
                <div className={styl.underline}></div>
                <p className={styl.infoText}>10 June 2024 TO 17 July 2024</p>
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
            <VerticalTimeline lineColor={"#00C981"} layout={'1-column-left'}>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ borderRadius: "4px", background: "#f8f8f8", padding: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>10 June 2024</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Departure from Delhi</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                style={{ overflow: "hidden", height: "100px", margin: "0", marginBottom: "30px" }}
                className={styl.verticalTimelineElement}
                position="right"
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>10 June 24 to 14 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Before Haj stay in Mecca (Aziziya/ Jabal-e-Noor Nuza) Approx 6 KM away
                      from haram shareef.
                    </p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                position="right"
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>14 June 24 to 18 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Stay in Mina, Arafaat, Muzdalfa</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>19 June 24 to 22 June 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>After Haj stay in Mecca (Aziziya/ Jabal-e-Noor Nuza) Approx 6 KM away from
                      haram shareef</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                style={{ overflow: "hidden", height: "70px", margin: "0", marginBottom: "30px" }}
                position="right"
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>23 June 2024 to 7 July 2024</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Stay in Makkah in Star Hotel 400 mtrs -500 mtrs Near to Haram Sharif</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "100px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>7 July 24 to 16 July 24</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Stay in Madina Al Munnawwara *category hotel. (Distance 150 to 200 mtr away
                      from Haram)</p>
                  </div>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className={styl.verticalTimelineElement}
                position="right"
                style={{ overflow: "hidden", height: "100px", margin: "0", marginBottom: "30px" }}
                contentArrowStyle={{ borderRightColor: "#00C981" }}
                contentStyle={{ paddingLeft: "0px", borderRadius: "4px", background: "#f8f8f8", padding: "0px", lineHeight: "0px" }}
                iconStyle={{ background: '#00C981', color: '#fff', height: "10px", width: "10px", marginLeft: "15px" }}
              >
                <div className={styl.timelineCard}>
                  <div className={styl.timelineCardTop}>
                    <p style={{ fontSize: "20px", margin: "0" }}>17 July 2024 or 18 July 2024</p>
                  </div>
                  <div className={styl.timelineCardBottom}>
                    <p style={{ fontSize: "16px", margin: "0" }}>Departure from Madina/Jeddah to Delhi</p>
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
            <p className={styl.chead}>9205184001, 9717040012</p>

          </div>

        </div>


      </div>


    </>
  );
};

export default HajjPackage;
