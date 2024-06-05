
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const Input = ({styles , setNewDetails , newDetails , col , Ri , i})=>{
    const [isMenuVisible , setIsMenuVisible] = useState(false);
    return(
        <div className={styles.positionWrap}>
       {isMenuVisible && <div className={styles.numberWrapper}>
           <label className="label">Side</label><input className={styles.numberInput} type="number" />
           <br></br>
           <label className="label">Down</label><input className={styles.numberInput} type="number" />
        </div>}
        <div className="body-wrapper">
            <input className={styles.input}
             name="col"
              type="text" 
              value={col} 
              onChange={(e)=>{
                let updatedData = newDetails.data;
                updatedData[Ri][i] = e.target.value
                setNewDetails({...newDetails , data:updatedData})
            }}
            />
            <div className={styles.options} onClick={()=>{setIsMenuVisible(!isMenuVisible)}}>
           <SlOptionsVertical />
            </div>
            </div>
        </div>
    )
}

export default Input;