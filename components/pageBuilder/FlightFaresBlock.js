import { useEffect, useState } from "react";
import { getFlightFare } from "@/services/getData";
import styles from "./pageBuilder.module.css";

const normalizeRows = flight => Array.from({ length: Number(flight.number) || 0 }, (_, index) => flight[String(index)]).filter(Array.isArray);

export default function FlightFaresBlock({ block }) {
    const [state, setState] = useState({ loading: true, fares: [], error: "" });
    useEffect(() => {
        let active = true;
        getFlightFare().then(result => {
            if (!active) return;
            if (!Array.isArray(result)) throw new Error(result?.msg || "Unable to load flight fares.");
            setState({ loading: false, fares: result, error: "" });
        }).catch(error => active && setState({ loading: false, fares: [], error: error.message }));
        return () => { active = false; };
    }, []);
    if (state.loading) return <p className={styles.dynamicStatus}>Loading flight fares…</p>;
    if (state.error) return <p className={`${styles.dynamicStatus} ${styles.dynamicError}`}>{state.error}</p>;
    return <section className={`${styles.dynamicBlock} ${styles.contentBlock}`}>
        {block.heading && <h2 className="boldHeading center">{block.heading}</h2>}
        {!state.fares.length && <p className={styles.dynamicStatus}>No flight fares are currently available.</p>}
        {state.fares.map((fare, fareIndex) => {
            const rows = normalizeRows(fare);
            const [headers = [], ...bodyRows] = rows;
            const columnCount = Math.max(headers.length, ...bodyRows.map(row => row.length), 1);

            return <div className={styles.flightFareTableWrap} key={fare.id || fareIndex}>
                <table className={styles.flightFareTable}>
                    <thead>
                        {fare.title && <tr>
                            <th className={styles.flightFareTitle} colSpan={columnCount}>{fare.title}</th>
                        </tr>}
                        {!!headers.length && <tr className={styles.flightFareHeader}>
                            {headers.map((cell, cellIndex) => <th key={cellIndex}>{cell}</th>)}
                        </tr>}
                    </thead>
                    <tbody>
                        {bodyRows.map((row, rowIndex) => <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>;
        })}
    </section>;
}
