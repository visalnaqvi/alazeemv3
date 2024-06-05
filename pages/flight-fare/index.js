import { getFlightFare } from "@/services/getData";
import { useEffect, useState } from "react";
import styles from "./flight.module.css";
import Head from "next/head.js"

const FlightFare = ()=>{
   const [data , setData] = useState([])
   useEffect(()=>{
        fetchData();
   },[])

   const fetchData = async () =>{
    let details  = await getFlightFare();
    details.forEach(flight=>{
        let data = []
        for(let i =0 ; i<flight.number ; i++){
            data.push(flight[`${i}`])
        }
        flight.data = data;
    })
    setData(details)
   }

   useEffect(()=>{
    console.log("dataaaa" , data);
   },[data])
    return (
        <>
         <Head>
                <title>Flight Fares - Al Azeem Tours and Travel</title>
                <meta name="keywords" content="dubai fare,
dubai ticket price,
fly dubai flights,
dubai flight tickets,
dubai flight ticket price,
dubai plane tickets,
dubai air ticket price,
dubai air ticket,
dubai ticket price from delhi,
dubai plane ticket price,
dubai ticket from delhi,
delhi to dubai flight fare,
dubai flight price,
air fare to dubai,
dubai airlines ticket price,
dubai tickets from mumbai,
dubai flight booking,
flights from dubai to mangalore,
dubai ticket flight,
dubai to thiruvananthapuram flight,
air ticket delhi to dubai,
cost of flights to dubai,
flight ticket for dubai,
flights from pune to dubai,
fly tickets to dubai,
india to dubai ticket,
dubai air fare,
dubai calicut flight,
fares to dubai,
air ticket for dubai,
cheapest airline to dubai,
plane tickets for dubai,
price of flights to dubai,
ticket rate calicut to dubai,
ticket dubai price,
chennai to dubai flight fare,
air fare mumbai to dubai,
ticket fare from kochi to dubai,
ticket flight dubai,
low cost flights to dubai,
air fare delhi to dubai,
ticket price to dubai from india,
bargain flights to dubai,
delhi to dubai fare,
airline tickets for dubai,
plane fare to dubai,
flights to dubai united arab emirates,
bangalore to dubai flight fare,
mumbai to dubai flight charges,
air ticket from india to dubai,
cochin to dubai flight fare,
air ticket price india to dubai,
price of air ticket to dubai,
air fare dubai to mumbai,
ticket fare from mumbai to dubai,
dubai uae flights,
air fare ahmedabad to dubai,
air fare for dubai,
air fare from amritsar to dubai,
air fare from chennai to dubai,
air fare from hyderabad to dubai,
air fare from kochi to dubai,
air fare from pune to dubai,
air fare from trivandrum to dubai,
air fare of dubai,
air ticket fare delhi to dubai,
air ticket fare from delhi to dubai,
air ticket fare from mumbai to dubai,
air ticket price of dubai,
air ticket rate from trivandrum to dubai,
airline ticket price to dubai,
chennai to dubai flight ticket fare,
cochin to dubai ticket fare,
cost of air ticket to dubai,
cost of dubai flight ticket,
cost of flight ticket to dubai,
dubai air ticket cost,
dubai dubai flight,
dubai flight ticket cost,
dubai tickets cost,
dubai tickets from india price,
flight booking in dubai,
flight prices dubai,
flight ticket price for dubai,
flights dubai cheap,
flights dubai uae,
flights to dubai emirate,
india to dubai flight ticket dare,
delhi to Riyadh ticket ,
Delhi to Riyadh fare,
Riyadh Ticket,
Riyadh Ticket price,
Delhi to Jeddah Ticket Price,
Jeddah Ticket Price,
Delhi to Sharajh Ticket Price,
Sharjah Ticket Price,
Sharjah Air fare,
Delhi to Sharaj Air Fare,
"></meta>
            </Head>
        <div className={`margin ${styles.wrapper}`}>
            {
               data.length>0 && data.map((row,i)=>(
                    <table className={styles.table} key={i}>
                        <tr className={styles.titleRow}>
                            <td className={styles.td} colSpan={row.data[0].length}>
                                {row.title}
                            </td>
                        </tr>
                        {
                            row.data.map((item , i)=>(
                                <tr className={`${styles.row} ${i==0 && styles.header}`} key={i}>
                                    {
                                        item.map((c,i)=>(
                                            <td className={styles.td} key={i}>{c}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </table>
               ))
            }
                        <p className="content" >Dubai, a city synonymous with ambition and innovation, rises like a mirage from the Arabian desert, boasting a skyline adorned with architectural marvels. This global metropolis, nestled in the United Arab Emirates, seamlessly blends tradition with modernity, offering a captivating glimpse into the future while cherishing its rich heritage.</p>
                        <br></br>
                        <p className="content" >At the heart of Dubai lies its relentless pursuit of excellence, evident in its record-breaking structures like the Burj Khalifa, piercing the sky at over 828 meters, and the Palm Jumeirah, an engineering feat visible from space. These iconic landmarks stand as testaments to Dubai&apos;s audacious vision and unwavering determination to push boundaries.</p>
                        <br></br>
                        <p className="content" >Yet, Dubai isn&apos;t merely a city of skyscrapers. Its vibrant culture, influenced by a mosaic of nationalities, flavors every corner with diversity and dynamism. Traditional souks, bustling with the aroma of spices, coexist alongside ultra-modern shopping malls, offering a juxtaposition that reflects Dubai&apos;s multifaceted identity.</p>
                        <br></br>
                        <p className="content" >In recent years, Dubai has emerged as a global hub for business, tourism, and innovation. Its strategic location, state-of-the-art infrastructure, and business-friendly policies have attracted multinational corporations and entrepreneurs from around the world, fostering a thriving economy and a melting pot of ideas.</p>
                        <br></br>
                        <p className="content" >Moreover, Dubai&apos;s commitment to sustainability and environmental stewardship underscores its evolution as a responsible global citizen. Initiatives like the Dubai Clean Energy Strategy and the Sustainable City project epitomize its dedication to shaping a greener, more sustainable future for generations to come.</p>
                        <br></br>
                        <p className="content" >Beyond its gleaming facades and bustling streets, Dubai&apos;s soul lies in the warmth and hospitality of its people. Embracing visitors with open arms, Dubai offers a tapestry of experiences, from exhilarating desert safaris to cultural festivals celebrating its rich heritage.</p>
                        <br></br>
                        <p className="content" >In essence, Dubai is more than just a city—it&apos;s a symbol of boundless possibilities, where dreams are transformed into reality against the backdrop of endless sands and shimmering skylines. As it continues to write its story on the world stage, Dubai remains an unparalleled destination where the extraordinary becomes the norm, and the impossible is merely a challenge waiting to be conquered.</p>
        </div>
        </>
    )
}

export default FlightFare;