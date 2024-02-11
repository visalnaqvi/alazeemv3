import SingleImage from "@/components/carousel/singleImage";
import background from "../public/backgroundImages/forex.webp";
import background_mb from "../public/backgroundImages/forex.webp";
import Head from "next/head";
const Forex = ()=>{
    return(
        <>
        <Head>
        <title>Al Azeem Tours and Travles | FOREX</title>
        </Head>
                <SingleImage url={[background , background_mb]} />
    
            <div className="margin">
            <div className="body-wrapper justify-between">
                <h2 className="boldHeading button">FOREX</h2>
                <a className="contact-button" href="tel:+919811136987"><button className="primary-btn blue">Contact Us On: +919811136987</button></a>
                </div>
                <p className="content">Gupta forex & Allied Services is licensed as authorized dealer &lpar; unit of khanna Forex pvt ltd , new Delhi &rpar;. we are specialized in outward remittances as per guidelines of RBI. we offer best exchange rates for buying and selling of foreign currency,  forex card. We are offering service to individuals, corporates, students , wholesale customers and money changers. our sister concern AL Azeem Tour & Travels ( IATA) do all travel related services like air ticketing ( domestic & international ), visa, inbound and outbound packages, hotel booking and other travel related solutions. We also specialized in arranging school picnics. 9811136987, 9811355086, 9811042458</p>
                <br></br>
            </div>
            </>
    )
}

export default Forex;