import AdminPanelCard from "@/components/cards/adminPanelCard/adminPanelCard";
import { checkStorageForAdminToken } from "@/services/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminPanel = ()=>{
   
   
    
    const data = [
        {
            title:"Umrah Packages",
            link:"hajjUmrah"
        },
        {
            title:"Iraq Ziyarat Packages",
            link:"iraq"
        },
        {
            title:"Holiday Packages",
            link:"holiday"
        },
        {
            title:"Vendors",
            link:"vendors"
        },
        {
            title:"Header Links",
            link:"links"
        },
        {
            title:"Page Setting",
            link:"page-setting"
        }
    ]
    return(
        <div className="margin">
        <div className="body-wrapper justify-start">
            {
                data.map((card,i)=>(
                    <AdminPanelCard key={i} card={card} />
                ))
            }
        </div>
        <br></br>
        </div>
    )
}

export default AdminPanel;