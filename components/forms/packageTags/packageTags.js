import { useEffect, useState } from "react";
import Toast from "@/components/notification/toast";
import { addPackageTag, getPackageTags, updatePackageTag } from "@/services/packageTaxonomy";

export default function PackageTagsForm() {
    const [tags, setTags] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [notice, setNotice] = useState(null);

    const load = async () => setTags(await getPackageTags());
    useEffect(() => { load().catch(error => setNotice({ status: "warning", msg: error.message })); }, []);

    const add = async () => {
        try {
            await addPackageTag(newLabel);
            setNewLabel("");
            await load();
            setNotice({ status: "success", msg: "Tag added." });
        } catch (error) {
            setNotice({ status: "warning", msg: error.message || "Unable to add tag." });
        }
    };

    const save = async tag => {
        try {
            await updatePackageTag(tag);
            await load();
            setNotice({ status: "success", msg: "Tag updated." });
        } catch (error) {
            setNotice({ status: "warning", msg: error.message || "Unable to update tag." });
        }
    };

    const patchTag = (id, values) => setTags(current => current.map(tag => tag.id === id ? { ...tag, ...values } : tag));

    return <div className="margin">
        {notice?.msg && <Toast onClose={() => setNotice(null)} type={notice.status} message={notice.msg} />}
        <h1 className="boldHeading">Package Tags</h1>
        <p>Tags are shared by all package types and are used by package blocks in the page editor.</p>
        <div className="body-wrapper justify-start" style={{ margin: "20px 0" }}>
            <input value={newLabel} onChange={event => setNewLabel(event.target.value)} placeholder="New tag name" />
            <button type="button" className="primary-btn blue" onClick={add}>Add Tag</button>
        </div>
        {tags.map(tag => <div key={tag.id} className="body-wrapper justify-start" style={{ background: "#eee", margin: "12px 0", padding: 16, gap: 12 }}>
            <label>Name <input value={tag.label} onChange={event => patchTag(tag.id, { label: event.target.value })} /></label>
            <label>Order <input type="number" value={tag.order ?? 0} onChange={event => patchTag(tag.id, { order: Number(event.target.value) })} /></label>
            <button type="button" className="primary-btn blue" onClick={() => save(tag)}>Save</button>
        </div>)}
        {!tags.length && <p>No package tags have been created yet.</p>}
    </div>;
}
