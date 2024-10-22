import styles from "./quickContact.module.css"
import {BsWhatsapp , BsFacebook} from "react-icons/bs"
import {AiTwotonePhone} from "react-icons/ai"
import Link from "next/link"
import {useRouter} from "next/router"
import { useEffect, useState } from "react"
const QuickContacts = ()=>{
    const router = useRouter();
    const [isFlag,setIsFlag] = useState(false)
    useEffect(()=>{
        if(router.asPath=='/iraq-ziyarat-packages/iraq-ziyarat'){
            setIsFlag(true)
        }
    },[router])
    const handlePhoneClick = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', 'AW-16748530223/dxyxCML-998ZEK-UqbI-', {
                'phone_conversion_number': '9205184001'
            });
        }
    };
    function gtag_report_conversion(url) {
        var callback = function () {
          if (typeof(url) != 'undefined') {
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

    const handleWhatsAppClick = (url) => {
        if (typeof window !== 'undefined' && window.gtag) {
            const callback = function () {
                if (typeof(url) !== 'undefined') {
                    window.location = url;
                }
            };

            window.gtag('event', 'conversion', {
                'send_to': 'AW-16748530223/12UECMO--N8ZEK-UqbI-',
                'value': 1.0,
                'currency': 'INR',
                'event_callback': callback
            });

            return false;
        }
    };

    return(
        <div className={`body-wrapper justify-end ${styles.wrapper}`}>
           
         {isFlag?<Link href="https://wa.me/+919205184001">
                <div 
                    className={`${styles.icon} ${styles.wa} body-wrapper`} 
                    onClick={(e) => { 
                        e.preventDefault(); // Prevent default link behavior
                        handleWhatsAppClick("https://wa.me/+919205184001");
                    }}
                >
                    <BsWhatsapp />
                </div>
            </Link>:  <Link href="https://wa.me/+919205184001"><div className={`${styles.icon} ${styles.wa} body-wrapper`}>
                <BsWhatsapp />
            </div></Link>}

           {isFlag ? <Link href="tel:9205184001">
                <div className={`${styles.icon} ${styles.call} body-wrapper`} onClick={()=>{gtag_report_conversion()}}>
                    <AiTwotonePhone />
                </div>
            </Link>:
            <Link href="tel:9205184001"><div className={`${styles.icon} ${styles.call} body-wrapper`}>
                <AiTwotonePhone />
            </div></Link>}
            <Link href="#"><div className={`${styles.icon} ${styles.call} body-wrapper`}>
                <BsFacebook />
            </div></Link>
        </div>
    )
}

export default QuickContacts;