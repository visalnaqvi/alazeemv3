import styles from "./flightTable.module.css"
import {RiDeleteBin5Fill} from "react-icons/ri"
const FlightsTable = ({details , admin=false , onDelete})=>{

    return(
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                    <td>Flight</td>
                    <td>Date</td>
                    <td>Sector</td>
                    <td>Time</td>
                    {admin && <td>Action</td>}
                </tr>
            </thead>
            <tbody>
                {
                    details.map((flight,i)=>(
                        <tr key={i} className={styles.tableRow}>
                            <td>{flight.title}</td>
                            <td>{flight.date}</td>
                            <td>{flight.sector}</td>
                            <td>{flight.time}</td>
                            {
                                admin &&  <div className="delete-icon" id={i} onClick={async (e) => {
                                    onDelete(i)
                                }}>
                                    <RiDeleteBin5Fill style={{ pointerEvents: "none" }} />
                                </div>
                            }
                        </tr>
                    ))
                }
           </tbody>
        </table>
    )
}

export default FlightsTable;