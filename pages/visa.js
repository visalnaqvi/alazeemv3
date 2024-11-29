import SingleImage from "@/components/carousel/singleImage";
import background from "../public/backgroundImages/visa.jpg";
import background_mb from "../public/backgroundImages/visamb.jpg";
import Head from "next/head";
import Image from "next/image";
export default function Visa() {

    const listOne =  [
        "Flight Booking Domestic & International",
        "Visa and Passport Assistance",
        "Hotel Reservation",
        "Vacation Packages",
        "Cruise Reservations",
        "Travel Insurance",
        "Haj & Umrah Packages",
        "Iraq Iran Syria Ziarat Packages",
        "Foreign Currency Exchange (FOREX)",
        "Documents Attestation"
    ];

    const attractions = [
        {
            title: "Burj Khalifa",
            content: "The tallest building in the world, standing at 828 meters. It is a symbol of Dubai&apos;s rapid growth and ambition."
        },
        {
            title: "Palm Jumeirah",
            content: "An artificial archipelago in the shape of a palm tree, home to high-end hotels, luxury villas, and entertainment venues."
        },
        {
            title: "Dubai Mall",
            content: "One of the world&apos;s largest shopping malls, featuring over 1,200 retail outlets, an indoor ice rink, and an aquarium."
        },
        {
            title: "Desert Safari",
            content: "A popular tourist activity that includes dune bashing, camel riding, and traditional Bedouin-style dinners."
        },
        {
            title: "Cultural Heritage",
            content: "Despite its modernity, Dubai preserves its cultural heritage through sites like the Dubai Museum, located in the Al Fahidi Fort, and the historic district of Al Bastakiya."
        }
    ];

    const thailandAttractions = [
        {
            title: "Bangkok",
            content: "The capital city, famous for its bustling markets, ornate temples, and the Grand Palace."
        },
        {
            title: "Chiang Mai",
            content: "Known for its historic temples, mountainous landscapes, and cultural festivals."
        },
        {
            title: "Beaches and Islands",
            content: "Popular destinations like Phuket, Koh Samui, and the Phi Phi Islands are celebrated for their beautiful beaches and clear waters."
        },
        {
            title: "Cuisine",
            content: "Thai food is globally beloved, featuring dishes like Pad Thai, Tom Yum Goong, and Green Curry."
        }
    ];
    
    const azerbaijanAttractions = [
        {
            title: "Baku",
            content: "The capital city, famous for its modern architecture, like the Flame Towers, and historical sites, such as the UNESCO-listed Old City (Icherisheher)."
        },
        {
            title: "Caspian Sea",
            content: "Azerbaijan has a long coastline along the Caspian Sea, offering beautiful beaches and resorts."
        },
        {
            title: "Cultural Heritage",
            content: "The country has a rich history, with landmarks like the Maiden Tower and Gobustan Rock Art Cultural Landscape, which features ancient petroglyphs."
        },
        {
            title: "Natural Beauty",
            content: "The diverse landscapes range from the Caucasus Mountains to lush forests and semi-desert areas."
        }
    ];

    const saudiArabiaAttractions = [
        {
            title: "Riyadh",
            content: "The capital city, known for its modern skyscrapers and historical sites like the Masmak Fortress."
        },
        {
            title: "Mecca and Medina",
            content: "Two of the holiest cities in Islam, attracting millions of pilgrims annually for Hajj and Umrah."
        },
        {
            title: "Economic Reforms",
            content: "Under Vision 2030, Saudi Arabia is diversifying its economy beyond oil, focusing on tourism, entertainment, and technology."
        }
    ];
    
    
    

    const getLi = (text , i)=>{
        return <li key={i}><div className="body-wrapper justify-start">
            <Image style={{marginRight:"10px"}} src={"/icons/check.png"} width={20} height={20} />
            <p style={{width:"90%"}}>{text}</p></div></li>
    }


    const getHeadLi = (item , i)=>{
        return <li key={i}>
            <div className="body-wrapper justify-start items-start">
            <Image style={{marginRight:"10px" , marginTop:"8px"}} src={"/icons/check.png"} width={20} height={20} />
                <p style={{width:"90%"}} className="content"><span style={{fontWeight:"700"}}>{item.title} : </span>{item.content}</p>
            </div>
        </li>
    }
    return (
        <>
            <Head>
                <title>Dubai Visa From India | Dubai Visa Agent in Delhi | Travel Agent for Dubai Visa</title>
                <meta name="description" content="Looking for a Dubai Visa from India? Al Azeem Travels offers expert assistance as a trusted Dubai Visa agent in Delhi. Get the best Dubai tourist visa fees and Dubai visit visa prices today." />
                <meta
          name="keywords"
          content="Dubai Visa,
Dubai Visa From India,
Dubai Visa Agent in Delhi,
Travel Agent for Dubai Visa,
Dubai Tourist Visa Fees,
Dubai Visit Visa Price,
Dubai Tourist Visa Price,
Sharjah Visa,
Sharjah Visa Agent,
Azerbaijan Tourist Visa,
Azerbaijan Tourist Visa Agent in Delhi,
Azerbaijan Visa From India,
Thailand Visa,
Bangkok Visa,
Thailand Visa Agent in Delhi,
Thailand Visa from India,
UK Visa,
UK visa Agent In Delhi,
UK Visa From India,
Vietnam Visa,
Vietnam Visa Agent,
Vietnam Visa from India,
Iraq Visa,
Iraq Visa Agent in Delhi,
Iraq Visa from India,
Iran Visa,
Iran Visa Agent in Delhi,
Iran Visa From India,
Saudi Arab Umrah Visa,
Saudi Arab Tourist Visa,
Saudi Arab Visa Agent,
Umrah Visa Agent,
Umrah Visa Agent in Delhi,
Umrah Visa Price,
UAE Visa,
Oman Visa, 
Oman Visa Agent,
Oman Visa from India,
Qatar Visa,
Qatar Visa from India,
Qatar Visa Agent,
Australia Visa,
Australia Tourist Visa, 
Australia Tourist Visa Agent,
US Visa,
US Visa Agent,
US Visa from India,
Russia Visa,
Russia Visa Agent,
Russia Visa from India,
Turkey Visa,
Turkey Tourist Visa,
Turkey Tourist Visa Agent,
China Visa,
China Visa Agent,
China Visa from India,
Egypt Visa,
Egypt Visa Agent,
Singapore Visa,
Singapore Visa Agent,
Malaysia Visa,
Malaysia Tourist Visa agent,
Malaysia Visa from India,
Armenia Visa,
Armenia Visa Agent,
Schengen visa,
Schengen visa Agent,
Schengen visa from India,
Schengen countries,
France Visa,
France Visa Agent,
Italy Visa,
Italy Visa Agent,
Germany Visa,
Germany Visa Agent,
Germany Visa From India,
Travel agent in Delhi,
Travel Agent"
        />
            </Head>
            <SingleImage url={[background, background_mb]} />

            <div className="margin">
                <div className="body-wrapper justify-between">
                    <div>
                    <h1 className="boldHeading button">Dubai Visa From India - Trusted Travel Agent for Dubai Visa Services</h1>
                    </div>
                    <a className="contact-button" href="tel:+919811136987"><button className="primary-btn blue">Contact Us On: +919811136987</button></a>
                </div>
                <p className="content">AL AZEEM TOUR & TRAVELS is a travel agency affiliated to IATA dedicated to provide memorable travel experiences around the world. Our agency mission is to provide seamless, enriching travel experiences that cater to the unique needs and desires of each client. Our agency aim to provide the best services to remove the stress and complexity from travel planning with the help of our experience staff. Below services provided by our agency</p>
                <br></br>

                <ul className="content">
                    
                    {
                        listOne.map((item,i)=>{
                            return getLi(item , )
})
                    }
                    
                </ul>
                <h2 className="boldHeading button">Dubai / Sharjah Visa</h2>
                <p className="content">Dubai, one of the seven emirates that make up the United Arab Emirates (UAE), is renowned for its rapid development and modern architecture. Over the past few decades, it has transformed from a small fishing village to a global city known for its luxury shopping, ultramodern buildings, and vibrant nightlife.</p>
<br></br>
                <p className="content">Key highlights of Dubai include:</p>
                <ul>
                    {
                        attractions.map((item , i)=>{
                            return getHeadLi(item , i)
                        })
                    }
                </ul>
                <br></br>
                <p className="content">The city&apos;s economy is diverse, with major sectors including tourism, aviation, real estate, and financial services. Dubai is famous for Tourism and giving e visa for 30 days 60 days visa and 90 days visa. </p>
                <br></br>
                    <p className="content">Documents Required</p>
                    <ul className="content">
                        <li>1. Passport PDF Frond and Back Page</li>
                        <li>2. Photo with white back Ground</li>
                        <li>3. PAN card Photo</li>
                    </ul>


                    <h2 className="boldHeading button">Thailand Visa</h2>
                    <p className="content">Thailand, located in Southeast Asia, is renowned for its rich culture, stunning beaches, and delicious cuisine. The country is a constitutional monarchy, with Bangkok as its vibrant capital. Key highlights include:</p>
                    <br />
                    <ul>
                        {
                            thailandAttractions.map((item , i)=>{
                                return getHeadLi(item , i)
                            })
                        }
                    </ul>
<br />
                    <p className="content">Thailand&apos;s economy is diverse, with strong sectors in tourism, agriculture, and manufacturing. The country is predominantly Buddhist, and its culture is a blend of ancient traditions and modern influences. Thailand visa is provided by VSF as per the travel ternary </p>
                    <br />
                    <p className="content">Documents Required </p>
                    <ul className="content">
                        <li>1.	Photo with white back Ground</li>
                        <li>2.	Original Passport</li>
                        <li>3.	Original Booking Air Ticket</li>
                        <li>4.	Bank Statement attested by bank with minimum balance 125000/-</li>
                        <li>5.	Hotel Booking Original Voucher</li>
                    </ul>
                    <h2 className="boldHeading button">Azerbaijan Visa</h2>
                    <p className="content">Azerbaijan, located at the crossroads of Eastern Europe and Western Asia, is known for its rich cultural heritage, diverse landscapes, and rapid modernization. The country is a republic with Baku as its capital. Key highlights include:</p>
                    <ul>
                        {
                            azerbaijanAttractions.map((item , i)=>{
                                return getHeadLi(item , i)
                            })
                        }
                    </ul>
                    <br />
                    <p className="content">Azerbaijan&apos;s economy is primarily driven by oil and gas exports, but it is also focusing on developing sectors like agriculture, tourism, and technology. The country is known for its hospitality, traditional music (mugham), and cuisine, which includes dishes like plov and kebabs. Azerbaijan&apos;s unique blend of modernity and tradition makes it a fascinating destination. E visa is Available for Azerbaijan urgent visa is also available issued in 3 hours and normal visa takes 3 or 4 days. Only passport JPJ front and back page reuired. And address for stay also required</p>
                    <h2 className="boldHeading button">SAUDI ARABIA VISA (Tourist & Umrah Visa)</h2>
                    <p>
                    Saudi Arabia, located on the Arabian Peninsula, is known for its vast deserts, rich cultural heritage, and significant role in the global oil industry. Key highlights include:
                    </p>
                    <br/>

                        <ul>
                            {
                                saudiArabiaAttractions.map((item , i)=>{
                                    return getHeadLi(item , i)
                                })
                            }
                        </ul>
                        <br />
                    <p className="content">Saudi Arabia&apos;s economy is heavily based on oil exports, but it is undergoing significant changes to reduce dependency on oil and promote other sectors. The country&apos;s cultural landscape is deeply influenced by Islamic traditions, making it a unique blend of ancient heritage and modern development. Saudi Arabia is providing Tourist visa for 30 days and 90 Days Multiple Entry Visa, and Umrah Visa is e visa for 90 days from the date of issue</p>

                    <br />
                    <p className="content">Documents Required</p>
                    <br/>
                    <p className="content">Umrah Visa </p>
                    <ul className="content">
                    <li>1. Passport PDF Frond and Back Page</li>
                        <li>2. Photo with white back Ground</li>
                        <li>3. PAN card Photo</li>
                    </ul>
                    <br/>
                    <p className="content">Tourist Visa (Sticker Visa)</p>
                    <ul className="content">
                    <li>1.	Original Passport</li>
                        <li>2.	Bank Statement with seal and Signature</li>
                        <li>3.	Photo with white back ground</li>
                        <li>4.	PAN card</li>
                    </ul>
                    <h2 className="boldHeading button">E VISA FACILITY</h2>
                    <p className="content">Many countries offer e-visa facilities to simplify the visa application process for travelers. Here is a list of some countries that provide e-visa services:</p>
                                <br />
                                <div className="list-wrapper">
                                <ul className="content">
    <li>1. Australia E Visa</li>
    <li>2. Azerbaijan E Visa</li>
    <li>3. Bahrain E Visa</li>
    <li>4. Cambodia E Visa</li>
    <li>5. Canada E Visa</li>
    <li>6. Colombia E Visa</li>
    <li>7. Djibouti E Visa</li>
    <li>8. Egypt E Visa</li>
    <li>9. Ethiopia E Visa</li>
    <li>10. Georgia E Visa</li>
    <li>11. Kenya E Visa</li>
    <li>12. Kuwait E Visa</li>
    <li>13. Laos E Visa</li>
    <li>14. Malaysia E Visa</li>
    <li>15. Myanmar E Visa</li>
    <li>16. New Zealand E Visa</li>
   
    </ul>
    <ul className="content">
    <li>17. Oman E Visa</li>
    <li>18. Qatar E Visa</li>
    <li>19. Russia E Visa</li>
    <li>20. Saudi Arabia E Visa</li>
    <li>21. Singapore E Visa</li>
    <li>22. Sri Lanka E Visa</li>
    <li>23. Tajikistan E Visa</li>
    <li>24. Turkey E Visa</li>
    <li>25. Uganda E Visa</li>
    <li>26. Ukraine E Visa</li>
    <li>27. United Arab Emirates (UAE)</li>
    <li>28. Uzbekistan E Visa</li>
    <li>29. Vietnam E Visa</li>
    <li>30. Zambia E Visa</li>
    <li>31. Zimbabwe E Visa</li>
</ul>
</div>
<br/>
<p className="content">Please note that the availability and specific requirements for e-visas can change, so it&apos;s always best to check with us.</p>
<h2 className="boldHeading button">Countries Don&apos;t Have E Visa Facility</h2>
<p className="content">
While many countries offer e-visa facilities, several do not provide this option, requiring travelers to apply for visas through embassies or consulates. Here is a list of some countries that currently do not have e-visa facilities:
</p>
<br />
<div className="list-wrapper">
<ul className="content">
    <li>1. Afghanistan</li>
    <li>2. Algeria</li>
    <li>3. Bhutan</li>
    <li>4. Chad</li>
    <li>5. Cuba</li>
    <li>6. Democratic Republic of the Congo</li>
    <li>7. Eritrea</li>
    <li>8. Gabon</li>
    <li>9. Iraq</li>

    </ul>
    <ul className="content">
    <li>10. North Korea</li>
    <li>11. Libya</li>
    <li>12. Mali</li>
    <li>13. Niger</li>
    <li>14. South Sudan</li>
    <li>15. Syria</li>
    <li>16. Turkmenistan</li>
    <li>17. Venezuela</li>
    <li>18. Yemen</li>
</ul>
</div>
<p className="content">Visa policies frequently change, so it&apos;s advisable to check the latest information from us </p><br />

            </div>
        </>
    )
}