import { getAdminPackages, getNavLinks } from "@/services/getData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminPanelCard from "@/components/cards/adminPanelCard/adminPanelCard";
import { updateOrder } from "@/services/updateData";
import Link from "next/link"

const PackagesList = ()=>{
    const router = useRouter();
    const {packageid} = router.query;
    const [packages , setPackages] = useState([]);
    const [order,setOrder] = useState([]);
  
    useEffect(()=>{
        fetchData();
     },[packageid])

    const fetchData = async () =>{
        if(packageid=="links"){
            setPackages(await getNavLinks());
            return;
        }
        setPackages(await getAdminPackages(packageid));
    }

    useEffect(()=>{
        var newOrder = [] 
        packages.forEach((tour)=>{
            newOrder.push(tour.id);
        })

        setOrder(newOrder);
    },[packages]);

    const onUpClick = async (currentIndex)=>{
        if(currentIndex<=0){
            return;
        }
        let idAtCurrentIndex = order[currentIndex];
        let idAtNewIndex = order[currentIndex-1];
        await updateOrder(currentIndex-1,idAtCurrentIndex,packageid);
        await updateOrder(currentIndex , idAtNewIndex,packageid);
        fetchData();
    }

    const onDownClick = async (currentIndex)=>{
        if(currentIndex>=order.length-1){
            return;
        }
        let idAtCurrentIndex = order[currentIndex];
        let idAtNewIndex = order[currentIndex+1];
        await updateOrder(currentIndex+1,idAtCurrentIndex,packageid);
        await updateOrder(currentIndex , idAtNewIndex,packageid);
        fetchData();
    }

    return(
    <div className="margin">
        
    <div className="body-wrapper justify-start">
        {
            packages.map((tour,i)=>(
                <AdminPanelCard onUpClick={onUpClick} onDownClick={onDownClick} key={i} index={i} card={tour} packageid={packageid} />
            ))
        }
    </div>
    </div>
    )
}

export default PackagesList;