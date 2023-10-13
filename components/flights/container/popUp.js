import FlightsTable from "../table/flightsTable"
import styles from "./popUp.module.css"
import {MdOutlineCancelPresentation} from "react-icons/md"
const FlightPopUp = ({details , setIsFlightsOpen})=>{
    return(
        <div className={`${styles.wrapper} body-wrapper  `}>
            <div onClick={()=>{
                setIsFlightsOpen(false)
            }} className="cancle-icon">
            <MdOutlineCancelPresentation style={{pointerEvents:"none"}} />
            </div>
            <FlightsTable details={details} />
        </div>
    )
}

export default FlightPopUp;