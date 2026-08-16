import { useCallback, useEffect, useState } from "react";
import PackageCard from "@/components/cards/packageCard/packageCard";
import ImageCardFormal from "@/components/cards/imageCardFormal/imageCardFormal";
import { getPackageSource } from "@/config/packageSources";
import { getIraqPackageVariant, loadPackageBlock } from "@/services/packageBlocks";
import styles from "./pageBuilder.module.css";

export default function PackageBlock({ block }) {
    const [state, setState] = useState({ loading: true, groups: [], error: "" });
    const reload = useCallback(async () => {
        setState(current => ({ ...current, loading: true, error: "" }));
        try {
            const result = await loadPackageBlock(block);
            setState({ loading: false, groups: result.groups, error: "" });
        } catch (error) {
            setState({ loading: false, groups: [], error: error.message || "Unable to load packages." });
        }
    }, [block]);

    useEffect(() => { reload(); }, [reload]);
    const source = getPackageSource(block.source);
    if (state.loading) return <p className={styles.dynamicStatus}>Loading packages…</p>;
    if (state.error) return <p className={`${styles.dynamicStatus} ${styles.dynamicError}`}>{state.error}</p>;
    if (!state.groups.some(group => group.packages.length)) return <p className={styles.dynamicStatus}>No matching packages are currently available.</p>;

    return <section className={styles.dynamicBlock}>
        {state.groups.map(group => <div key={group.id} className={styles.packageGroup}>
            <div className={block.source === "holiday" ? "body-wrapper" : styles.packageGrid}>
                {group.packages.map((tour, index) => block.source === "holiday"
                    ? <ImageCardFormal tour={tour} key={tour.id || index} />
                    : <PackageCard tour={tour} type={source?.editorType || block.source} subType={block.source === "iraq" ? getIraqPackageVariant(tour) : ""} fetchData={reload} key={tour.id || index} />)}
            </div>
        </div>)}
    </section>;
}
