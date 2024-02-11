
import { useEffect, useState } from "react"
import { getIraqPackages } from "../../services/getData.js"

import Toast from "@/components/notification/toast.js"
import ShiaZiyarat from "@/components/pages/iraqPages/shiaPakcages.js"
import { useRouter } from "next/router.js"
import SunniPackages from "@/components/pages/iraqPages/sunniPackages.js"
import Head from "next/head.js"
const IraqZiyarat = () => {
    const [iraqPackages, setIraqPackages] = useState([])
    const [toastMsg, setToastMsg] = useState({ msg: "" })
    const [isLoading , setIsLoading] = useState(true);
    const router = useRouter();

    const { type } = router.query;

    const isShia = type == "karbala-iraq-ziyarat";
    const title = type == "karbala-iraq-ziyarat"?"Karbala Ziyarat":"Iraq Ziyarat";
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
            <Head>
                <title>{title}</title>
                <meta name="description" content="Explore the sacred journey of Ziyarat in Iraq with our exclusive tour package. Discover historical landmarks, spiritual sites, and enriching experiences. Join us on this pilgrimage for a meaningful and memorable Ziyarat tour in Iraq. Book your package today for an unforgettable spiritual journey." />
                <meta name="keywords" content="Iraq Ziyarat,
Iraq Ziarat,
Iraq Ziyarat Travel Agent,
Iraq Ziyarat Packages,
Iraq Ziyarat Places,
Iraq Ziyarat Visa for India,
Iraq Ziyarat Packages From India,
Iraq Ziyarat Packages from Delhi,
Iran Iraq Ziyarat Package,
Syria Ziyarat package,
Iraq ziyarat Packages from Delhi,
Iraq Ziarat Package from Delhi,
Iran Iraq Ziarat Package from Delhi,
Shaikh Abdul Qadir Jilani (RA) Ziyarat,
Ziyarat Ghous E Azam,
Imam Hussain Roza,
Imam Hussain shrine Ziyarat,
Best Ziyarat Package,
Best Tour Operator,
Ziyarat kafila from Delhi,
Iraq Ziyarat packages from Lucknow,
Iraq Ziyarat Package from Jammu and Srinagar,
Iraq Ziyarat package from Jaipur,
Iraq Ziyarat package from Kolkata,
Iraq Ziyarat package from Punjab,
iraq ziyarat packages,
iraq ziyarat tours,
ziyarat iraq package,
baghdad ziyarat,
iran iraq ziyarat packages from india,
umrah and karbala package,
baghdad sharif and umrah package,
iraq ziarat packages,
ziyarat trips to iraq,
umrah with iraq ziyarat tour packages,
iran iraq ziyarat tour,
iran iraq ziyarat,
iraq ziyarat tours from india,
umrah karbala package,
karbala group,
karbala ziyarat,
karbala group package,
arbaeen package"></meta>
            </Head>
       {isLoading?<p className="boldHeading">Loading...</p>: <div>
            {toastMsg.msg && <Toast message={toastMsg.msg} type={toastMsg.status} onClose={onClose} />}

            {isShia ? <ShiaZiyarat fetchData={fetchData} iraqPackages={iraqPackages} /> : <SunniPackages fetchData={fetchData} iraqPackages={iraqPackages} />}
            <br></br>
        </div>}
        </div>
    )
}

export default IraqZiyarat;