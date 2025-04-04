import Link from "next/link";
import styles from "./contactBox.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ContactBox = () => {
    const router = useRouter();
    const [isFlag, setIsFlag] = useState(false)
    useEffect(() => {
        if (router.asPath == '/iraq-ziyarat-packages/iraq-ziyarat') {
            setIsFlag(true)
        }
    }, [router])

    function gtag_report_conversion(url) {
        var callback = function () {
            if (typeof (url) != 'undefined') {
                window.location = url;
            }
        };
        gtag('event', 'conversion', {
            'send_to': 'AW-16748530223/dxyxCML-998ZEK-UqbI-',
            'event_callback': callback,
            'phone_conversion_number': '9205184001',
        });
        return false;
    }
    return (
        <div className={`body-wrapper ${styles.wrapper}`}>
            <div className={styles.contactBoxSection}>
                <h3 style={{ marginTop: 0 }} className="subHeading">Contact Us for more information</h3>
                <p style={{ color: "white" }} className="content">Planning for Umrah? Book your umrah package with us as we provide the highest-quality Umrah packages from India at amazingly reasonable prices, ensuring that all of your travel needs are met to your satisfaction.</p>
                <p style={{ color: "white" }} className="content"><strong>Email: alazeem1170@gmail.com</strong></p>
                {/* <button>Request a Callback</button> */}

            </div>
            <div className={styles.contactBoxSection}>
                {/* <p><strong>OR CLASS US NOW ON</strong></p><br></br> */}
                <div>
                    <Link onClick={() => { gtag_report_conversion() }} href="tel:9205184001"><button>+91 9205184001</button></Link>
                    <Link onClick={() => { gtag_report_conversion() }} href="tel:9717040012"><button>+91 9717040012</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ContactBox;