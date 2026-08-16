import { useState } from "react";
import { useRouter } from "next/router";
import { createCustomPage } from "@/services/pages";
import { normalizeSlug, validateSlug } from "@/services/pageBuilderUtils";
import styles from "@/components/pageBuilder/pageBuilder.module.css";

export default function NewPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    return <div className={styles.adminShell}><h1>Create Page</h1>
        {error && <div className={`${styles.notice} ${styles.error}`}>{error}</div>}
        <form className={styles.editorCard} onSubmit={async event => {
            event.preventDefault(); const validation = validateSlug(slug); if (validation) { setError(validation); return; }
            setBusy(true); setError("");
            try { const key = await createCustomPage({ title, slug }); router.push(`/admin-panel/pages/${encodeURIComponent(key)}`); }
            catch (error) { setError(error.message); setBusy(false); }
        }}>
            <div className={styles.field}><label>Page title</label><input value={title} onChange={event => { const value = event.target.value; setTitle(value); if (!slugEdited) setSlug(normalizeSlug(value)); }} /></div>
            <div className={styles.field}><label>URL slug</label><input value={slug} onChange={event => { setSlugEdited(true); setSlug(normalizeSlug(event.target.value)); }} /><p className={styles.muted}>Public URL: /{slug || "your-page"}. This cannot be changed after creation.</p></div>
            <button className="primary-btn blue" disabled={busy}>Create Draft</button>
        </form>
    </div>;
}
