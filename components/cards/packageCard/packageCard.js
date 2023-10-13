import FlightPopUp from "@/components/flights/container/popUp";
import IconList from "../../lists/iconList";
import styles from "./packageCard.module.css"
import { useState } from "react";


const PackageCard = ({tour , type , subType}) => {

    const [isFlightsOpen , setIsFlightsOpen] = useState(false)
 
    return (
        <div className={`${styles.card}  ${styles[type]} ${styles[subType]}`}>
            <div className={styles.content}>
                <h2>{tour.title}</h2>
                <h3 className={styles.callToActionYellow}>Departure: {tour.date}</h3>
                <IconList items={tour.features} />
            </div>
           {tour.hotels.length != 0 && <div className={styles.beforeFooter}>
                <div className={styles.beforeFooterSection}>
                    <p className={styles.beforeHeaderSectionHeading}>Makkah Hotel</p>
                    <p className={styles.beforeHeaderSectionContent}>{tour.hotels[0]}</p>
                </div>
                <div className={styles.beforeFooterSection}>
                    <p className={styles.beforeHeaderSectionHeading}>Madina Hotel</p>
                    <p className={styles.beforeHeaderSectionContent}>{tour.hotels[1]}</p>
                </div>
            </div>}
            <div className={styles.footer}>
                <p className={styles.footertext}>At Just Rs. {tour.price}/-</p>
                <button onClick={()=>{
                    if(tour.flights?.length > 0){
                        setIsFlightsOpen(true);
                    }
                }} className={styles.footerButton}>View Flight</button>
            </div>
            {isFlightsOpen && <FlightPopUp setIsFlightsOpen={setIsFlightsOpen} details={tour.flights} />}
        </div>
    )
}

export default PackageCard;