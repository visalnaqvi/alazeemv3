import Toast from "@/components/notification/toast"
import { useEffect, useState } from "react"
import styles from "./navLinks.module.css"
import { updateNavLink , updatePageSetting } from "@/services/updateData";
const NavLinksForm = ({details}) =>{

    const [toastMessage , setToastMessage] = useState({msg:""});
    const [newDetails , setNewDetails] = useState({})

    useEffect(()=>{
        setNewDetails(details);
    },[details])

    const onClose = () => {
        setToastMessage({ msg: "" })
    }

    const handleSettingSubmit = async ()=>{
        let msg = await updatePageSetting(newDetails)
        setToastMessage(msg)
    }

    const handleSubmit = async ()=>{
        let msg = await updateNavLink(newDetails , "links" )
        setToastMessage(msg)
    }
    return(
        <div className="body-wrapper">
            {toastMessage.msg && <Toast onClose={onClose} type={toastMessage.status} message={toastMessage.msg} />}
            <div className={styles.wrapper}>
               {details.id=="hajjUmrahSetting"? 
                <form>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="dulexTitle">Deluxe Title</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, dulexTitle: e.target.value }) }} className={styles.input} type="text" id="dulexTitle" value={newDetails.dulexTitle} placeholder="Enter Title" />
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="ecoTitle">Economy Title</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, ecoTitle: e.target.value }) }} className={styles.input} type="text" id="ecoTitle" value={newDetails.ecoTitle} placeholder="Enter Title" />
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="ramzanTitle">Ramzan Title</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, ramzanTitle: e.target.value }) }} className={styles.input} type="text" id="ramzanTitle" value={newDetails.ramzanTitle} placeholder="Enter Title" />
                    </div>
                    <div className="body-wrapper justify-start">
                        <div className={`${styles.formItem}`}>
                            <label className={styles.label} htmlFor="showCategory-true">Show Category</label>
                            {details.showCategory ? <input defaultChecked onChange={(e) => { setNewDetails({ ...newDetails, showCategory: true }) }} className={styles.input} type="radio" id="showCategory-true" name="showCategory" /> : <input onChange={(e) => { setNewDetails({ ...newDetails, showCategory: true }) }} className={styles.input} type="radio" id="showCategory-true" name="showCategory" />}
                        </div>
                        <div className={`${styles.formItem}`}>
                            <label className={styles.label} htmlFor="showCategory-false">Do not show category</label>
                           {details.showCategory ? <input onChange={(e) => { setNewDetails({ ...newDetails, showCategory: false }) }} className={styles.input} type="radio" id="showCategory-false" name="showCategory" /> : <input defaultChecked onChange={(e) => { setNewDetails({ ...newDetails, showCategory: false }) }} className={styles.input} type="radio" id="showCategory-false" name="showCategory" />}
                        </div>
                    </div>
                    <div className="body-wrapper justify-start">
                        <div className={`${styles.formItem}`}>
                            <label className={styles.label} htmlFor="isEcoTop-true">Show Economy On Top</label>
                            {details.isEcoTop ? <input defaultChecked onChange={(e) => { setNewDetails({ ...newDetails, isEcoTop: true }) }} className={styles.input} type="radio" id="isEcoTop-true" name="topRow" /> : <input onChange={(e) => { setNewDetails({ ...newDetails, isEcoTop: true }) }} className={styles.input} type="radio" id="isEcoTop-true" name="topRow" />}
                        </div>
                        <div className={`${styles.formItem}`}>
                            <label className={styles.label} htmlFor="isEcoTop-false">Show Deluxe On Top</label>
                           {details.isEcoTop ? <input onChange={(e) => { setNewDetails({ ...newDetails, isEcoTop: false }) }} className={styles.input} type="radio" id="isEcoTop-false" name="topRow" /> : <input defaultChecked onChange={(e) => { setNewDetails({ ...newDetails, isEcoTop: false }) }} className={styles.input} type="radio" id="isEcoTop-false" name="topRow" />}
                        </div>
                    </div>
                    <button className="primary-btn blue" onClick={(e)=>{
                        e.preventDefault();
                        handleSettingSubmit();
                    }}>Submit</button>
                </form>:





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



                }
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    )
}

export default NavLinksForm;