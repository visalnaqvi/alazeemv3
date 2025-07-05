import styles from "./map.module.css"
const Map = () => {
    return (
        <>
            <h2 className="subHeading center">Visit Us</h2>
            <p className="content center"><strong style={{ color: "#000" }}>Delhi Branch :</strong>Mr. Rashid Masood , 1/56 D Basement Lalita Park Laxmi Nagar Delhi 92</p>
            <p className="content center"><strong style={{ color: "#000" }}>Prayagraj Branch :</strong>Mr Shariq , 12/136 noorullah road Prayagraj (Allahabad) , Mob +91-9811042458</p>

            <div className={styles.wrapper}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0252316175734!2d77.27167857427483!3d28.629005875666657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf48c1f8da5%3A0x245f7b8f0d7fd129!2sAL-AZEEM%20TOUR%20%26%20TRAVELS%20-%20Flight%20Ticketing%20%26%20Visa%20Assistance%20Services!5e0!3m2!1sen!2sin!4v1696418520826!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}

export default Map;