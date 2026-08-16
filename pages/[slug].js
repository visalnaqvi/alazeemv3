import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageRenderer from "@/components/pageBuilder/PageRenderer";
import { getPublicPage } from "@/services/pages";
import styles from "@/components/pageBuilder/pageBuilder.module.css";

export default function CustomPublicPage() {
    const router = useRouter();
    const [page, setPage] = useState(undefined);
    useEffect(() => {
        if (!router.query.slug) return;
        getPublicPage(`custom--${router.query.slug}`).then(setPage).catch(() => setPage(null));
    }, [router.query.slug]);
    if (page === undefined) return <div className={styles.empty}>Loading page…</div>;
    if (!page) return <div className={styles.empty}><h1>Page not found</h1><p>This page is unpublished, archived, or does not exist.</p></div>;
    return <PageRenderer page={page} version={page.version} />;
}
