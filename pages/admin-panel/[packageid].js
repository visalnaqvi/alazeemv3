import { getAdminPackages } from "@/services/getData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminPanelCard from "@/components/cards/adminPanelCard/adminPanelCard";

const PackagesList = ()=>{
    const router = useRouter();
    const {packageid} = router.query;
    const [packages , setPackages] = useState([]);
  
    useEffect(()=>{
        fetchData();
        console.log(packageid)
     },[packageid])

    const fetchData = async () =>{
        setPackages(await getAdminPackages(packageid));
    }
    return(
    <div className="margin">
    <div className="body-wrapper">
        {
            packages.map((tour,i)=>(
                <AdminPanelCard key={i} card={tour} />
            ))
        }
    </div>
    </div>
    )
}

export default PackagesList;