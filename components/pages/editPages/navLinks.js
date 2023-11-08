import NavLinksForm from "@/components/forms/navLinks/navLinks";
import { getNavLinkFromId } from "@/services/getData";
import { getPageTitle } from "@/services/getData";
import { useEffect , useState } from "react";

const NavLinksEdit = ({linkId})=>{
    const [linkDetails , setLinkDetails] = useState({title:""});
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async ()=>{
        if(linkId=="hajjUmrahSetting"){
            setLinkDetails(await getPageTitle("hajjUmrah"))
            
        }else{
            setLinkDetails(await getNavLinkFromId(linkId));
        }
    }

    return(
        <div>
         {linkDetails.title &&   <NavLinksForm details={linkDetails} />}
        </div>
    )
}

export default NavLinksEdit;