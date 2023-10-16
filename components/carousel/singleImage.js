import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";

const SingleImage = ({url})=>{
    const size = useWindowSize();
    return(
        <div className="backgroundImgWrapper">
            {
        size.width > 700 ?
         <Image className="backgroundImg" width={"100%"} height={500} src={url[0]} alt="iraq ziyarat packages" />:
         <Image className="backgroundImg" width={"100%"} height={250} src={url[1]} alt="iraq ziyarat packages" />}
        </div>
    )
}

export default SingleImage