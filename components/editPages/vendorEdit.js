import { getVendorDetailsFromId } from "@/services/vendor";
import { useEffect, useState } from "react";
import VendorForm from "../forms/vendorForm/venforForm";

const VendorEdit = ({vendorId})=>{

    const [vendorData , setVendorData] = useState({
        title:"",
        packages:[""],
        id:""
    });

    useEffect(()=>{
        fetchData()
    },[vendorId])

    const fetchData = async ()=>{
        setVendorData(await getVendorDetailsFromId(vendorId));
    }

  
    return(
        <div>
            <h1 className="boldHeading" style={{margin:"0 20px"}}>Edit Vendor Information</h1>
            <VendorForm details={vendorData} />
        </div>
    )
}

export default VendorEdit;