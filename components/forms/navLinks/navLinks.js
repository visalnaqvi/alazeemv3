import Toast from "@/components/notification/toast"
import { useEffect, useState } from "react"
import styles from "./navLinks.module.css"
import { addNewPackage, updateNavLink , updateOrder, updatePackageData, updatePageSetting } from "@/services/updateData";
import { getAvailableSections } from "@/services/getData";
import { deletePackage } from "@/services/deleteData";
const NavLinksForm = ({details}) =>{

    const [toastMessage , setToastMessage] = useState({msg:""});
    const [newDetails , setNewDetails] = useState([])
    const [updatedTtitle , setUpdatedTtitle] = useState("")
    const [updatedOrder , setUpdatedOrder] = useState(0)
    
    useEffect(()=>{
        // setNewDetails(details);
        getSections()
    },[details])

    const getSections = async () =>{
        setNewDetails(await getAvailableSections())
    }

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
                <div>
                              <button className="primary-btn blue" onClick={async (e)=>{
                                e.preventDefault()
                let msg = await addNewPackage({title:"New Category" , order:parseInt(newDetails.length+1)} , "sections")
                setNewDetails(await getAvailableSections())
                setToastMessage(msg)
            }}
                >Add New Category</button>
                    {
                        Array.isArray(newDetails) && newDetails.map((section , index)=>(
                            <form key = {index} style={{backgroundColor:"#eeeeee" , padding:"20px" , margin:"20px 0"}}>
                                <p>Category {index+1}</p>
                            <div className={styles.formItem}>
                                <label className={styles.label} htmlFor={section.title+"title"}>Title</label>
                                <input disabled={!section.active} onChange={(e) => {setUpdatedTtitle(e.target.value)}} className={styles.input} type="text" id={section.title+"title"} defaultValue={section.title} placeholder="Enter Title" />
                            </div>

                             <div className={styles.formItem}>
                                <label className={styles.label} htmlFor={section.title+"order"}>Order</label>
                                <input disabled={!section.active} onChange={(e) => {setUpdatedOrder(parseInt(e.target.value))}} className={styles.input} type="text" id={section.title+"order"} defaultValue={section.order} placeholder="Enter Title" />
                            </div>
                       {section.active && <button className="primary-btn blue" disabled={!section.active} onClick={async (e)=>{
                                        e.preventDefault();
                                       let msg = await updatePackageData({title:updatedTtitle==""?section.title:updatedTtitle , order:updatedOrder==0?section.order:updatedOrder , id: section.id} , "sections");
                                       setToastMessage(msg)
                                       let data = newDetails.map(item => {
                                            if(item.id == section.id){
                                                item.active = false
                                                item.title = updatedTtitle
                                                item.order = updatedOrder
                                            }

                                            return item
                                        })
                                        setNewDetails(data)
                                    }}>Save</button>}
                            {section.active && <button style={{marginLeft:"10px"}}className="primary-btn red" disabled={!section.active}
                                onClick={async (e)=>{
                                    e.preventDefault()
                                    if(window.confirm("Confirm to delete")){
                                        let msg = await deletePackage(section.id , "sections")
                                        setNewDetails(await getAvailableSections())
                                        setToastMessage(msg)
                                    }
                                 
                                }}
                            >Delete</button>}
                                   {!section.active && <button className="primary-btn green" style={{marginLeft:"10px"}} onClick={(e)=>{
                                        e.preventDefault()
                                        let data = newDetails.map(item => {
                                            if(item.id == section.id){
                                                item.active = true
                                            }else{
                                                item.active = false
                                            }

                                            return item
                                        })
                                        setUpdatedOrder(0)
                                        setUpdatedTtitle("")
                                        setNewDetails(data)
                                        

                                    }}>Edit</button>}
                            </form>
                     
                        ))
                    }
                    {/* <div className={styles.formItem}>
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
                    }}>Submit</button> */}
                </div>:





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