import { useCallback, useEffect, useState } from "react";
import { listUploadedImages } from "@/services/media";
import styles from "./pageBuilder.module.css";

export default function MediaLibraryPicker({ title = "Choose an uploaded image", onSelect, onClose }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadImages = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            setImages(await listUploadedImages());
        } catch (loadError) {
            setError(loadError.message || "Unable to load uploaded images.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadImages(); }, [loadImages]);

    return <div className={styles.mediaLibraryOverlay} role="presentation" onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
    }}>
        <section className={styles.mediaLibraryDialog} role="dialog" aria-modal="true" aria-labelledby="media-library-title">
            <div className={styles.mediaLibraryHeader}>
                <div><h2 id="media-library-title">{title}</h2><p className={styles.muted}>Images previously uploaded across all pages.</p></div>
                <button type="button" className="primary-btn" onClick={onClose} aria-label="Close image library">Close</button>
            </div>
            {loading && <p className={styles.mediaLibraryStatus}>Loading uploaded images...</p>}
            {error && <div className={`${styles.notice} ${styles.error}`} role="alert">{error} <button type="button" onClick={loadImages}>Try again</button></div>}
            {!loading && !error && !images.length && <p className={styles.mediaLibraryStatus}>No images have been uploaded to this page yet.</p>}
            {!loading && !error && images.length > 0 && <div className={styles.mediaLibraryGrid}>
                {images.map(image => <button type="button" className={styles.mediaLibraryItem} key={image.storagePath} onClick={() => onSelect(image)} aria-label={`Use ${image.name}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.url} alt="" />
                    <span title={image.name}>{image.name}</span>
                    <small title={image.pageKey}>From: {image.pageKey}</small>
                </button>)}
            </div>}
        </section>
    </div>;
}
