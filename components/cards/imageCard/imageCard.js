import Image from 'next/image';
import styles from './imageCard.module.css'
import { useWindowSize } from "@uidotdev/usehooks";
const ImageCard = ({data})=>{
    const size = useWindowSize();
    return(
        <div className={`body-wrapper ${styles.wrapper}`} style={{flexDirection:data.direction[0]}}>
             
                {size.width != null && size.width < 550 ? <Image objectFit='cotain' src={data.img} width={size.width} height={250} alt='visa' />:
                <Image objectFit='cotain' src={data.img} width={550} height={380} alt='visa' />
                }
            
            <div className={`${styles.imageCardSection} ${styles.content}`}>
                <h2 style={{marginTop:'0'}}className='subHeading'>{data.heading}</h2>
                <p className='content'>{data.content}</p>
            </div>
        </div>
    );
}


export default ImageCard;