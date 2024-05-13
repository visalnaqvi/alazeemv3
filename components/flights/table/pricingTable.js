import styles from "./flightTable.module.css"
import {RiDeleteBin5Fill} from "react-icons/ri"
const PricingTable = ({details , admin=false , onDelete})=>{

    return(
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                    <td>Room Sharing</td>
                    <td>Cost</td>
                    <td>Tax</td>
                    <td>Total Price</td>
                    {admin && <td>Action</td>}
                </tr>
            </thead>
            <tbody>
                {
                    details.map((flight,i)=>(
                        <tr key={i} className={styles.tableRow}>
                            <td>{flight.room}</td>
                            <td>{flight.amount}</td>
                            <td>{flight.tax}</td>
                            <td>{flight.amtTax}</td>
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

export default PricingTable;