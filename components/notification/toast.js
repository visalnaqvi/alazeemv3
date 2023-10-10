import styles from "./toast.module.css"
import {GiCancel} from "react-icons/gi"
const Toast = ({message , type , onClose})=>{
    return(
    <div className={`${styles.wrapper}  body-wrapper`}>
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        <div onClick={onClose} className={`${styles.message} ${styles[type]} ${styles.icon}`}>
            <GiCancel style={{pointerEvents:"none"}}/>
        </div> 
    </div>);
}

export default Toast;