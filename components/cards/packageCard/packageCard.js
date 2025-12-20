import FlightPopUp from "@/components/flights/container/popUp";
import IconList from "../../lists/iconList";
import styles from "./packageCard.module.css"
import { useEffect, useState } from "react";
import { getPackageVendor } from "@/services/vendor";
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import Link from "next/link";
import { checkStorageForAdminToken } from "@/services/auth";
import { deletePackage } from "@/services/deleteData";

const PackageCard = ({ getSectionTitle , tour, type, subType, fetchData }) => {

    const [isFlightsOpen, setIsFlightsOpen] = useState(false)
    const [vendors, setVendors] = useState({ title: "" })
    const [vendorString, setVendorString] = useState("No Vendor")
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(checkStorageForAdminToken());
        fetchVendors();
    }, [])

    const fetchVendors = async () => {
        setVendors(await getPackageVendor(tour.id))
    }

    useEffect(() => {
        if (vendors.length > 0) {
            let vendorString = "";
            vendors.forEach(ven => { vendorString = vendorString + ven.title + " , " });
            setVendorString(vendorString)
        }
    }, [vendors])

    const formatDate = (isoDate) => {
        if (!isoDate) return "";

        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short", // "Jul" instead of "07"
            year: "numeric",
        }); // Convert spaces to dashes like 01-Jul-2025
    };

    return (

        <div className={`${styles.card}  ${styles[type]} ${styles[subType]}`}>

            {isAdmin && <div className={`${styles.quickEditBar} body-wrapper`}>
                <div className={styles.vendorList}>
                    {vendorString && <p style={{ cursor: "pointer" }} title={vendorString}>View Vendors</p>}
                </div>
                <div className={`${styles.iconBox} body-wrapper`}>
                    <Link href={`/admin-panel/${type}/${tour.id}`}> <div className={`${styles.icon} ${styles.editIcon}`}><AiFillEdit style={{ pointerEvents: "none" }} /></div></Link>
                    <div onClick={async () => {
                        if (window.confirm("pkka delte krna hai?")) {
                            await deletePackage(tour.id, type)
                            fetchData()
                        }
                    }} className={`${styles.icon} ${styles.deleteIcon}`}><AiFillDelete style={{ pointerEvents: "none" }} /></div>
                </div>
            </div>}
            <div className={styles.content}>
                <h2>{tour.title}</h2>
                <h3 className={styles.callToActionYellow}>Date: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</h3>
                <IconList items={tour.features} isBold={tour.isBold} />
            </div>
            {tour.hotels.length != 0 && <div className={styles.beforeFooter}>
                <div className={styles.beforeFooterSection}>
                    <p className={styles.beforeHeaderSectionHeading}>Makkah Hotel</p>
                    <p className={styles.beforeHeaderSectionContent}>{tour.hotels[0]}</p>
                </div>
                <div className={styles.beforeFooterSection}>
                    <p className={styles.beforeHeaderSectionHeading}>Madina Hotel</p>
                    <p className={styles.beforeHeaderSectionContent}>{tour.hotels[1]}</p>
                </div>
                {tour.sectionData && tour.sectionData.length > 2 && <button onClick={() => {
                    if (tour.flights?.length > 0) {
                        setIsFlightsOpen(true);
                    }
                }} className={styles.flightButton}>View Flight</button>}
            </div>}
            {tour.pricing && tour.pricing.length != 0 && <div className={styles.beforeFooter}>
                {tour.pricing.map((p, i) => (
                    <div key={i} className={styles.beforeFooterSection}>
                        <p className={styles.pricingHeading}>{p.room}</p>
                        <p className={styles.pricingFinal}> {p.amount}</p>
                        <p className={styles.pricingAmountMo}>{p.tax} {p.amtTax}</p>
                        <p className={styles.pricingAmount}>{p.tax} <br></br> {p.amtTax}</p>
                    </div>
                ))}

            </div>}
            {getSectionTitle && tour.sectionData && tour.sectionData.length > 0 ? <div className={styles.footer}>
                <div className={styles.sectionWrapper}>
                    {
                        tour.sectionData.map((d,i)=>(
                            <div key={i} className={styles.sectionCard} style={i!=0?{borderLeft:"1px solid #ffffff90" , paddingLeft:"15px"}:{}}>
                                <p className={styles.sectionTitle}>{getSectionTitle(d.id)}</p>
                                <p className={styles.sectionPrice}>{d.price}</p>
                            </div>
                        ))
                    }
                </div>
                {tour?.sectionData?.length <= 2 && <button onClick={() => {
                    if (tour.flights?.length > 0) {
                        setIsFlightsOpen(true);
                    }
                }} className={styles.footerButton}>View Flight</button>}
            </div>:
            <div className={styles.footer}>
                <p className={styles.footertext}>{tour.price}</p>
                <button onClick={() => {
                    if (tour.flights?.length > 0) {
                        setIsFlightsOpen(true);
                    }
                }} className={styles.footerButton}>View Flight</button>
            </div>}
            {isFlightsOpen && <FlightPopUp setIsFlightsOpen={setIsFlightsOpen} details={tour.flights} />}
        </div>

    )
}

export default PackageCard;