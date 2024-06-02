import { getFlightFare } from "@/services/getData";
import { useEffect, useState } from "react";
import styles from "./flight.module.css";

const FlightFare = ()=>{
   const [data , setData] = useState([])
   useEffect(()=>{
        fetchData();
   },[])

   const fetchData = async () =>{
    let details  = await getFlightFare();
    details.forEach(flight=>{
        let data = []
        for(let i =0 ; i<flight.number ; i++){
            data.push(flight[`${i}`])
        }
        flight.data = data;
    })
    setData(details)
   }

   useEffect(()=>{
    console.log("dataaaa" , data);
   },[data])
    return (
        <div className={`margin ${styles.wrapper}`}>
            {
               data.length>0 && data.map((row,i)=>(
                    <table className={styles.table} key={i}>
                        <tr className={styles.titleRow}>
                            <td className={styles.td} colSpan={5}>
                                {row.title}
                            </td>
                        </tr>
                        {
                            row.data.map((item , i)=>(
                                <tr className={`${styles.row} ${i==0 && styles.header}`} key={i}>
                                    {
                                        item.map((c,i)=>(
                                            <td className={styles.td} key={i}>{c}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </table>
               ))
            }
        </div>
    )
}

export default FlightFare;