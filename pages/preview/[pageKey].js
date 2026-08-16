import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageRenderer from "@/components/pageBuilder/PageRenderer";
import { getAdminPage } from "@/services/pages";
import { checkStorageForAdminToken } from "@/services/auth";
import styles from "@/components/pageBuilder/pageBuilder.module.css";

export default function PreviewPage() {
    const router = useRouter();
    const [page, setPage] = useState(undefined);
    useEffect(() => {
        if (!router.query.pageKey) return;
        if (!checkStorageForAdminToken()) { router.replace("/"); return; }
        getAdminPage(router.query.pageKey).then(result => {
            if (!result) { setPage(null); return; }
            if (result.kind === "existing") {
                const joiner = result.route.includes("?") ? "&" : "?";
                router.replace(`${result.route}${joiner}pagePreview=${encodeURIComponent(result.pageKey)}`);
                return;
            }
            setPage({ ...result, version: result.draft });
        }).catch(() => setPage(null));
    }, [router, router.query.pageKey]);
    if (page === undefined) return <div className={styles.empty}>Preparing preview…</div>;
    if (!page) return <div className={styles.empty}>Preview unavailable.</div>;
    return <PageRenderer page={page} version={page.version} />;
}
