import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';
import styles from "./carousel.module.css"

const normalizeImage = (image, index) => typeof image === "string"
    ? { id: `${image}-${index}`, url: image, mobileUrl: "", alt: "Kabba", legacy: true }
    : { id: image?.id || `${image?.url || "slide"}-${index}`, url: image?.url || "", mobileUrl: image?.mobileUrl || "", alt: image?.alt || "", legacy: false };

const CarouselComp = ({images = [], pageTitle, width, height, fixedFrame = false})=>{
    const slides = images.map(normalizeImage).filter(image => image.url);
    const hasMultipleSlides = slides.length > 1;
    if (!slides.length) return null;

    return(
        <div className={styles.wrapper}>
        <Carousel
            className={styles.carousel}
            stopOnHover={false}
            autoPlay={hasMultipleSlides}
            infiniteLoop={hasMultipleSlides}
            showArrows={hasMultipleSlides}
            showIndicators={hasMultipleSlides}
            showStatus={hasMultipleSlides}
            showThumbs={false}
            swipeable={hasMultipleSlides}
        >
            {slides.map(slide => fixedFrame || !slide.legacy
                ? <div className={fixedFrame ? styles.fixedFrame : undefined} key={slide.id}>
                    <picture className={fixedFrame ? styles.fixedFramePicture : undefined}>
                        {slide.mobileUrl && <source media="(max-width: 700px)" srcSet={slide.mobileUrl} />}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={fixedFrame ? styles.fixedFrameImage : undefined} alt={slide.alt} src={slide.url} />
                    </picture>
                </div>
                : <Image width={width} height={height} alt={slide.alt} key={slide.id} src={slide.url} />
            )}

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
