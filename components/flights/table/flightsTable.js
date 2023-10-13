import styles from "./flightTable.module.css"
const FlightsTable = ({details})=>{
    return(
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                    <td>Flight Name</td>
                    <td>Flight From</td>
                    <td>Destination</td>
                    <td>Departure Date and Time</td>
                    <td>Landing Date and Time</td>
                </tr>
            </thead>
            <tbody>
                {
                    details.map((flight,i)=>(
                        <tr key={i} className={styles.tableRow}>
                            <td>{flight.title}</td>
                            <td>{flight.from}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.departureDate}</td>
                            <td>{flight.landingDate}</td>
                        </tr>
                    ))
                }
           </tbody>
        </table>
    )
}

export default FlightsTable;