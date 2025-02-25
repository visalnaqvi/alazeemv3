import styles from "./selector.module.css"

const Selector = ({ type, setType }) => {
    return (
        <div className={styles.wrapper}>
            <button className={type == "shia" && styles.active} onClick={() => { setType("shia") }}>Shia</button>
            <button className={type == "sunni" && styles.active} onClick={() => { setType("sunni") }}>Sunni</button>
        </div>
    )
}

export default Selector;