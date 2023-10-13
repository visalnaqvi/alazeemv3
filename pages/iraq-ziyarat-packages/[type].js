
import { useEffect, useState } from "react"
import { getIraqPackages } from "../../services/getData.js"

import Toast from "@/components/notification/toast.js"
import ShiaZiyarat from "@/components/pages/iraqPages/shiaPakcages.js"
import { useRouter } from "next/router.js"
import SunniPackages from "@/components/pages/iraqPages/sunniPackages.js"
const IraqZiyarat = () => {
    const [iraqPackages, setIraqPackages] = useState([])
    const [toastMsg, setToastMsg] = useState({ msg: "" })
    const [isLoading , setIsLoading] = useState(true);
    const router = useRouter();

    const { type } = router.query;

    const isShia = type == "karbala-iraq-ziyarat";
    useEffect(() => {
        fetchData();
    }, [isShia])
    const onClose = () => {
        setToastMsg({ msg: "" })
    }
    const fetchData = async () => {
        try { 
            setIraqPackages(await getIraqPackages(isShia ? "shia" : "sunni")); 
        setIsLoading(false)
    }
        catch (err) {
            if (err) {
                setToastMsg({ status: "warning", msg: "Something went wrong cannot get package" })
            }
        }
    }
    return (
        <div>
       {isLoading?<p className="boldHeading">Loading...</p>: <div>
            {toastMsg.msg && <Toast message={toastMsg.msg} type={toastMsg.status} onClose={onClose} />}

            {isShia ? <ShiaZiyarat fetchData={fetchData} iraqPackages={iraqPackages} /> : <SunniPackages fetchData={fetchData} iraqPackages={iraqPackages} />}
            <br></br>
        </div>}
        </div>
    )
}

export default IraqZiyarat;