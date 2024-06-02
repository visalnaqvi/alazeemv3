import { useEffect, useState } from "react";
import { addNewPackage, updatePackageData } from "@/services/updateData";
import styles from "./flightsForm.module.css"
import { RiDeleteBin5Fill } from "react-icons/ri"
import Toast from "@/components/notification/toast";
import { FaArrowAltCircleUp , FaArrowAltCircleDown } from "react-icons/fa";
const FlightForm = ({ details, packageid }) => {

    const [newDetails, setNewDetails] = useState({
        id:"",
        title: "",
        order:"",
        data: []
    });


    const [toastMsg, setToastMsg] = useState({ msg: "" });
    
    const handleSubmit = async (data) => {
        console.log(newDetails)
        let msg={msg:"something"};
        let finalData = {
            title:newDetails.title,
            number:newDetails.data.length,
            order:"",
            id:newDetails.id
        }
        newDetails.data.forEach((d , i)=>{
            finalData[`${i}`]=d
        })

        console.log("final data" , finalData)
        if (newDetails.id) {
            msg = await updatePackageData(finalData, packageid)
        } else {
            msg = await addNewPackage(finalData, packageid)
        }
      
        setToastMsg(msg);

    }

    useEffect(() => {
        setNewDetails(details);
   
}, [details])

    const onClose = (() => {
        setToastMsg({ msg: "" })
    })

    return (
        <div className="body-wrapper">
            {toastMsg.msg && <Toast message={toastMsg.msg} type={toastMsg.status} onClose={onClose} />}
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="title">Title</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, title: e.target.value }) }} className={styles.input} type="text" id="title" value={newDetails.title} placeholder="Add New Title" />
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.label}>Flights</label>

                        {
                            newDetails.data && newDetails.data.map((row, Ri) => (
                                <div key={Ri} className="body-wrapper justify-start">
                                    {
                                        row.map((col , i)=>(
                                            <div className={styles.inputWrapper} key={i} >
                                                <input className={styles.input} name="col" type="text" value={col} onChange={(e)=>{
                                                    let updatedData = newDetails.data;
                                                    updatedData[Ri][i] = e.target.value
                                                    setNewDetails({...newDetails , data:updatedData})
                                                }} />
                                            </div>
                                        ))
                                    }
                                    <div className="delete-icon" onClick={()=>{
                                        if(Ri>0){
                                            let newData = newDetails.data;
                                            let a = newData[Ri]
                                            let b = newData[Ri-1]
                                            newData[Ri] = b
                                            newData[Ri-1] = a
                                            setNewDetails({...newDetails , data:newData})
                                        }
                                    }}><FaArrowAltCircleUp style={{ pointerEvents: "none" }} /></div>
                                    <div className="delete-icon" onClick={()=>{
                                        if(Ri<newDetails.data.length-1){
                                            let newData = newDetails.data;
                                            let a = newData[Ri]
                                            let b = newData[Ri+1]
                                            newData[Ri] = b
                                            newData[Ri+1] = a
                                            setNewDetails({...newDetails , data:newData})
                                        }
                                    }}><FaArrowAltCircleDown style={{ pointerEvents: "none" }} /></div>
                                            <div className="delete-icon" onClick={() => {
                                            let newData = newDetails.data
                                            newData.splice(Ri, 1);
                                            setNewDetails({...newDetails , data:newData})
                                        }}>
                                            <RiDeleteBin5Fill style={{ pointerEvents: "none" }} />
                                        </div>
                                </div>
                            ))
                        }

                    </div>
                    <button style={{marginRight:"20px"}} className="primary-btn blue" onClick={(e) => {
                        e.preventDefault();
                        let newData = [...newDetails.data , ["sector" , "date" ,"flight" , "seats" , "fare"]]
                        setNewDetails({...newDetails , data:newData})
                    }}>Add New Row</button>
                    <button className="primary-btn blue" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>Submit</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
            </div >
        </div >
    )
}

export default FlightForm;