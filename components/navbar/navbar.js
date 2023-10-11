import Image from "next/image"
import logo from "../../public/logo.png"
import styles from "./navBar.module.css"
import {ImFacebook2} from "react-icons/im"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
const NavBar = ()=>{

    const [menuState , setMenuState] = useState({
        home:false,
        hajjUmrah:false,
        iraqZiyarat:false,
    })

    const router = useRouter()  
    const [packageid , setPackageId] = useState("")  
    const [singlePackageId , setsinglePackageId] = useState("")  
    const [isNew , setIsNew] = useState(true)  

    useEffect(()=>{
        let {packageid , singlePackageId} = router.query;
      
            setPackageId(packageid)
            setsinglePackageId(singlePackageId)
        const {pathname } = router;
        setIsNew(singlePackageId=="new")
        switch(pathname){
            case "/": setMenuState({home:true , hajjUmrah:false , iraqZiyarat:false , holidayPackages:false});
                                                break;
            case "/hajj-and-umrah-packages" : setMenuState({home:false , 
                                                hajjUmrah:true,
                                                iraqZiyarat:false,holidayPackages:false});
                                                break;
            case "/iraq-ziyarat-packages": setMenuState({home:false , hajjUmrah:false , iraqZiyarat:true, holidayPackages:false});
                                            break;
            case "/holiday-packages":setMenuState({home:false , hajjUmrah:false , iraqZiyarat:false, holidayPackages:true});
                                        break;
            default : setMenuState({home:false,hajjUmrah:false,iraqZiyarat:false, holidayPackages:false})
                            break;

        }
    },[router])

    return(
        <>
        <div className={`${styles.navBar} body-wrapper`} style={{justifyContent:"space-between"}}>
            <Image src={logo} width={120} height={50} alt="al azeem logo"/>
            <div className={styles.mainMenu}>
                <ul style={{display:"flex"}}>
                    <li className={`${menuState["home"] && styles.active}`}><Link href="/">Home</Link></li>
                    <li className={`${menuState["hajjUmrah"] && styles.active}`}><Link href="/hajj-and-umrah-packages">Hajj Umrah</Link></li>
                    <li className={`${menuState["iraqZiyarat"] && styles.active}`}><Link href="/iraq-ziyarat-packages">Iraq Ziyarat</Link></li>
                    <li className={`${menuState["holidayPackages"] && styles.active}`}><Link href="/holiday-packages">Holiday Packages</Link></li>
                </ul>
            </div>
            <div className={styles.facebook}>
               <a target="blank" href="https://www.facebook.com/AlAzeemTravels/"><ImFacebook2 /></a>
            </div>
        </div>
        {packageid && <div className="body-wrapper justify-between margin">
        <button onClick={()=>{router.back()}} style={{float:"right",marginBottom:"20px"}} className="primary-btn blue">Back</button>
        {!isNew && !singlePackageId && <Link href={`${packageid}/new`}><button style={{marginBottom:"20px"}} className="primary-btn blue">Add New {packageid=="vendors"?"Vendor":"Package"}</button></Link>}
    </div>}
    </>
    )
}

export default NavBar