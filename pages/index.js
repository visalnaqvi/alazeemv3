import ImageCard from "@/components/cards/imageCard/imageCard"
import CarouselComp from "@/components/carousel/carousel"
import services from "../data/services.js"
import features from "../data/features.js"
import Map from "../components/map/map.js"
import { useWindowSize } from "@uidotdev/usehooks";
import ContactBox from "@/components/contactBox/contactBox/contactBox.js"
import Head from "next/head.js"
export default function Home() {
  const desktopImages = [
    "/sliders/homePageSlider/desktop/slider_1.png",
    "/sliders/homePageSlider/desktop/slider_2.png",
    "/sliders/homePageSlider/desktop/slider_3.png",

]

const mobileImages = [
  "/sliders/homePageSlider/mobile/slider_1_mb.png",
  "/sliders/homePageSlider/mobile/slider_2_mb.png",

]
const size = useWindowSize();
  return (
   
    <div>
       <Head>
      <title>Al Azeem Tours and Travles | Home</title>
    </Head>
      {
        size.width > 700 ?
        <CarouselComp width={2000} height={550} images={desktopImages} /> :
        <CarouselComp width={700} height={200} images={mobileImages} />
      }
        <div className="margin">
          <div className="body-wrapper justify-between">
            <h2 className="subHeading">Our foundation</h2>
            <a className="contact-button" href="tel:+919811136987"><button className="primary-btn blue">Contact Us On: +919811136987</button></a>
          </div>
            <p className="content">We present before you AL-AZEEM TOUR & TRAVELS as one stop platform for all your travel needs.With a focus on customer service, at Al-Azeem Tour we offer a fantastic range of trips to meet your budget , ambitions and expectations. All of us here in the Al-Azeem team, work tirelessly to ensure that your trip is carefree, successful and enjoyable experience from start to finish. That means attention to your travel plans, accommodation, specialist inclusions and leisure time as well as to health and safety, financial protection and travel insurance.Specialist knowledge and experience is only half of the story. What distinguishes ous is our passion for the trips we organise, for the destinations that we feature. We feature trips around the worldand our latest inclusion is tour to Saudi Arabia.</p>
         
          <h2 className="boldHeading center">Our Services</h2>
          <div className="body-wrapper">
              {
                services.map((d,i)=>(
                  <ImageCard key={i} data={d} />
                ))
              }
          </div>
          <h2 className="subHeading center">Why to choose Us?</h2>
          <p className="content center">Since established our primary aim was to provide quality tour and travel package services to business and leisure travelers. Supported by strong financial management, impressive customer satisfaction, and constant improvement, AL - AZEEM TOUR & TRAVELS has expanded to cover various facets of the industry. Our experience led to perfection in both our outbound and inbound units. All our tour packages are designed and planed keeping in mind your needs and comfortability. We will choose the best options available in market . And take care of all your needs.</p>
        </div>
        <div className="body-wrapper">
              {
                features.map((d,i)=>(
                  <ImageCard key={i} data={d} />
                ))
              }
          </div>

        <h2 className="subHeading center">Visit Us</h2>
        <p className="content center"><strong style={{color:"#000"}}>Laxmi Nagar Branch:</strong> 1/53, Ist Floor, Lalita Park, Laxmi Nagar, Delhi-92</p>
        <p className="content center"><strong style={{color:"#000"}}>Okhla Branch:</strong> 334E, 3rd Floor, Batla House Chowk, Jamia Nagar, Okhla, Upper Rajdhani Medical Store, New Delhi, Delhi-110025</p>
        <Map />
        <br></br>
    </div>
  )
}
