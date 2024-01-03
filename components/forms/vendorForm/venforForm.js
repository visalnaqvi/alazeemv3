import { useEffect, useState } from "react";
import styles from "./vendorForm.module.css"

import { RiDeleteBin5Fill } from "react-icons/ri"
import { getIraqPackages, getUmrahPackages } from "@/services/getData";
import { addNewVendor, updateVendor } from "@/services/vendor";
import { BsCheck } from "react-icons/bs"
import Toast from "@/components/notification/toast";
const VendorForm = ({ details }) => {

    const [newDetails, setNewDetails] = useState({
        title: "",
        packages: [],
        id: ""
    });

    const [tourPackages, setTourPackages] = useState([]);
    const [addedPackages, setAddedPackages] = useState([]);
    const [newAddedPackge, setnewAddedPackge] = useState({ title: "" });

    const [toastMsg, setToastMsg] = useState({ msg: "" });
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let umrahPackages = await getUmrahPackages();
            let iraqPackage = await getIraqPackages("all");
            let finalPakacges = [];
            umrahPackages.forEach((p) => {
                finalPakacges.push(p)
            })

            iraqPackage.forEach((p) => {
                finalPakacges.push(p);
            })
            if(details.packages && details.packages.length>0){
                details.packages.forEach(p=>{
                    let index = finalPakacges.findIndex(fp => fp.id == p.id)
                    p.title = finalPakacges[index].title;
                })
            }
            setTourPackages(finalPakacges)
            setNewDetails(details)
        } catch (err) {
            if (err) {
                console.log(err)
                return setToastMsg({ status: "warning", msg: "Something went wrong cannot get data from databse" })
            }
        }


    }



    const handleSubmit = async () => {
        
        let oldP = newDetails.packages;
        let newP = addedPackages;
        if(newAddedPackge.title){
            newP = [...newP , newAddedPackge]
        }
        let finalP = []
        if(oldP){
            oldP.forEach(p => finalP.push(p))
        }
        if(newP){
            newP.forEach(p => finalP.push(p))
        }

        setAddedPackages([])
        let datatoSend = { ...newDetails };

        datatoSend.packages = [...finalP];
     

          let msg = newDetails.id ? await updateVendor(datatoSend) : await addNewVendor(datatoSend)

        setToastMsg(msg);

        setNewDetails({ ...newDetails, packages: [...finalP] });

    }

    useEffect(() => {
        setnewAddedPackge({ title: "" })
    }, [addedPackages]);

    const onClose = (() => {
        setToastMsg({ msg: "" })
    })

    return (
        <div className="body-wrapper">
            {toastMsg.msg && <Toast message={toastMsg.msg} type={toastMsg.status} onClose={onClose} />}
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="title">Vendor Name</label>
                        <input onChange={(e) => { setNewDetails({ ...newDetails, title: e.target.value }) }} className={styles.input} type="text" id="title" value={newDetails.title} placeholder="Enter Vendor Name" />
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.label}>Packages</label>

                        {
                            newDetails.packages && newDetails.packages.map((tour, i) => (
                                <div key={i} className={styles.formItem}>
                                    <div className="body-wrapper justify-start">
                                        <select disabled className={`${styles.input} ${styles.optionsIinput}`} id={tour.id} placeholder="Enter New Package">

                                            <option key={i} value={tour.title} id={tour.id}>{tour.title}</option>


                                        </select>

                                        <div className="delete-icon" id={tour.id} onClick={(e) => {
                                            let newPackages = newDetails.packages.filter((p) => {
                                                return p.id != e.target.id;
                                            });
                                            setNewDetails({ ...newDetails, packages: [...newPackages] })
                                        }}>
                                            <RiDeleteBin5Fill style={{ pointerEvents: "none" }} />
                                        </div>
                                    </div>
                                </div>

                            ))
                        }

                        {
                            addedPackages && addedPackages.map((tour, i) => (
                                <div key={i} className={styles.formItem}>
                                    <div className="body-wrapper justify-start">
                                        <select disabled className={`${styles.input} ${styles.optionsIinput}`} id={tour.id} placeholder="Enter New Package">

                                            <option key={i} value={tour.title} id={tour.id}>{tour.title}</option>


                                        </select>

                                        <div className="delete-icon" id={tour.id} onClick={(e) => {
                                            let newPackages = addedPackages.filter((p) => {
                                                return p.id != e.target.id;
                                            });
                                            setAddedPackages([...newPackages])
                                        }}>
                                            <RiDeleteBin5Fill style={{ pointerEvents: "none" }} />
                                        </div>
                                    </div>
                                </div>

                            ))
                        }

                        <div>
                            <label className={styles.label} htmlFor="newVendor">Add a new Package</label>
                            <div className={`${styles.formItem} body-wrapper justify-start`}>
                                <select onChange={(e) => {
                                    if (e.target.selectedOptions[0].id == "default") {
                                        return;
                                    }
                                    setnewAddedPackge({ id: e.target.selectedOptions[0].id, title: e.target.selectedOptions[0].value })
                                }} className={`${styles.input} ${styles.optionsIinput}`}>
                                    <option value="" id="default">Please Choose a Package to Add</option>
                                    {
                                        tourPackages.map((v, i) => (

                                            <option key={i} id={v.id} value={v.title}>{v.title}</option>


                                        ))
                                    }
                                </select>
                                <div className="check-icon" onClick={() => {
                                    if (addedPackages?.length != 0) {
                                        let index = addedPackages.findIndex(v => v.id == newAddedPackge.id);
                                        if (index > -1) {
                                            return;
                                        }
                                    }
                                    if (newDetails.packages && newDetails.packages.length != 0) {
                                        let index2 = newDetails.packages.findIndex(v => v.id == newAddedPackge.id);
                                        if (index2 > -1) {
                                            return;
                                        }
                                    }
                                    if (newAddedPackge.title) {
                                        setAddedPackages([...addedPackages, newAddedPackge])
                                    }
                                }}>
                                    <BsCheck style={{ pointerEvents: "none" }} />
                                </div>
                            </div>
                        </div>

                    </div>
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

export default VendorForm;