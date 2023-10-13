import {HiCheckCircle} from "react-icons/hi"
const IconList = ({items , bold , big , margin})=>{
   
    return(
        <ul className="icon-list">
                    {
                        items.map((tag, i) => (
                            <div className={`icon-list-item ${bold && "bold"} ${big && "big"} ${margin && "margin"}`} key={i}>
                                <div className="icon-list-icon">
                                    <HiCheckCircle />
                                </div>
                                <li>{tag}</li>
                            </div>
                        ))
                    }
                </ul>
    )
}

export default IconList;