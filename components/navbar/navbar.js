import Image from "next/image"
import logo from "../../public/logo.png"
import styles from "./navBar.module.css"
import { ImFacebook2 } from "react-icons/im"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { checkStorageForAdminToken, checkStorageForToken } from "@/services/auth"
const NavBar = () => {

    const [menuState, setMenuState] = useState({
        home: false,
        hajjUmrah: false,
        iraqZiyarat: false,
    })

    const router = useRouter()
    const [packageid, setPackageId] = useState("")
    const [singlePackageId, setsinglePackageId] = useState("")
    const [isNew, setIsNew] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState({})
    useEffect(() => {
        let user = checkStorageForToken();
        setUser(user);
        let { packageid, singlePackageId } = router.query;

        setPackageId(packageid)
        setsinglePackageId(singlePackageId)
        const { pathname } = router;
        if (pathname.includes("admin-panel")) {
            setIsLoading(true);
            if (!user) {
                router.push("/")
            }

            if (!checkStorageForAdminToken()) {
                router.push("/")
            }
            setIsLoading(false);
        }
        console.log("pllplp", pathname)
        setIsNew(singlePackageId == "new")
        switch (pathname) {
            case "/": setMenuState({ home: true, hajjUmrah: false, iraqZiyarat: false, holidayPackages: false });
                break;
            case "/hajj-and-umrah-packages": setMenuState({
                home: false,
                hajjUmrah: true,
                iraqZiyarat: false, holidayPackages: false
            });
                break;
            case "/iraq-ziyarat-packages/[type]": setMenuState({ home: false, hajjUmrah: false, iraqZiyarat: true, holidayPackages: false });
                break;
            case "/holiday-packages": setMenuState({ home: false, hajjUmrah: false, iraqZiyarat: false, holidayPackages: true });
                break;
            default: setMenuState({ home: false, hajjUmrah: false, iraqZiyarat: false, holidayPackages: false })
                break;

        }
    }, [router])

    return (
      <div> {isLoading ?<div className="mainLoading"><p>Loading...</p></div>: <div>
            <div className={`${styles.navBar} body-wrapper justify-between`} style={{ flexWrap: "nowrap" }}>
                <Image src={logo} width={120} height={50} alt="al azeem logo" />
                <div className={styles.mainMenu}>
                    <ul className="body-wrapper">
                        <li className={`${menuState["home"] && styles.active}`}><Link href="/">Home</Link></li>
                        <li className={`${menuState["hajjUmrah"] && styles.active}`}><Link href="/hajj-and-umrah-packages">Hajj Umrah</Link></li>
                        <li className={`${menuState["iraqZiyarat"] && styles.active}`}><Link href="/iraq-ziyarat-packages/karbala-iraq-ziyarat">Iraq Ziyarat</Link></li>
                        <li className={`${menuState["holidayPackages"] && styles.active}`}><Link href="/holiday-packages">Holiday Packages</Link></li>
                    </ul>
                </div>
                <div className="body-wrapper" style={{ width: "20%" }}>
                    <div className={styles.facebook}>
                        <a className="body-wrapper" target="blank" href="https://www.facebook.com/AlAzeemTravels/"><ImFacebook2 /></a>
                    </div>
                    {user ? <button onClick={() => {
                        localStorage.removeItem("token")
                        router.reload()
                    }} className="primary-btn blue" style={{ marginTop: "0" }}>Sing Out</button> :
                        <Link href="/login"><button className="primary-btn blue" style={{ marginTop: "0" }}>Log In</button></Link>}
                </div>
            </div>
            {packageid && <div className="body-wrapper justify-between margin">
                <button onClick={() => { router.back() }} style={{ float: "right", marginBottom: "20px" }} className="primary-btn blue">Back</button>
                {!isNew && !singlePackageId && <Link href={`${packageid}/new`}><button style={{ marginBottom: "20px" }} className="primary-btn blue">Add New {packageid == "vendors" ? "Vendor" : "Package"}</button></Link>}
            </div>}
        </div>}</div>
    )
}

export default NavBar