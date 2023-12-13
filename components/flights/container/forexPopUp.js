import FlightsTable from "../table/flightsTable"
import styles from "./popUp.module.css"
import {MdOutlineCancelPresentation} from "react-icons/md"
const ForExPopUp = ({setIsFlightsOpen})=>{
    return(
        <div className={`${styles.wrapper} body-wrapper  `}>
            <div onClick={()=>{
                setIsFlightsOpen(false)
            }} className="cancle-icon">
            <MdOutlineCancelPresentation style={{pointerEvents:"none"}} />
            </div>
            <div className={styles.bgWrapper}>
                <p className="content" style={{color:"#000"}}>
                    Gupta forex & Allied Services is licensed as authorized dealer &lpar; unit of khanna Forex pvt ltd , new Delhi &rpar;. we are specialized in outward remittances as per guidelines of RBI. we offer best exchange rates for buying and selling of foreign currency,  forex card. We are offering service to individuals, corporates, students , wholesale customers and money changers. our sister concern AL Azeem Tour & Travels ( IATA) do all travel related services like air ticketing ( domestic & international ), visa, inbound and outbound packages, hotel booking and other travel related solutions. We also specialized in arranging school picnics. 9811136987, 9811355086, 9811042458
                </p>
            </div>
        </div>
    )
}

export default ForExPopUp;