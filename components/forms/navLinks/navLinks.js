import Toast from "@/components/notification/toast"
import { useEffect, useState } from "react"
import styles from "./navLinks.module.css"
import { updateNavLink } from "@/services/updateData";
const NavLinksForm = ({details}) =>{

    const [toastMessage , setToastMessage] = useState({msg:""});
    const [newDetails , setNewDetails] = useState({})

    useEffect(()=>{
        setNewDetails(details);
    },[details])

    useEffect(()=>{
        console.log("someting",newDetails)
    },[newDetails])

    const onClose = () => {
        setToastMessage({ msg: "" })
    }

    const handleSubmit = async ()=>{
        console.log("someting final",newDetails)
        let msg = await updateNavLink(newDetails , "links" )
        setToastMessage(msg)
    }
    return(
        <div className="body-wrapper">
            {toastMessage.msg && <Toast onClose={onClose} type={toastMessage.status} message={toastMessage.msg} />}
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="title">Link Title</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, title: e.target.value }) }} className={styles.input} type="text" id="title" value={newDetails.title} placeholder="Enter Package Title" />
                    </div>
                    <div className="body-wrapper justify-start">
                        <div className={`${styles.formItem}`}>
                            <label className={styles.label} htmlFor="active-true">Active</label>
                            {details.active ? <input defaultChecked onChange={(e) => { setNewDetails({ ...newDetails, active: true }) }} className={styles.input} type="radio" id="active-true" name="status" /> : <input onChange={(e) => { setNewDetails({ ...newDetails, active: true }) }} className={styles.input} type="radio" id="active-true" name="status" />}
                        </div>
                        <div className={`${styles.formItem}`}>
                            <label className={styles.label} htmlFor="active-false">In Active</label>
                           {details.active ? <input onChange={(e) => { setNewDetails({ ...newDetails, active: false }) }} className={styles.input} type="radio" id="active-false" name="status" /> : <input defaultChecked onChange={(e) => { setNewDetails({ ...newDetails, active: false }) }} className={styles.input} type="radio" id="active-false" name="status" />}
                        </div>
                    </div>
                    <button className="primary-btn blue" onClick={(e)=>{
                        e.preventDefault();
                        handleSubmit();
                    }}>Submit</button>
                </form>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    )
}

export default NavLinksForm;