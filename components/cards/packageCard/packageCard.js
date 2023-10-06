import { useEffect } from "react";
import IconList from "../../lists/iconList";
import styles from "./packageCard.module.css"


const PackageCard = ({tour , type}) => {

 
    return (
        <div className={`${styles.card}  ${styles[type]}`}>
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
                <button className={styles.footerButton}>View Flight</button>
            </div>
        </div>
    )
}

export default PackageCard;