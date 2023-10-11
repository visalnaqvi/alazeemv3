import { getVendorDetailsFromId } from "@/services/vendor";
import { useEffect, useState } from "react";
import VendorForm from "../../forms/vendorForm/venforForm";

const VendorEdit = ({vendorId})=>{

    const [isLoading , setIsLoading] = useState(true);

    const [vendorData , setVendorData] = useState({
        title:"Add a new vendor",
        packages:[],
        id:""
    });

    useEffect(()=>{
        fetchData()
    },[vendorId])

    const fetchData = async ()=>{
        setVendorData(await getVendorDetailsFromId(vendorId));
        setIsLoading(false);
    }

  
    return(
        <div>
            <h1 className="boldHeading" style={{margin:"0 20px"}}>Edit Vendor Information</h1>
            {isLoading ? <p className="boldHeading">Loading</p>:<VendorForm details={vendorData} />}
        </div>
    )
}

export default VendorEdit;