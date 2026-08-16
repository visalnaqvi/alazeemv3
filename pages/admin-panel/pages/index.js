import Link from "next/link";
import { useEffect, useState } from "react";
import { listAdminPages } from "@/services/pages";
import styles from "@/components/pageBuilder/pageBuilder.module.css";

export default function PagesAdmin() {
    const [pages, setPages] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => { listAdminPages().then(setPages).catch(error => setError(error.message)); }, []);
    return <div className={styles.adminShell}>
        <div className={styles.adminHeader}><div><h1>Pages</h1><p className={styles.muted}>Create pages or edit content around existing site functionality.</p></div><Link href="/admin-panel/pages/new"><button className="primary-btn blue">Create Page</button></Link></div>
        {error && <div className={`${styles.notice} ${styles.error}`}>{error}</div>}
        <div className={styles.adminGrid}>{pages.map(page => <article className={styles.adminCard} key={page.pageKey}>
            <h2>{page.title}</h2><p className={styles.muted}>{page.route}</p><p className={styles.status}>{page.status}</p>
            <Link href={`/admin-panel/pages/${encodeURIComponent(page.pageKey)}`}><button className="primary-btn blue">Edit Page</button></Link>
        </article>)}</div>
    </div>;
}
