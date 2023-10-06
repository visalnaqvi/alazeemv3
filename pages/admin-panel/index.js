import AdminPanelCard from "@/components/cards/adminPanelCard/adminPanelCard";
import { useEffect } from "react";

const AdminPanel = ()=>{
    
    const data = [
        {
            title:"Umrah Packages",
            link:"/hajjUmrah"
        },
        {
            title:"Iraq Ziyarat Packages",
            link:"/iraq"
        },
        {
            title:"Holiday Packages",
            link:"/holiday"
        }
    ]
    return(
        <div className="margin">
        <div className="body-wrapper">
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