import PackageEditForm from "@/components/forms/packageEdit/packageEdit";
import { getPackageWithId } from "@/services/getData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TourPackagesEdit = ({singlePackageId , packageid})=>{
    const [isLoading , setIsLoading] = useState(true);
    const [packageDetails , setPackageDetails] = useState({
        title:"Add a New Title Here",
        id:"",
        price:"",
        order:"",
        hotels:[],
        features:[
            "All Meals and Laudary",
            "Air Ticket and Visa",
            "Hotel 4/5 Bed Sharing",
            "Insurance and Ziyarat",
            "Round Trip Transport",
            "Flight by Saudi Air"
        ],
        date:""
    });
    useEffect(()=>{
        if(singlePackageId && singlePackageId != "new" && packageid){
            fetchData();
        }
        if(singlePackageId=="new"){
            setIsLoading(false);
        }
    },[packageid , singlePackageId])
    const fetchData = async ()=>{
        setPackageDetails(await getPackageWithId(packageid , singlePackageId))
        setIsLoading(false);
    }

    useEffect(()=>{
        console.log("package Details",packageDetails);
    })

    return(
        <div className="margin"> 
              {isLoading ? <p>Loading</p> : <PackageEditForm details={packageDetails} packageid={packageid} /> }        
        </div>
    )
}

export default TourPackagesEdit;