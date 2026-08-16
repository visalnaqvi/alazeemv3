import { useEffect, useState } from "react";
import styles from "@/components/pageBuilder/pageBuilder.module.css";
import { addNavigationItem, getNavigationItems, removeNavigationItem, saveNavigationItems } from "@/services/navigation";
import { listPublishedPageTargets } from "@/services/pages";
import { moveItem } from "@/services/pageBuilderUtils";

export default function NavigationAdmin() {
    const [items, setItems] = useState([]);
    const [targets, setTargets] = useState([]);
    const [selected, setSelected] = useState("");
    const [dragIndex, setDragIndex] = useState(null);
    const [notice, setNotice] = useState(null);
    const [busy, setBusy] = useState(false);

    const load = async () => {
        const [links, pages] = await Promise.all([getNavigationItems(), listPublishedPageTargets()]);
        const normalizedLinks = await Promise.all(links.map(async link => {
            if (!link.isMigrationFallback) return link;
            const id = await addNavigationItem(link);
            return { ...link, id, isMigrationFallback: false };
        }));
        setItems(normalizedLinks); setTargets(pages); setSelected(pages[0]?.pageKey || "");
    };
    useEffect(() => { load().catch(error => setNotice({ type: "error", text: error.message })); }, []);
    const update = (index, values) => setItems(current => current.map((item, i) => i === index ? { ...item, ...values } : item));

    return <div className={styles.adminShell}>
        <div className={styles.adminHeader}><div><h1>Navigation</h1><p className={styles.muted}>Manage the top-level links shown on desktop and mobile.</p></div><button className="primary-btn blue" disabled={busy} onClick={async () => {
            if (items.some(item => !item.label.trim())) { setNotice({ type: "error", text: "Every navigation link needs a label." }); return; }
            setBusy(true); try { await saveNavigationItems(items); setNotice({ type: "success", text: "Navigation saved." }); } catch (error) { setNotice({ type: "error", text: error.message }); } finally { setBusy(false); }
        }}>Save Navigation</button></div>
        {notice && <div className={`${styles.notice} ${styles[notice.type]}`}>{notice.text}</div>}
        <div className={styles.editorCard}>
            <div className={styles.toolbar}><select value={selected} onChange={event => setSelected(event.target.value)}>{targets.map(target => <option value={target.pageKey} key={target.pageKey}>{target.title} ({target.route})</option>)}</select>
                <button className="primary-btn blue" disabled={!selected || busy} onClick={async () => {
                    const target = targets.find(page => page.pageKey === selected); if (!target) return;
                    setBusy(true); try {
                        const id = await addNavigationItem({ label: target.title, targetType: "page", pageKey: target.pageKey, href: target.route, order: items.length });
                        setItems(current => [...current, { id, label: target.title, targetType: "page", pageKey: target.pageKey, href: target.route, visible: true, order: current.length }]);
                    } catch (error) { setNotice({ type: "error", text: error.message }); } finally { setBusy(false); }
                }}>Add Page Link</button>
            </div>
        </div>
        {items.map((item, index) => <article className={styles.blockEditor} key={item.id} draggable onDragStart={() => setDragIndex(index)} onDragOver={event => event.preventDefault()} onDrop={() => { if (dragIndex !== null) setItems(current => moveItem(current, dragIndex, index)); setDragIndex(null); }}>
            <div className={styles.blockHeader}><strong>{index + 1}. {item.href}</strong><div className={styles.toolbar}>
                <button className="primary-btn blue" disabled={index === 0} onClick={() => setItems(current => moveItem(current, index, index - 1))}>↑</button>
                <button className="primary-btn blue" disabled={index === items.length - 1} onClick={() => setItems(current => moveItem(current, index, index + 1))}>↓</button>
                <button className="primary-btn red" onClick={async () => { if (!window.confirm("Remove this navigation link?")) return; await removeNavigationItem(item.id); setItems(current => current.filter(link => link.id !== item.id)); }}>Remove</button>
            </div></div>
            <div className={styles.field}><label>Link label</label><input value={item.label} onChange={event => update(index, { label: event.target.value })} /></div>
            <label><input type="checkbox" checked={item.visible} onChange={event => update(index, { visible: event.target.checked })} /> Show in navigation</label>
        </article>)}
    </div>;
}
