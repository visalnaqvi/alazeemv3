import styles from "./quickContact.module.css"
import {BsWhatsapp , BsFacebook} from "react-icons/bs"
import {AiTwotonePhone} from "react-icons/ai"
import Link from "next/link"
const QuickContacts = ()=>{
    return(
        <div className={`body-wrapper justify-end ${styles.wrapper}`}>
           <Link href="https://wa.me/+919205184001"><div className={`${styles.icon} ${styles.wa} body-wrapper`}>
                <BsWhatsapp />
            </div></Link>
            <Link href="tel:9205184001"><div className={`${styles.icon} ${styles.call} body-wrapper`}>
                <AiTwotonePhone />
            </div></Link>
            <Link href="tel:9205184001"><div className={`${styles.icon} ${styles.call} body-wrapper`}>
                <BsFacebook />
            </div></Link>
        </div>
    )
}

export default QuickContacts;