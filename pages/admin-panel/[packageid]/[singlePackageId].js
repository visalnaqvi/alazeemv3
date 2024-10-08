import TourPackagesEdit from "@/components/pages/editPages/tourPackagesEdit";
import VendorEdit from "@/components/pages/editPages/vendorEdit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavLinksEdit from "@/components/pages/editPages/navLinks";
import FlightsEdit from "@/components/pages/editPages/flightsEdit";

const SinglePackgeEdit = ()=>{
    const router = useRouter();
    const {packageid , singlePackageId} = router.query;

    
    switch(packageid){      
        case "hajjUmrah" : return (<TourPackagesEdit packageid={packageid} singlePackageId={singlePackageId}/>);
        case "turkey" : return (<TourPackagesEdit packageid={packageid} singlePackageId={singlePackageId}/>);
        case "iraq" : return (<TourPackagesEdit packageid={packageid} singlePackageId={singlePackageId} />);
        case "hajj" : return (<TourPackagesEdit packageid={packageid} singlePackageId={singlePackageId} />);
        case "vendors" : return(<VendorEdit vendorId={singlePackageId} />)
        case "links" : return(<NavLinksEdit linkId={singlePackageId} />)
        case "page-setting" : return(<NavLinksEdit linkId={singlePackageId} />)
        case "flight-fare" : return(<FlightsEdit packageid={packageid} singlePackageId={singlePackageId}/>)
        default : return (<h1>Page Not Found</h1>);
    }

   
}

export default SinglePackgeEdit;