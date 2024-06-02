import { getPackageWithId } from "@/services/getData";
import { useEffect, useState } from "react";
import FlightForm from "@/components/forms/flightsForm/flightsForm";

const FlightsEdit = ({singlePackageId , packageid})=>{
    const [isLoading , setIsLoading] = useState(true);

    const [flightData , setflightData] = useState({
        id:"",
        order:"",
        title:"Add a new title",
        data:[["Sector" , "Travel Date" , "Flight No. & Time" , "Seats" , "Group Fare"],
        ["enter data" , "enter data" , "enter data" , "enter data" , "enter data"]
    ] 
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
        let details  = await getPackageWithId(packageid , singlePackageId);
        let data = []
        for(let i =0 ; i<details.number ; i++){
            data.push(details[`${i}`])
        }
        details.data = data;
        setflightData(details)
        setIsLoading(false);
    }

  
    return(
        <div>
            <h1 className="boldHeading" style={{margin:"0 20px"}}>Edit Information</h1>
            {isLoading ? <p className="boldHeading">Loading</p>:<FlightForm details={flightData} packageid={packageid} />}
        </div>
    )
}

export default FlightsEdit;