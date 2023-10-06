import { useState } from "react";
import styles from "./login.module.css"
import { checkUser } from "@/services/login";
import { useRouter } from "next/router";

const LoginComponent = () =>{

    const [userId , setUserId] = useState("");
    const [password , setPassword] = useState("");
    const router = useRouter();

    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log("submit")
        console.log(userId);
        console.log(password);
        const token = await checkUser(userId,password)
        if(localStorage.getItem("token")==token){
            router.push("/admin-panel")
        }
    }

    return(
        <div className={`margin ${styles.mainWrapper}`}>
            <div className="body-wrapper column" style={{height:"60vh"}}>
            <form onSubmit={onSubmit} className={styles.wrapper} >
                <div className={styles.formItem}>
                    <label className={styles.label} htmlFor="userId">UserId</label><br></br>
                    <input onChange={(e)=>setUserId(e.target.value)} className={styles.input} type="text" id="userId" name="userId" placeholder="Enter your userId" />
                </div>
                <div className={styles.formItem}>
                    <label className={styles.label} htmlFor="password">Password</label><br></br>
                    <input onChange={(e)=>setPassword(e.target.value)} className={styles.input} type="password" id="password" name="password" placeholder="Enter your Password" />
                </div>
                <button className="primary-btn blue">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default LoginComponent;