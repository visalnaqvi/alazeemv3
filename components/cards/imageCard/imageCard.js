import Image from 'next/image';
import styles from './imageCard.module.css'
const ImageCard = ({data})=>{
    return(
        <div className={`body-wrapper ${styles.wrapper}`} style={{flexDirection:data.direction}}>
            <div className={`${styles.imageCardSection} ${styles.content}`}>
                <h2 style={{marginTop:'0'}}className='subHeading'>{data.heading}</h2>
                <p className='content'>{data.content}</p>
            </div>
            <div className={styles.imageCardSection}>
                <Image src={data.img} width={500} height={380} alt='visa' />
            </div>
        </div>
    );
}


export default ImageCard;