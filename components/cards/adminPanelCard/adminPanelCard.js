import { deletePackage } from "@/services/deleteData";
import styles from "./adminPanelCard.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
const AdminPanelCard = ({ card, packageid, onUpClick, index, onDownClick }) => {
    const router = useRouter();
    const TourEditCard = <div className={`${styles.wrapper} ${styles.big}`}>
        <h2 className={`subHeading  ${styles.cardTitle}`}>{card.title}</h2>
        {packageid=="links" && <p>Link: {card.link}</p>}
        <div className="body-wrapper justify-start">
            <Link href={`${packageid}/${card.id}`}><button className={`primary-btn blue ${styles.button}`}>Edit</button></Link>
            {packageid != "links" && <button onClick={ async ()=>{
                if(window.confirm("Pakka delte krna hai?")){
                    await deletePackage(card.id , packageid)
                    router.reload()
                }
            }} className={`primary-btn red ${styles.button}`}>Delete</button>}
            <button onClick={() => { onUpClick(index) }} className={`primary-btn blue ${styles.button}`}>Move Up</button>
            <button onClick={() => { onDownClick(index) }} className={`primary-btn blue ${styles.button}`}>Move Down</button>
           {packageid == "links"? <button className={`primary-btn ${card.active ? "green" :"red" } ${styles.button}`}>Status - {card.active ? "Active" : "Inactive"}</button> : <button className={`primary-btn green ${styles.button}`}>Price - {card.price}</button>}
        </div>
    </div>

    const AdminPanelCollectionCard = <div className={styles.wrapper}>
        <h2 className={`boldHeading  ${styles.cardTitle}`}>{card.title}</h2>
        <div className="body-wrapper justify-start">  
        {
            packageid=="page-setting" ? <Link href={`${packageid}/${card.id}`}><button className={`primary-btn blue ${styles.button}`}>Edit</button></Link>
        :  
        <Link href={packageid == "vendors" ? `${packageid}/${card.id}` : `admin-panel/${card.link}`}><button className={`primary-btn blue ${styles.button}`}>Edit</button></Link>}  
        {packageid=="vendors" && <button onClick={async ()=>{
            if(window.confirm("pkka delete krna hai?")){
                await deletePackage(card.id , packageid)
                router.reload() 
            }
        }} className="primary-btn red">Delete</button>}
        </div>
    </div>
   
    switch (packageid) {
        case "vednors": return (AdminPanelCollectionCard);

        case "page-setting": return (AdminPanelCollectionCard);

        case "hajjUmrah": return (TourEditCard);

        case "iraq": return (TourEditCard);

        case "links": return (TourEditCard);

        default: return (AdminPanelCollectionCard);
    }
}

export default AdminPanelCard;