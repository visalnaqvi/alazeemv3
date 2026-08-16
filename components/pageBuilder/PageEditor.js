import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlockEditor from "./BlockEditor";
import styles from "./pageBuilder.module.css";
import { deleteCustomPage, getAdminPage, publishPage, revertPageDraft, savePageDraft } from "@/services/pages";
import { PAGE_BLOCK_TYPES, createBlock, getBlockTypeLabel, moveItem, validateBlocks } from "@/services/pageBuilderUtils";

export default function PageEditor({ pageKey }) {
    const router = useRouter();
    const [page, setPage] = useState(null);
    const [version, setVersion] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState(null);
    const [dragIndex, setDragIndex] = useState(null);

    useEffect(() => {
        if (!pageKey) return;
        getAdminPage(pageKey).then(result => {
            setPage(result);
            setVersion(result?.draft || null);
            setDirty(false);
        }).catch(error => setNotice({ type: "error", text: error.message }));
    }, [pageKey]);
    useEffect(() => {
        const warn = event => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [dirty]);

    const changeVersion = next => { setVersion(next); setDirty(true); };
    const changeBlock = (index, nextBlock) => changeVersion({ ...version, blocks: version.blocks.map((block, i) => i === index ? nextBlock : block) });
    const save = async (quiet = false) => {
        if (!page.title.trim()) throw new Error("Enter a page title.");
        const blockError = validateBlocks(version.blocks);
        if (blockError) throw new Error(blockError);
        await savePageDraft({ pageKey, title: page.title, version });
        setDirty(false);
        if (!quiet) setNotice({ type: "success", text: "Draft saved." });
    };
    const run = async action => {
        setBusy(true); setNotice(null);
        try { await action(); } catch (error) { setNotice({ type: "error", text: error.message || "Something went wrong." }); }
        finally { setBusy(false); }
    };

    if (!page || !version) return <div className={styles.adminShell}>Loading page editor…</div>;
    return <div className={styles.adminShell}>
        <div className={styles.adminHeader}><div><h1>Edit {page.title}</h1><p className={styles.muted}>{page.route} · <span className={styles.status}>{page.status}</span></p></div>
            <div className={styles.toolbar}>
                <button className="primary-btn blue" disabled={busy} onClick={() => run(() => save())}>Save Draft</button>
                <button className="primary-btn green" disabled={busy} onClick={() => run(async () => { await save(true); await publishPage(pageKey); setPage(current => ({ ...current, status: "published" })); setNotice({ type: "success", text: "Page published." }); })}>Publish</button>
                <button className="primary-btn" disabled={busy} onClick={() => run(async () => { if (!window.confirm("Replace the draft with the published/default page?")) return; setVersion(await revertPageDraft(pageKey)); setDirty(false); setNotice({ type: "success", text: "Draft reverted." }); })}>Revert Draft</button>
                {page.kind === "custom" && <button className="primary-btn red" disabled={busy} onClick={() => run(async () => { if (!window.confirm("Delete this page? This removes the draft and published page.")) return; await deleteCustomPage(pageKey); setDirty(false); router.push("/admin-panel/pages"); })}>Delete Page</button>}
            </div>
        </div>
        {notice && <div className={`${styles.notice} ${styles[notice.type]}`}>{notice.text}</div>}
        <div className={styles.editorCard}>
            <div className={styles.field}><label>Page title</label><input value={page.title} onChange={event => { setPage({ ...page, title: event.target.value }); setDirty(true); }} /></div>
            <div className={styles.field}><label>SEO title</label><input value={version.seoTitle || ""} onChange={event => changeVersion({ ...version, seoTitle: event.target.value })} /></div>
            <div className={styles.field}><label>SEO description</label><textarea value={version.seoDescription || ""} onChange={event => changeVersion({ ...version, seoDescription: event.target.value })} /></div>
            <div className={styles.field}><label>SEO keywords</label><textarea value={version.seoKeywords || ""} onChange={event => changeVersion({ ...version, seoKeywords: event.target.value })} placeholder="Comma-separated keywords" /></div>
        </div>
        <div className={styles.toolbar} style={{ margin: "22px 0" }}>
            <strong>Add block:</strong>{PAGE_BLOCK_TYPES.map(type => <button type="button" className="primary-btn blue" key={type} onClick={() => changeVersion({ ...version, blocks: [...version.blocks, createBlock(type)] })}>{getBlockTypeLabel(type)}</button>)}
        </div>
        {version.blocks.map((block, index) => <BlockEditor
            key={block.id} block={block} index={index} count={version.blocks.length} pageKey={pageKey}
            onChange={next => changeBlock(index, next)}
            onMove={(from, to) => changeVersion({ ...version, blocks: moveItem(version.blocks, from, to) })}
            onDelete={() => changeVersion({ ...version, blocks: version.blocks.filter((_, i) => i !== index) })}
            onDragStart={setDragIndex}
            onDrop={target => { if (dragIndex !== null) changeVersion({ ...version, blocks: moveItem(version.blocks, dragIndex, target) }); setDragIndex(null); }}
            onError={text => setNotice({ type: "error", text })}
        />)}
        {!version.blocks.length && <p className={styles.empty}>Add the first content block above.</p>}
    </div>;
}
