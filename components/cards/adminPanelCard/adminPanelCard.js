import styles from "./adminPanelCard.module.css"
import Link from "next/link";
const AdminPanelCard = ({ card , packageid , onUpClick , index , onDownClick }) => {
    
    const TourEditCard = <div className={`${styles.wrapper} ${styles.big}`}>
    <h2 className={`subHeading  ${styles.cardTitle}`}>{card.title}</h2>
    <div className="body-wrapper justify-start">
        <Link href={`${packageid}/${card.id}`}><button className={`primary-btn blue ${styles.button}`}>Edit</button></Link>
        <button className={`primary-btn red ${styles.button}`}>Delete</button>
        <button onClick={()=>{onUpClick(index)}} className={`primary-btn blue ${styles.button}`}>Move Up</button>
        <button onClick={()=>{onDownClick(index)}} className={`primary-btn blue ${styles.button}`}>Move Down</button>
        <button className={`primary-btn yellow ${styles.button}`}>Price - {card.price}</button>
    </div>
</div>

const AdminPanelCollectionCard = <div className={styles.wrapper}>
<h2 className={`boldHeading  ${styles.cardTitle}`}>{card.title}</h2>
<Link href={packageid=="vendors" ? `${packageid}/${card.id}` : `admin-panel/${card.link}`}><button className={`primary-btn blue ${styles.button}`}>Edit</button></Link>
</div>

switch (packageid) {
    case "vednors": return (AdminPanelCollectionCard);

    case "hajjUmrah" : return (TourEditCard);

    case "iraq" : return (TourEditCard);

    default: return (AdminPanelCollectionCard);
}
}

export default AdminPanelCard;