import { useEffect, useState } from "react";
import styles from "./packageEdit.module.css";
import PackageCard from "@/components/cards/packageCard/packageCard";
import { getAllVendorsList, getVendorFromPackageId, handleNewVendor, handleVendorDelete } from "@/services/vendor";
import { RiDeleteBin5Fill } from "react-icons/ri"
import { addNewPackage, updatePackageData } from "@/services/updateData";
import { BsCheck } from "react-icons/bs"
import Toast from "@/components/notification/toast";
const PackageEditForm = ({ details, packageid }) => {
    const [vendors, setVendors] = useState([])
    const [allVendors, setAllVendors] = useState([])
    const [newVendor, setNewVendors] = useState([])
    const [toastMessage, setToastMessage] = useState({ msg: "" });
    const [newSelectedVendor, setNewSelectedVendor] = useState({ title: "" });
    const [newDetails, setNewDetails] = useState({
        title: "",
        price: "",
        order: "",
        hotels: ["",""],
        features: [
            "All Meals and Laudary",
            "Air Ticket and Visa",
            "Hotel 4/5 Bed Sharing",
            "Insurance and Ziyarat",
            "Round Trip Transport",
            "Flight by Saudi Air"
        ],
        date: ""
    })

    useEffect(() => {
        if (details.id) {
            setNewDetails(details);
        }
        getVendor();
    }, [details])

    const getVendor = async () => {
        setAllVendors(await getAllVendorsList())
    }


    useEffect(() => {
        let ven = []

        allVendors.forEach(p => {
            p.packages.forEach(t => {
                if (t.id == details.id) {
                    ven.push(p);
                }
            })
        })
        setVendors([...ven])


    }, [allVendors, details.id])

    const onClose = () => {
        setToastMessage({ msg: "" })
    }

   
    const handleSubmit = async () => {
        let msg;
        let newVendorsIds = []
        newVendor.forEach(v => {
            newVendorsIds.push(v.id)
        })
        console.log("newDateails" , newDetails)

        // if (newDetails.id) {
        //     msg = await updatePackageData(newDetails, packageid)
        // } else {
        //     msg = await addNewPackage(newDetails, packageid)
        // }
        // if (newVendorsIds.length == 0) {
        //     setToastMessage(msg);
        //     return;
        // }
        // msg = await handleNewVendor(newVendorsIds, { id: details.id, title: details.title })
        // setToastMessage(msg);

    }

    useEffect(() => {
        setNewSelectedVendor({ title: "" });
    }, [newVendor])

    

    useEffect(()=>{
      
        if(packageid=='iraq' && !newDetails.id){
            setNewDetails({...newDetails , type:" "})
        }
    },[packageid])

    return (
        <div className="body-wrapper">
            {toastMessage.msg && <Toast onClose={onClose} type={toastMessage.status} message={toastMessage.msg} />}
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="title">Packate Title</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, title: e.target.value }) }} className={styles.input} type="text" id="title" value={newDetails.title} placeholder="Enter Package Title" />
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="date">Departure Date</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, date: e.target.value }) }} className={styles.input} type="text" id="date" value={newDetails.date} placeholder="Enter Departure Date" />
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="feature">Features</label>
                        {
                            newDetails.features.map((feature, i) => (
                                <div key={i} className={styles.formItem}>
                                    <input onChange={(e) => {
                                        const updatedFeatures = [...newDetails.features];
                                        updatedFeatures[i] = e.target.value;
                                        setNewDetails({ ...newDetails, features: [...updatedFeatures] })
                                    }
                                    } className={styles.input} type="text" value={feature} placeholder="Enter New Feature" />
                                </div>
                            ))
                        }
                    </div>
                    {
                        newDetails.type &&
                        <div className={styles.formItem}>
                            <label className={styles.label}>Select Type</label>
                            <div className={styles.formItem}>
                                {
                                    newDetails.type == 'sunni' ?<input onChange={()=>setNewDetails({...newDetails , type:"sunni"})} defaultChecked  type="radio" id="sunni_type" name="package_type" value="sunni" /> :
                                    <input onChange={()=>setNewDetails({...newDetails , type:"sunni"})}  type="radio" id="sunni_type" name="package_type" value="sunni" />
                                }
                                <label className={styles.label} htmlFor="sunni_type">Sunni</label>
                            </div>
                            <div className={styles.formItem}>
                               {
                                newDetails.type == 'shia' ? <input onChange={()=>setNewDetails({...newDetails , type:"shia"})} defaultChecked type="radio" id="shia_type" name="package_type" value="shia" /> :
                                <input onChange={()=>setNewDetails({...newDetails , type:"shia"})} type="radio" id="shia_type" name="package_type" value="shia" />
                               }
                                <label className={styles.label} htmlFor="shia_type">Shia</label>
                            </div>
                        </div>
                    }
                    <input onChange={(e)=>{
                        
                        if(e.target.checked){
                            setNewDetails({...newDetails , hotels:[]})
                            return
                        }
                        setNewDetails({...newDetails , hotels:["",""]})
                    }} defaultChecked={!(details.hotels.length == 0)} type="checkbox" name="show_hotels" id="show_hotels" value={"hotels"} /><label className={styles.label} htmlFor="shia_type">Hide Hotels? (Check this to hide hotels)</label>
                    {
                       newDetails.hotels.length>=0 && newDetails.hotels.map((hotel, i) => (
                            <div key={i} className={styles.formItem}>
                                <label className={styles.label} htmlFor={`${i == 0 ? "makkah" : "madina"}-hotels`}>{i == 0 ? "Makkah" : "Madina"} Hotels</label>
                                <input onChange={(e) => {
                                    const updatedHotels = [...newDetails.hotels];
                                    updatedHotels[i] = e.target.value;
                                    setNewDetails({ ...newDetails, hotels: [...updatedHotels] })
                                }
                                } className={styles.input} type="text" id={`${i == 0 ? "makkah" : "madina"}-hotels`} value={hotel} placeholder="Enter New Hotel" />
                            </div>
                        ))
                    }

                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="price">Price</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, price: e.target.value }) }} className={styles.input} type="text" id="price" value={newDetails.price} placeholder="Enter Price" />
                    </div>
                    <div className={styles.formItem}>

                        <label className={styles.label} htmlFor="vendor">Selected Vendor</label>

                        {vendors.map((vendor, i) => (
                            <div key={i} id={vendor.id} className={`${styles.formItem} body-wrapper justify-start`}>

                                <select disabled className={`${styles.input} ${styles.optionsIinput}`} type="text" id={vendor.id} placeholder="Enter Vendor">
                                    <option selected value={vendor.title} id={vendor.id}>{vendor.title}</option>
                                </select>
                                <div className="delete-icon" id={vendor.id} onClick={async (e) => {
                                    await handleVendorDelete([e.target.id], details)
                                    let newVendors = vendors.filter((ven) => {
                                        return ven.id != e.target.id;
                                    });
                                    setVendors([...newVendors])
                                }}>
                                    <RiDeleteBin5Fill style={{ pointerEvents: "none" }} />
                                </div>
                            </div>))}

                        {newVendor.map((vendor, i) => (<div key={i} id={vendor.id} className={`${styles.formItem} body-wrapper justify-start`}>

                            <select disabled value={vendor.title} className={`${styles.input} ${styles.optionsIinput}`} id={vendor.id} placeholder="Enter Vendor">
                                <option selected value={vendor.title} id={vendor.id}>{vendor.title}</option>
                            </select>

                            <div className="delete-icon" id={vendor.id} onClick={(e) => {
                                let newVendors = newVendor.filter((ven) => {
                                    return ven.id != e.target.id;
                                });
                                setNewVendors([...newVendors])
                            }}>
                                <RiDeleteBin5Fill style={{ pointerEvents: "none" }} />
                            </div>
                        </div>))}

                        {
                            newVendor.length == 0 && vendors.length == 0 && <p className="content">No Vendor Selected</p>
                        }
                        <div>
                            <label className={styles.label} htmlFor="newVendor">Add a new Vendor</label>
                            <div className={`${styles.formItem} body-wrapper justify-start`}>
                                <select onChange={(e) => {
                                    if (e.target.selectedOptions[0].id == "default") {
                                        return;
                                    }
                                    setNewSelectedVendor({ id: e.target.selectedOptions[0].id, title: e.target.selectedOptions[0].value })
                                }} className={`${styles.input} ${styles.optionsIinput}`}>
                                    <option value="" id="default">Please Choose a Vendor</option>
                                    {
                                        allVendors.map((v, i) => (

                                            <option key={i} id={v.id} value={v.title}>{v.title}</option>


                                        ))
                                    }
                                </select>
                                <div className="check-icon" onClick={() => {
                                    let index = newVendor.findIndex(v => v.id == newSelectedVendor.id);
                                    if (index > -1) {
                                        return;
                                    }
                                    let index2 = vendors.findIndex(v => v.id == newSelectedVendor.id);
                                    if (index2 > -1) {
                                        return;
                                    }
                                    if (newSelectedVendor.title) {
                                        setNewVendors([...newVendor, newSelectedVendor])
                                    }
                                }}>
                                    <BsCheck style={{ pointerEvents: "none" }} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }} className="primary-btn blue">Submit</button>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
            </div>
            <PackageCard tour={newDetails} type={packageid} subType={newDetails.type ? newDetails.type : ""} />
        </div>
    )
}

export default PackageEditForm;