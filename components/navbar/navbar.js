import Image from "next/image"
import logo from "../../public/logo.png"
import styles from "./navBar.module.css"
import {ImFacebook2} from "react-icons/im"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
const NavBar = ()=>{

    const [menuState , setMenuState] = useState({
        home:false,
        hajjUmrah:false,
        iraqZiyarat:false,
    })
    const router = useRouter()    

    useEffect(()=>{
        const path = router.pathname;

        switch(path){
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
    },[router.pathname])

    return(
        <div className={`${styles.navBar} body-wrapper`} style={{justifyContent:"space-between"}}>
            <Image src={logo} width={120} height={50} alt="al azeem logo"/>
            <div className={styles.mainMenu}>
                <ul style={{display:"flex"}}>
                    <li className={`${menuState["home"] && styles.active}`} onClick={(e)=>{
                        router.push("/")
                    }}>Home</li>
                    <li className={`${menuState["hajjUmrah"] && styles.active}`} onClick={(e)=>{
                        router.push("/hajj-and-umrah-packages")
                    }}>Hajj Umrah</li>
                    <li className={`${menuState["iraqZiyarat"] && styles.active}`} onClick={(e)=>{
                        router.push("/iraq-ziyarat-packages")
                    }}>Iraq Ziyarat</li>
                    <li className={`${menuState["holidayPackages"] && styles.active}`} onClick={(e)=>{
                        router.push("/holiday-packages")
                    }}>Holiday Packages</li>
                </ul>
            </div>
            <div className={styles.facebook}>
               <a target="blank" href="https://www.facebook.com/AlAzeemTravels/"><ImFacebook2 /></a>
            </div>
        </div>
    )
}

export default NavBar