import Image from "next/image";
import styles from "./imageCardFormal.module.css"
const ImageCardFormal = ({tour})=>{
    return(
        <div className={styles.wrapper}>
            <div className={styles.img}>
                <Image width={500} height={200} src={`/holidayPackages/${tour.image}.jpg`} alt="city"  />
            </div>
            <div className={styles.content}>
                <h3 className={styles.cardHeading}>{tour.title}</h3>
                {
                    tour.description.length > 200 ? 
                    <p className={`content ${styles.cardContent}`} title={tour.description}>{tour.description.slice(0,200)}...</p>:
                    <p className={`content ${styles.cardContent}`}>{tour.description}</p>
                }
                
            </div>
        </div>
    )
}

export default ImageCardFormal;