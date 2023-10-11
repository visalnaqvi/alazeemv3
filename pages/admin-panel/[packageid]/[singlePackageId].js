import TourPackagesEdit from "@/components/pages/editPages/tourPackagesEdit";
import VendorEdit from "@/components/pages/editPages/vendorEdit";
import { useRouter } from "next/router";
import { useEffect } from "react";


const SinglePackgeEdit = ()=>{
    const router = useRouter();
    const {packageid , singlePackageId} = router.query;

    
    switch(packageid){
        case "hajjUmrah" : return (<TourPackagesEdit packageid={packageid} singlePackageId={singlePackageId}/>);
        case "iraq" : return (<TourPackagesEdit packageid={packageid} singlePackageId={singlePackageId} />);
        case "vendors" : return(<VendorEdit vendorId={singlePackageId} />)
        default : return (<h1>htt bsdk</h1>);
    }

   
}

export default SinglePackgeEdit;