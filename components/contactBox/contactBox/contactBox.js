import styles from "./contactBox.module.css"
const ContactBox = ()=>{
    return(
        <div className={`body-wrapper ${styles.wrapper}`}>
            <div className={styles.contactBoxSection}>
                <h3 style={{marginTop:0}} className="subHeading">Contact Us for more information</h3>
                <p style={{color:"white"}} className="content">Planning for Umrah? Book your umrah package with us as we provide the highest-quality Umrah packages from India at amazingly reasonable prices, ensuring that all of your travel needs are met to your satisfaction.</p>
                <p style={{color:"white"}} className="content"><strong>Email: aatravels1170@gmail.com</strong></p>
                <button>Request a Callback</button>

            </div>
            <div className={styles.contactBoxSection}>
                <p><strong>OR CLASS US NOW ON</strong></p><br></br>
                <button>+919205184001</button>
                <button>+9198110042458</button>
            </div>
        </div>
    );
}

export default ContactBox;