import Image from "next/image"
import logo from "../../public/logo.png"
import styles from "./navBar.module.css"
import { GiHamburgerMenu , GiCancel } from "react-icons/gi"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { checkStorageForAdminToken, checkStorageForToken } from "@/services/auth"
import { getNavLinks } from "@/services/getData"
import { IoSearch } from "react-icons/io5";
import { useWindowSize } from "@uidotdev/usehooks";
import ForExPopUp from "../flights/container/forexPopUp"
const NavBar = () => {

    const [menuState, setMenuState] = useState({
        home: false,
        hajjUmrah: false,
        iraqZiyarat: false,
    })


    const pages = [
       { key:"Home",link:"/"},
       { key:"Karbala Ziyarat",link:"/iraq-ziyarat-packages/karbala-iraq-ziyarat"},
       { key:"Hajj Umrah",link:"/umrahPackage"},
       { key:"Iraq Ziyarat",link:"/iraq-ziyarat-packages/iraq-ziyarat"},
       { key:"Holiday Packages",link:"/holiday-packages"},
       { key:"Hajj Package",link:"/hajjPackage"},
       { key:"Flight Fare",link:"/flight-fare"},
       { key:"Visa Assistance",link:"/visa"},
       { key:"Turkey",link:"/turkey-packages"},
       { key:"FOREX",link:"/forex"},
    ]
const [isSuggVis,setIsSuggVis] = useState(false)

const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    const filteredPages = pages.filter(p => p.key.toLowerCase().includes(searchValue));
    setSearchedPages(filteredPages);
    setIsSuggVis(true)
  };

    const [searchedPages , setSearchedPages] = useState(pages)


    const router = useRouter()
    const [packageid, setPackageId] = useState("")
    const [singlePackageId, setsinglePackageId] = useState("")
    const [isNew, setIsNew] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [navLinks, setNavLinks] = useState({})
    const [user, setUser] = useState({})
    const [isVisible , setIsVisible] = useState(true);
    const [buttonText , setButtonText] = useState("")
    useEffect(() => {
        // fetchNavLinks();
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
        if(asPath=="/iraqZiyarat"){
            router.push("/iraq-ziyarat-packages/karbala-iraq-ziyarat")
        }
        switch (asPath) {
            case "/": setMenuState({
                home: true,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false,
                forex:false,
                hajjPackage:false,
                flightFare:false,
                visal:false,
                trukey:false,
            });
                break;
            case "/umrahPackage": setMenuState({
                home: false,
                hajjUmrah: true,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false,
                forex:false,
                hajjPackage:false,
                flightFare:false,
                visal:false,
                trukey:false,
            });
                break;
            case "/iraq-ziyarat-packages/iraq-ziyarat": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: true,
                holidayPackages: false,
                karbalaZiyarat: false,
                forex:false,
                hajjPackage:false,
                flightFare:false,
                visal:false,
                trukey:false,
            });
                break;
            case "/iraq-ziyarat-packages/karbala-iraq-ziyarat": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: true,
                forex:false,
                hajjPackage:false,
                flightFare:false,
                visal:false,
                trukey:false,
            });
                break;
            case "/holiday-packages": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: true,
                karbalaZiyarat: false,
                forex:false,
                hajjPackage:false,
                flightFare:false,
                visal:false,
                trukey:false,
            });
                break;
            case "/forex": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false,
                forex:true,
                hajjPackage:false,
                flightFare:false,
                visal:false,
                trukey:false,
            });
                break;
                case "/hajjPackage": setMenuState({
                    home: false,
                    hajjUmrah: false,
                    iraqZiyarat: false,
                    holidayPackages: false,
                    karbalaZiyarat: false,
                    forex:false,
                    hajjPackage:true,
                    flightFare:false,
                    visal:false,
                    trukey:false,
                });
                    break;
            case "/flight-fare": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false,
                forex:false,
                hajjPackage:false,
                flightFare:true,
                visal:false,
                trukey:false,
            });
            break;
            case "/visa": setMenuState({
                home: false,
                hajjUmrah: false,
                iraqZiyarat: false,
                holidayPackages: false,
                karbalaZiyarat: false,
                forex:false,
                hajjPackage:false,
                flightFare:false,
                visal:true,
                trukey:false,
            });
                break;
        case "/turkey-packages": setMenuState({
            home: false,
            hajjUmrah: false,
            iraqZiyarat: false,
            holidayPackages: false,
            karbalaZiyarat: false,
            forex:false,
            hajjPackage:false,
            flightFare:false,
            visal:false,
            trukey:true,
        });
            break;
            default: setMenuState({ home: false, hajjUmrah: false, iraqZiyarat: false, holidayPackages: false , hajjPackage:false })
                break;

        }
    }, [router])

    const fetchNavLinks = async () => {
        let data = await getNavLinks();
        setNavLinks(data.filter(d => d.active == true))
    }
    const size = useWindowSize();

    useEffect(()=>{
        setIsVisible(size.width>=1040)
    },[size])


    useEffect(()=>{
        switch (packageid){
            case "vendors" : setButtonText("Venors")
                                break;
            case "flight-fare" : setButtonText("Flight Fare")
                                break;
            default : setButtonText("Package")
                            break;
        }
    })
    return (
        <div> {isLoading ? <div className="mainLoading"><p>Loading...</p></div> : 
        <div>
            <div className={`${styles.navBar} body-wrapper justify-between`} style={{ flexWrap: "nowrap" }}>
            <div onClick={()=>{
                setIsVisible(!isVisible)
            }} className={styles.hamMenu}>
            {isVisible ? <GiCancel style={{pointerEvents:"none"}} /> :<GiHamburgerMenu style={{pointerEvents:"none"}} />}
            </div>
                <Image src={logo} width={150} height={60} alt="al azeem logo" />
               <div className={`${styles.mainMenu} ${!isVisible && styles.notVisible}`}>
                    <ul className="body-wrapper">
                        {/* {
                            navLinks && navLinks.length > 0 && navLinks.map((link, i) => (
                                <li key={i} className={`${menuState[`${link.key}`] && styles.active}`}><Link href={`${link.link}`}>{link.title}</Link></li>
                            ))
                        } */}
                        <li className={menuState[`home`] && styles.active}><Link href={`/`}>Home</Link></li>
                        <li className={menuState[`karbalaZiyarat`] && styles.active}><Link href={`/iraq-ziyarat-packages/karbala-iraq-ziyarat`}>Karbala Ziyarat</Link></li>
                        <li className={menuState[`hajjUmrah`] && styles.active}><Link href={`/umrahPackage`}>Hajj Umrah</Link></li>
                        <li className={menuState[`iraqZiyarat`] && styles.active}><Link href={`/iraq-ziyarat-packages/iraq-ziyarat`}>Iraq Ziyarat</Link></li>
                        <li className={`${styles.itemsD} ${menuState['holidayPackages'] && styles.active}`}><Link href={`/holiday-packages`}>Holiday Packages</Link></li>
                        <li className={`${styles.itemsD} ${menuState['hajjPackage'] && styles.active}`}><Link href={`/hajjPackage`}>Hajj Package</Link></li>
                        <li className={`${styles.itemsD} ${menuState['flightFare'] && styles.active}`}><Link href={`/flight-fare`}>Flight Fare</Link></li>
                        <li className={`${styles.itemsD} ${menuState['visa'] && styles.active}`}><Link href={`/visa`}>Visa Assistance</Link></li>
                        <li className={`${styles.itemsD} ${menuState['turkey'] && styles.active}`}><Link href={`/turkey-packages`}>Turkey</Link></li>
                        <li className={`${styles.itemsD} ${menuState['forex'] && styles.active}`}><Link href={`forex`}>FOREX</Link></li>
                        
                        {/* <li className={`${menuState["hajjUmrah"] && styles.active}`}><Link href="/hajj-and-umrah-packages">Hajj Umrah</Link></li>
                        <li className={`${menuState["iraqZiyarat"] && styles.active}`}><Link href="/iraq-ziyarat-packages/karbala-iraq-ziyarat">Iraq Ziyarat</Link></li>
                        <li className={`${menuState["holidayPackages"] && styles.active}`}><Link href="/holiday-packages">Holiday Packages</Link></li> */}
                    </ul>
                </div>
                <div className={styles.searchWrapper}>
                    <div className={`${styles.searchBar} body-wrapper`}>
                    {/* <div className={styles.searchIcon}><IoSearch /></div> */}
                    <input onChange={handleSearch} onBlur={()=>{setTimeout(()=>{setIsSuggVis(false)},1000)}} type="search" placeholder="Search Anything Here"></input>
                    </div>
                    {isSuggVis && searchedPages.length>0 && <div className={styles.sugg}>
                        {
                            searchedPages.map((p,i)=>(
                                <div onClick={()=>{router.push(p.link)}} className={styles.searchCard}>
                                    <p className={styles.searchText}>{p.key}</p>
                                    <p className={styles.searchLink}>{p.link}</p>
                                </div>
                            ))
                        }
                    </div>}
                </div>
                <div className={`${(user && user.role == 'admin') ? styles.w40 : styles.w20} body-wrapper`}>
                    
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
                {!isNew && !singlePackageId && <Link href={`${packageid}/new`}><button style={{ marginBottom: "20px" }} className="primary-btn blue">Add New {buttonText}</button></Link>}
            </div>}
            <div className={styles.lowerNavWrapper}>
            <div className={styles.lowerNav}>
            <div className={`${styles.mainMenu} ${!isVisible && styles.notVisible}`}>
                    <ul className="body-wrapper">
                        {/* {
                            navLinks && navLinks.length > 0 && navLinks.map((link, i) => (
                                <li key={i} className={`${menuState[`${link.key}`] && styles.active}`}><Link href={`${link.link}`}>{link.title}</Link></li>
                            ))
                        } */}
                        <li className={menuState[`holidayPackages`] && styles.active}><Link href={`/holiday-packages`}>Holiday Packages</Link></li>
                        <li className={menuState[`hajjPackage`] && styles.active}><Link href={`/hajjPackage`}>Hajj Package</Link></li>
                        <li className={menuState[`flightFare`] && styles.active}><Link href={`/flight-fare`}>Flight Fare</Link></li>
                        <li className={menuState[`visa`] && styles.active}><Link href={`/visa`}>Visa Assistance</Link></li>
                        <li className={menuState[`turkey`] && styles.active}><Link href={`/turkey-packages`}>Turkey</Link></li>
                        <li className={menuState[`forex`] && styles.active}><Link href={`forex`}>FOREX</Link></li>
                        
                    </ul>
                </div>

            </div>
            </div>
        </div>}
        </div>
    )
}

export default NavBar