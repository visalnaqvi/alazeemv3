import { useRouter } from "next/router";
import { useEffect } from "react";

const TourPckages = ()=>{
    const router = useRouter();
    useEffect(()=>{
        const {packageid , tourid} = router.query;
        console.log("packageId",packageid);
        console.log("tourid",tourid);
    })
    return(
        <div>
            Hello
        </div>
    )
}

export default TourPckages;