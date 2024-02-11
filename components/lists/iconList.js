import {HiCheckCircle} from "react-icons/hi"
const IconList = ({items , bold , big , margin , isBold})=>{
  
    return(
        <ul className="icon-list">
                    {
                        items.map((tag, i) => (
                            <li key={i}>
                            <div className={`icon-list-item ${bold && "bold"} ${isBold && isBold[i] && "higlight"} ${big && "big"} ${margin && "margin"}`}>
                                <div className="icon-list-icon">
                                    <HiCheckCircle />
                                </div>
                                <span>{tag}</span>
                            </div>
                            </li>
                        ))
                    }
                </ul>
    )
}

export default IconList;