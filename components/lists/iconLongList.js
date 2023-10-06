import IconList from "./iconList";

const IconLongList = ({items})=>{
    return(
        <div>
            {
                items.map((item,i)=>(
                    <div  style={{borderBottom:"1px solid #dbdbdb", paddingBottom:"20px"}} key={i}>
                    <h3 className="boldHeading small">{item.title}</h3>
                    <IconList items={item.items} big={true} margin={true}/>
                    </div>
                ))
            }
        </div>
    )
}

export default IconLongList;