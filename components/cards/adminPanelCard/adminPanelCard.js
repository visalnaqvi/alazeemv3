import { useRouter } from "next/router";
import styles from "./adminPanelCard.module.css"
const AdminPanelCard = ({card})=>{
    const router = useRouter();
    return(
        <>
        { card.price ?
        <div className={`${styles.wrapper} ${styles.big}`}>
        <h2 className={`subHeading  ${styles.cardTitle}`}>{card.title}</h2>
        <div className="body-wrapper justify-start">
        <button onClick={()=>{
router.push(`admin-panel/`)
        }} className={`primary-btn blue ${styles.button}`}>Edit</button>
        <button onClick={()=>{
router.push(`admin-panel/`)
        }} className={`primary-btn red ${styles.button}`}>Delete</button>
        <button onClick={()=>{
router.push(`admin-panel/`)
        }} className={`primary-btn blue ${styles.button}`}>Move Up</button>
        <button onClick={()=>{
router.push(`admin-panel/`)
        }} className={`primary-btn blue ${styles.button}`}>Move Down</button>
        <button className={`primary-btn yellow ${styles.button}`}>Price - {card.price}</button>
        </div>
    </div>
        : 
            <div className={styles.wrapper}>
                <h2 className={`boldHeading  ${styles.cardTitle}`}>{card.title}</h2>
                <button onClick={()=>{
router.push(`admin-panel/${card.link}`)
                }} className={`primary-btn blue ${styles.button}`}>Edit</button>
            </div>
        }
          </>  
    )
}

export default AdminPanelCard;