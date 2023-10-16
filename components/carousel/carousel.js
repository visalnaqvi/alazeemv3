import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';
import styles from "./carousel.module.css"

const CarouselComp = ({images , pageTitle , width , height})=>{
    return(
        <div className={styles.wrapper}>
        <Carousel className={styles.carousel} stopOnHover={false} autoPlay infiniteLoop showThumbs={false}>
  
                   {
                    images.map((image , i)=>(
                        <Image width={width} height={height} alt='Kabba' key={i} src={image} />
                    ))
                   }

        </Carousel>
        {pageTitle && <div className={`body-wrapper ${styles.bodyWrapper}`}>
            <div className={`${styles.bodyWrapperSection} ${styles.shade}`}>
                   <h1>{pageTitle.title}</h1>
                   <p>{pageTitle.content}</p>
                  <a href={pageTitle.btnLink}><button className='primary-btn blue'>{pageTitle.btnContent}</button></a>
            </div>
        </div>}
            </div>
    );
}

export default CarouselComp;