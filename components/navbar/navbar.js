import Image from "next/image"
import logo from "../../public/logo.png"
import styles from "./navBar.module.css"
import { ImFacebook2 } from "react-icons/im"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { checkStorageForAdminToken, checkStorageForToken } from "@/services/auth"
import { getNavLinks } from "@/services/getData"
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
    const [navLinks, setNavLinks] = useState({})
    const [user, setUser] = useState({})
    useEffect(() => {
        fetchNavLinks();
        let user = checkStorageForToken();
        setUser(user);
        let { packageid, singlePackageId } = router.query;

        setPackageId(packageid)
        setsinglePackageId(singlePackageId)
        const { asPath } = router;
        if (asPath.includes("admin-panel")) {
            setIsLoading(true);
            if (!user) {
                router.push("/")
            }

            if (!checkStorageForAdminToken()) {
                router.push("/")
            }
            setIsLoading(false);
        }

        setIsNew(singlePackageId == "new")
        switch (asPath) {
            case "/": setMenuState({
                home: true,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false
            });
                break;
            case "/hajj-and-umrah-packages": setMenuState({
                home: false,
                hajjUmrah: true,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false
            });
                break;
            case "/iraq-ziyarat-packages/iraq-ziyarat": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: true,
                holidayPackages: false,
                karbalaZiyarat: false
            });
                break;
            case "/iraq-ziyarat-packages/karbala-iraq-ziyarat": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: true
            });
                break;
            case "/holiday-packages": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: true,
                karbalaZiyarat: false
            });
                break;
            default: setMenuState({ home: false, hajjUmrah: false, iraqZiyarat: false, holidayPackages: false })
                break;

        }
    }, [router])

    const fetchNavLinks = async () => {
        let data = await getNavLinks();
        setNavLinks(data.filter(d => d.active == true))
    }

    return (
        <div> {isLoading ? <div className="mainLoading"><p>Loading...</p></div> : <div>
            <div className={`${styles.navBar} body-wrapper justify-between`} style={{ flexWrap: "nowrap" }}>
                <Image src={logo} width={180} height={60} alt="al azeem logo" />
                <div className={styles.mainMenu}>
                    <ul className="body-wrapper">
                        {
                            navLinks && navLinks.length > 0 && navLinks.map((link, i) => (
                                <li key={i} className={`${menuState[`${link.key}`] && styles.active}`}><Link href={`${link.link}`}>{link.title}</Link></li>
                            ))
                        }
                        {/* <li className={`${menuState["hajjUmrah"] && styles.active}`}><Link href="/hajj-and-umrah-packages">Hajj Umrah</Link></li>
                        <li className={`${menuState["iraqZiyarat"] && styles.active}`}><Link href="/iraq-ziyarat-packages/karbala-iraq-ziyarat">Iraq Ziyarat</Link></li>
                        <li className={`${menuState["holidayPackages"] && styles.active}`}><Link href="/holiday-packages">Holiday Packages</Link></li> */}
                    </ul>
                </div>
                <div className={`${(user && user.role == 'admin') ? styles.w40 : styles.w20} body-wrapper`}>
                    <div className={styles.facebook}>
                        <a className="body-wrapper" target="blank" href="https://www.facebook.com/AlAzeemTravels/"><ImFacebook2 /></a>
                    </div>
                    {user ? <button onClick={() => {
                        localStorage.removeItem("token")
                        router.reload()
                    }} className="primary-btn blue" style={{ marginTop: "0" }}>Sing Out</button> :
                        <Link href="/login"><button className="primary-btn blue" style={{ marginTop: "0" }}>Log In</button></Link>}

                    {user && user.role == 'admin' &&
                        <Link href="/admin-panel"><button className="primary-btn blue" style={{ marginTop: "0", marginLeft: "10px" }}>Admin Panel</button></Link>}
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