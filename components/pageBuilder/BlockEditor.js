import { useEffect, useRef, useState } from "react";
import { uploadPageImage } from "@/services/media";
import { PACKAGE_SOURCES, getPackageSource } from "@/config/packageSources";
import { loadPackageEditorOptions } from "@/services/packageBlocks";
import { TAB_CHILD_BLOCK_TYPES, createBlock, createBlockId, getBlockTypeLabel, moveItem } from "@/services/pageBuilderUtils";
import styles from "./pageBuilder.module.css";

const getNextTabLabel = tabs => {
    const usedLabels = new Set(tabs.map(tab => tab.label?.trim().toLowerCase()));
    let number = tabs.length + 1;
    while (usedLabels.has(`tab ${number}`)) number += 1;
    return `Tab ${number}`;
};

function NestedBlockListEditor({ blocks, pageKey, onChange, onError }) {
    const [dragIndex, setDragIndex] = useState(null);
    const changeBlock = (index, nextBlock) => onChange(blocks.map((block, i) => i === index ? nextBlock : block));

    return <div className={styles.nestedBlockList}>
        <div className={styles.toolbar}>
            <strong>Add content:</strong>
            {TAB_CHILD_BLOCK_TYPES.map(type => <button
                type="button"
                className="primary-btn blue"
                key={type}
                onClick={() => onChange([...blocks, createBlock(type)])}
            >{getBlockTypeLabel(type)}</button>)}
        </div>
        {blocks.map((childBlock, index) => <BlockEditor
            key={childBlock.id}
            block={childBlock}
            index={index}
            count={blocks.length}
            pageKey={pageKey}
            onChange={next => changeBlock(index, next)}
            onMove={(from, to) => onChange(moveItem(blocks, from, to))}
            onDelete={() => onChange(blocks.filter((_, i) => i !== index))}
            onDragStart={setDragIndex}
            onDrop={target => {
                if (dragIndex !== null) onChange(moveItem(blocks, dragIndex, target));
                setDragIndex(null);
            }}
            onError={onError}
        />)}
        {!blocks.length && <p className={styles.emptyTab}>Add at least one content block to this tab.</p>}
    </div>;
}

export default function BlockEditor({ block, index, count, pageKey, onChange, onMove, onDelete, onDragStart, onDrop, onError, defaultExpanded = false }) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [uploading, setUploading] = useState(false);
    const [sliderUploadStates, setSliderUploadStates] = useState({});
    const [sliderNotice, setSliderNotice] = useState(null);
    const [packageOptions, setPackageOptions] = useState({ tags: [], cities: [] });
    const blockRef = useRef(block);
    useEffect(() => { blockRef.current = block; }, [block]);
    const patch = values => onChange({ ...block, ...values });
    const updateListItem = (itemIndex, value) => patch({ items: block.items.map((item, i) => i === itemIndex ? value : item) });
    const updateHeader = (cellIndex, value) => patch({ headers: block.headers.map((cell, i) => i === cellIndex ? value : cell) });
    const updateCell = (rowIndex, cellIndex, value) => patch({ rows: block.rows.map((row, r) => r === rowIndex ? row.map((cell, c) => c === cellIndex ? value : cell) : row) });

    const addColumn = () => patch({
        headers: [...block.headers, `Column ${block.headers.length + 1}`],
        rows: block.rows.map(row => [...row, ""])
    });
    const removeColumn = columnIndex => {
        if (block.headers.length === 1) return;
        patch({ headers: block.headers.filter((_, i) => i !== columnIndex), rows: block.rows.map(row => row.filter((_, i) => i !== columnIndex)) });
    };

    const sliderImages = block.type === "slider" && Array.isArray(block.images) ? block.images : [];
    const updateSliderImages = updater => {
        const currentBlock = blockRef.current;
        const currentImages = Array.isArray(currentBlock.images) ? currentBlock.images : [];
        const nextBlock = { ...currentBlock, images: updater(currentImages) };
        blockRef.current = nextBlock;
        onChange(nextBlock);
    };
    const updateSliderImage = (imageId, values) => updateSliderImages(images =>
        images.map(image => image.id === imageId ? { ...image, ...values } : image)
    );
    const setSliderUploadState = (key, state) => setSliderUploadStates(current => ({ ...current, [key]: state }));
    const getDefaultAlt = fileName => fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
    const uploadSliderFiles = async files => {
        if (!files.length) return;
        if (sliderImages.length + files.length > 3) {
            setSliderNotice({ type: "error", text: `You can add ${3 - sliderImages.length} more slider image${3 - sliderImages.length === 1 ? "" : "s"}.` });
            return;
        }
        const pendingSlides = files.map(file => ({
            id: createBlockId(), url: "", storagePath: "", mobileUrl: "", mobileStoragePath: "", alt: getDefaultAlt(file.name)
        }));
        updateSliderImages(images => [...images, ...pendingSlides]);
        setSliderUploadStates(current => ({
            ...current,
            ...Object.fromEntries(pendingSlides.map(slide => [`desktop-${slide.id}`, "uploading"]))
        }));
        setSliderNotice({ type: "info", text: `Uploading ${files.length} image${files.length === 1 ? "" : "s"}...` });
        setUploading(true);
        const results = await Promise.allSettled(files.map((file, fileIndex) =>
            uploadPageImage(pageKey, file).then(upload => {
                if (!upload?.url) throw new Error("The upload completed without an image URL.");
                updateSliderImage(pendingSlides[fileIndex].id, upload);
                setSliderUploadState(`desktop-${pendingSlides[fileIndex].id}`, "success");
            }).catch(error => {
                setSliderUploadState(`desktop-${pendingSlides[fileIndex].id}`, "error");
                throw error;
            })
        ));
        const failed = results.filter(result => result.status === "rejected");
        setUploading(false);
        if (failed.length) {
            const message = failed[0].reason?.message || "The image upload failed.";
            setSliderNotice({ type: "error", text: `${failed.length} image upload${failed.length === 1 ? "" : "s"} failed: ${message}` });
            onError(message);
        } else {
            setSliderNotice({ type: "success", text: `${files.length} image${files.length === 1 ? "" : "s"} uploaded successfully.` });
        }
    };
    const uploadSlideImage = async (image, file, mobile = false) => {
        const stateKey = `${mobile ? "mobile" : "desktop"}-${image.id}`;
        setSliderUploadState(stateKey, "uploading");
        setSliderNotice(null);
        setUploading(true);
        try {
            const upload = await uploadPageImage(pageKey, file);
            if (!upload?.url) throw new Error("The upload completed without an image URL.");
            updateSliderImage(image.id, mobile
                ? { mobileUrl: upload.url, mobileStoragePath: upload.storagePath }
                : { ...upload, alt: image.alt || getDefaultAlt(file.name) });
            setSliderUploadState(stateKey, "success");
            setSliderNotice({ type: "success", text: `${mobile ? "Mobile" : "Desktop"} image uploaded successfully.` });
        } catch (error) {
            setSliderUploadState(stateKey, "error");
            setSliderNotice({ type: "error", text: error.message || "The image upload failed." });
            onError(error.message);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (!isExpanded || block.type !== "packages") return;
        let active = true;
        loadPackageEditorOptions(block.source).then(options => active && setPackageOptions(options)).catch(error => onError(error.message));
        return () => { active = false; };
    }, [isExpanded, block.type, block.source, onError]);

    const packageSource = block.type === "packages" ? getPackageSource(block.source) : null;
    const tabs = block.type === "tabs" && Array.isArray(block.tabs) ? block.tabs : [];
    const updateTab = (tabIndex, values) => patch({ tabs: tabs.map((tab, i) => i === tabIndex ? { ...tab, ...values } : tab) });
    const removeTab = tabIndex => {
        const remainingTabs = tabs.filter((_, i) => i !== tabIndex);
        const removedTab = tabs[tabIndex];
        patch({
            tabs: remainingTabs,
            defaultTabId: block.defaultTabId === removedTab?.id ? remainingTabs[0]?.id || "" : block.defaultTabId
        });
    };
    const addTab = () => {
        const newTab = { id: createBlockId(), label: getNextTabLabel(tabs), blocks: [] };
        patch({ tabs: [...tabs, newTab], defaultTabId: block.defaultTabId || newTab.id });
    };

    return <section
        className={`${styles.blockEditor} ${!isExpanded ? styles.blockEditorCollapsed : ""} ${block.type === "system" ? styles.systemBlock : ""}`}
        draggable
        onDragStart={event => { event.stopPropagation(); onDragStart(index); }}
        onDragOver={event => event.preventDefault()}
        onDrop={event => { event.preventDefault(); event.stopPropagation(); onDrop(index); }}
    >
        <div className={styles.blockHeader}>
            <button
                type="button"
                className={styles.blockToggle}
                aria-expanded={isExpanded}
                aria-controls={`block-editor-body-${block.id}`}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${block.type === "system" ? block.label : getBlockTypeLabel(block.type)} component`}
                onClick={() => setIsExpanded(current => !current)}
            >
                <span className={`${styles.blockToggleIcon} ${isExpanded ? styles.blockToggleIconExpanded : ""}`} aria-hidden="true">&gt;</span>
                <span className={styles.blockType}>{index + 1}. {block.type === "system" ? block.label : getBlockTypeLabel(block.type)}</span>
            </button>
            <div className={styles.toolbar}>
                <button type="button" className="primary-btn blue" disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label="Move block up">↑</button>
                <button type="button" className="primary-btn blue" disabled={index === count - 1} onClick={() => onMove(index, index + 1)} aria-label="Move block down">↓</button>
                {block.type !== "system" && <button type="button" className="primary-btn red" onClick={onDelete}>Delete</button>}
            </div>
        </div>

        {isExpanded && <div id={`block-editor-body-${block.id}`} className={styles.blockEditorBody}>
        {block.type === "system" && <p className={styles.muted}>This locked block preserves the existing page layout, packages, filters, and other application functionality. You can move it but cannot edit or delete it.</p>}
        {block.type === "heading" && <>
            <div className={styles.field}><label>Heading level</label><select value={block.level} onChange={event => patch({ level: Number(event.target.value) })}><option value={1}>H1</option><option value={2}>H2</option><option value={3}>H3</option></select></div>
            <div className={styles.field}><label>Heading text</label><input value={block.text} onChange={event => patch({ text: event.target.value })} /></div>
            <fieldset className={styles.alignmentField}>
                <legend>Heading alignment</legend>
                <div className={styles.alignmentOptions}>
                    {["left", "center", "right"].map(alignment => <label key={alignment}>
                        <input
                            type="radio"
                            name={`heading-alignment-${block.id}`}
                            value={alignment}
                            checked={(block.align || "left") === alignment}
                            onChange={event => patch({ align: event.target.value })}
                        />
                        {alignment[0].toUpperCase() + alignment.slice(1)}
                    </label>)}
                </div>
            </fieldset>
        </>}
        {block.type === "paragraph" && <div className={styles.field}><label>Paragraph</label><textarea value={block.text} onChange={event => patch({ text: event.target.value })} /></div>}
        {block.type === "list" && <>
            <div className={styles.listOptionList}>
                <label><input type="checkbox" checked={Boolean(block.ordered)} onChange={event => patch({ ordered: event.target.checked })} /> Numbered list</label>
                <label><input type="checkbox" checked={Boolean(block.iconList)} onChange={event => patch({ iconList: event.target.checked })} /> Icon list</label>
                <label><input type="checkbox" checked={Boolean(block.bold)} onChange={event => patch({ bold: event.target.checked })} /> Bold text</label>
            </div>
            <div style={{ marginTop: 12 }}>{block.items.map((item, itemIndex) => <div className={styles.listRow} key={itemIndex}>
                <input value={item} onChange={event => updateListItem(itemIndex, event.target.value)} aria-label={`List item ${itemIndex + 1}`} />
                <button type="button" className="primary-btn red" disabled={block.items.length === 1} onClick={() => patch({ items: block.items.filter((_, i) => i !== itemIndex) })}>Remove</button>
            </div>)}</div>
            <button type="button" className="primary-btn blue" onClick={() => patch({ items: [...block.items, ""] })}>Add item</button>
        </>}
        {block.type === "image" && <>
            {block.url && <div className={styles.imagePreviewWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={block.url}
                    alt="Upload preview"
                    className={`${styles.imagePreview} ${block.size === "original" ? styles.imageOriginal : styles.imageFullWidth} ${block.rounded ? styles.imageRounded : ""} ${block.shadow ? styles.imageShadow : ""}`}
                />
            </div>}
            <div className={styles.field}><label>Image file</label><input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={async event => {
                const file = event.target.files?.[0];
                if (!file) return;
                setUploading(true);
                try { patch(await uploadPageImage(pageKey, file)); } catch (error) { onError(error.message); } finally { setUploading(false); }
            }} />{uploading && <p>Uploading…</p>}</div>
            <div className={styles.field}><label>Image URL</label><input value={block.url || ""} onChange={event => patch({ url: event.target.value, storagePath: "" })} placeholder="/images/photo.jpg or https://…" /></div>
            <div className={styles.field}><label>Alt text</label><input value={block.alt} onChange={event => patch({ alt: event.target.value })} /></div>
            <div className={styles.field}><label>Caption (optional)</label><input value={block.caption} onChange={event => patch({ caption: event.target.value })} /></div>
            <div className={styles.field}><label htmlFor={`image-size-${block.id}`}>Image size</label><select id={`image-size-${block.id}`} value={block.size === "original" ? "original" : "fullWidth"} onChange={event => patch({ size: event.target.value })}>
                <option value="original">Original size</option>
                <option value="fullWidth">Full width</option>
            </select></div>
            <div className={styles.imageOptionList}>
                <label><input type="checkbox" checked={Boolean(block.rounded)} onChange={event => patch({ rounded: event.target.checked })} /> Rounded border</label>
                <label><input type="checkbox" checked={Boolean(block.shadow)} onChange={event => patch({ shadow: event.target.checked })} /> Shadow</label>
            </div>
        </>}
        {block.type === "slider" && <>
            <p className={styles.muted}>Add 2 to 3 desktop images. You can also add a separate mobile image for every slide; the desktop image is used as its fallback.</p>
            {sliderNotice && <div className={`${styles.sliderNotice} ${styles[sliderNotice.type]}`} role={sliderNotice.type === "error" ? "alert" : "status"}>{sliderNotice.text}</div>}
            <div className={styles.field}>
                <label htmlFor={`slider-files-${block.id}`}>Slider image files</label>
                <input
                    id={`slider-files-${block.id}`}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    disabled={uploading || sliderImages.length >= 3}
                    onChange={event => {
                        const files = Array.from(event.target.files || []);
                        event.target.value = "";
                        uploadSliderFiles(files);
                    }}
                />
                <span className={styles.muted}>Select one or more desktop images. JPEG, PNG, or WebP; maximum 5 MB each.</span>
            </div>
            <div className={styles.toolbar}>
                <button
                    type="button"
                    className="primary-btn blue"
                    disabled={uploading || sliderImages.length >= 3}
                    onClick={() => updateSliderImages(images => [...images, { id: createBlockId(), url: "", storagePath: "", mobileUrl: "", mobileStoragePath: "", alt: "" }])}
                >Add image by URL</button>
                <span className={styles.muted}>{sliderImages.length} of 3 images added</span>
            </div>
            <div className={styles.sliderEditorList}>{sliderImages.map((image, imageIndex) => <section className={styles.sliderEditorItem} key={image.id || imageIndex}>
                <div className={styles.sliderEditorHeader}>
                    <strong>Slide {imageIndex + 1}</strong>
                    <div className={styles.toolbar}>
                        <button type="button" className="primary-btn blue" disabled={imageIndex === 0} onClick={() => updateSliderImages(images => moveItem(images, imageIndex, imageIndex - 1))} aria-label={`Move slide ${imageIndex + 1} left`}>←</button>
                        <button type="button" className="primary-btn blue" disabled={imageIndex === sliderImages.length - 1} onClick={() => updateSliderImages(images => moveItem(images, imageIndex, imageIndex + 1))} aria-label={`Move slide ${imageIndex + 1} right`}>→</button>
                        <button type="button" className="primary-btn red" disabled={uploading} onClick={() => updateSliderImages(images => images.filter(item => item.id !== image.id))} aria-label={`Remove slide ${imageIndex + 1}`}>Remove</button>
                    </div>
                </div>
                {image.url && <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.sliderEditorPreview} src={image.url} alt={`Slide ${imageIndex + 1} preview`} />
                </>}
                <div className={styles.field}>
                    <label htmlFor={`slider-replace-${block.id}-${image.id}`}>{image.url ? "Replace desktop image" : "Upload desktop image"}</label>
                    <input id={`slider-replace-${block.id}-${image.id}`} type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={event => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        if (file) uploadSlideImage(image, file);
                    }} />
                    {sliderUploadStates[`desktop-${image.id}`] === "uploading" && <span className={styles.muted}>Uploading desktop image...</span>}
                    {sliderUploadStates[`desktop-${image.id}`] === "error" && <span className={styles.inlineError}>Desktop upload failed. Choose the file again to retry.</span>}
                </div>
                <div className={styles.field}><label htmlFor={`slider-url-${block.id}-${image.id}`}>Desktop image URL</label><input id={`slider-url-${block.id}-${image.id}`} value={image.url || ""} onChange={event => updateSliderImage(image.id, { url: event.target.value, storagePath: "" })} placeholder="/images/photo.jpg or https://..." /></div>
                <div className={styles.sliderMobileEditor}>
                    <strong>Mobile image (optional)</strong>
                    <p className={styles.muted}>If empty, this slide uses the desktop image on mobile.</p>
                    {image.mobileUrl && <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={`${styles.sliderEditorPreview} ${styles.sliderMobilePreview}`} src={image.mobileUrl} alt={`Slide ${imageIndex + 1} mobile preview`} />
                    </>}
                    <div className={styles.field}>
                        <label htmlFor={`slider-mobile-${block.id}-${image.id}`}>{image.mobileUrl ? "Replace mobile image" : "Upload mobile image"}</label>
                        <input id={`slider-mobile-${block.id}-${image.id}`} type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={event => {
                            const file = event.target.files?.[0];
                            event.target.value = "";
                            if (file) uploadSlideImage(image, file, true);
                        }} />
                        {sliderUploadStates[`mobile-${image.id}`] === "uploading" && <span className={styles.muted}>Uploading mobile image...</span>}
                        {sliderUploadStates[`mobile-${image.id}`] === "error" && <span className={styles.inlineError}>Mobile upload failed. Choose the file again to retry.</span>}
                    </div>
                    <div className={styles.field}><label htmlFor={`slider-mobile-url-${block.id}-${image.id}`}>Mobile image URL</label><input id={`slider-mobile-url-${block.id}-${image.id}`} value={image.mobileUrl || ""} onChange={event => updateSliderImage(image.id, { mobileUrl: event.target.value, mobileStoragePath: "" })} placeholder="Optional mobile image URL" /></div>
                    {image.mobileUrl && <button type="button" onClick={() => updateSliderImage(image.id, { mobileUrl: "", mobileStoragePath: "" })}>Use desktop image on mobile</button>}
                </div>
                <div className={styles.field}><label htmlFor={`slider-alt-${block.id}-${image.id}`}>Alt text</label><input id={`slider-alt-${block.id}-${image.id}`} value={image.alt || ""} onChange={event => updateSliderImage(image.id, { alt: event.target.value })} /></div>
            </section>)}</div>
        </>}
        {block.type === "table" && <>
            <div className={styles.field}><label>Caption (optional)</label><input value={block.caption} onChange={event => patch({ caption: event.target.value })} /></div>
            <div className={styles.tableWrap}><table className={styles.editorTable}>
                <thead><tr>{block.headers.map((header, cellIndex) => <th key={cellIndex}>
                    <input className={styles.cellInput} value={header} onChange={event => updateHeader(cellIndex, event.target.value)} />
                    <button type="button" disabled={block.headers.length === 1} onClick={() => removeColumn(cellIndex)}>Remove column</button>
                </th>)}</tr></thead>
                <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}><input className={styles.cellInput} value={cell} onChange={event => updateCell(rowIndex, cellIndex, event.target.value)} /></td>)}<td><button type="button" className="primary-btn red" disabled={block.rows.length === 1} onClick={() => patch({ rows: block.rows.filter((_, i) => i !== rowIndex) })}>Remove row</button></td></tr>)}</tbody>
            </table></div>
            <div className={styles.toolbar} style={{ marginTop: 12 }}><button type="button" className="primary-btn blue" onClick={addColumn}>Add column</button><button type="button" className="primary-btn blue" onClick={() => patch({ rows: [...block.rows, block.headers.map(() => "")] })}>Add row</button></div>
        </>}
        {block.type === "cta" && <>
            <div className={styles.field}><label>Button text</label><input value={block.text || ""} onChange={event => patch({ text: event.target.value })} /></div>
            <div className={styles.field}><label>Link</label><input value={block.href || ""} onChange={event => patch({ href: event.target.value })} placeholder="/visa, https://…, tel:…, or mailto:…" /></div>
            <label><input type="checkbox" checked={Boolean(block.newTab)} onChange={event => patch({ newTab: event.target.checked })} /> Open in a new tab</label>
        </>}
        {block.type === "packages" && <>
            <div className={styles.field}><label htmlFor={`package-source-${block.id}`}>Package source</label><select id={`package-source-${block.id}`} value={block.source} onChange={event => patch({
                source: event.target.value, city: "all", groupTagIds: []
            })}>{PACKAGE_SOURCES.map(source => <option value={source.value} key={source.value}>{source.label}</option>)}</select></div>
            {packageSource?.supportsCity && <div className={styles.field}><label htmlFor={`package-city-${block.id}`}>City</label><select id={`package-city-${block.id}`} value={block.city || "all"} onChange={event => patch({ city: event.target.value })}><option value="all">All cities</option>{packageOptions.cities.map(city => <option value={city} key={city}>{city}</option>)}</select></div>}
            <div className={styles.field}><label>Package tags (none means all)</label><div className={styles.checkGrid}>{(packageOptions.tags || []).map(tag => <label key={tag.id}><input type="checkbox" checked={(block.groupTagIds || []).includes(tag.id)} onChange={event => patch({ groupTagIds: event.target.checked ? [...(block.groupTagIds || []), tag.id] : (block.groupTagIds || []).filter(id => id !== tag.id) })} /> {tag.label}</label>)}</div></div>
        </>}
        {block.type === "flightFares" && <div className={styles.field}><label>Heading (optional)</label><input value={block.heading || ""} onChange={event => patch({ heading: event.target.value })} /></div>}
        {block.type === "tabs" && <>
            <div className={styles.field}><label htmlFor={`tabs-label-${block.id}`}>Label before tabs (optional)</label><input id={`tabs-label-${block.id}`} value={block.label || ""} onChange={event => patch({ label: event.target.value })} placeholder="Flights From:" /></div>
            <div className={styles.tabEditorList}>{tabs.map((tab, tabIndex) => <section className={styles.tabEditor} key={tab.id}>
                <div className={styles.tabEditorHeader}>
                    <div className={styles.tabNameField}>
                        <label htmlFor={`tab-name-${tab.id}`}>Tab name</label>
                        <input id={`tab-name-${tab.id}`} value={tab.label || ""} onChange={event => updateTab(tabIndex, { label: event.target.value })} />
                    </div>
                    <label className={styles.defaultTabChoice}><input type="radio" name={`default-tab-${block.id}`} checked={block.defaultTabId === tab.id} onChange={() => patch({ defaultTabId: tab.id })} /> Default tab</label>
                    <div className={styles.toolbar}>
                        <button type="button" className="primary-btn blue" disabled={tabIndex === 0} onClick={() => patch({ tabs: moveItem(tabs, tabIndex, tabIndex - 1) })} aria-label={`Move ${tab.label || `tab ${tabIndex + 1}`} left`}>←</button>
                        <button type="button" className="primary-btn blue" disabled={tabIndex === tabs.length - 1} onClick={() => patch({ tabs: moveItem(tabs, tabIndex, tabIndex + 1) })} aria-label={`Move ${tab.label || `tab ${tabIndex + 1}`} right`}>→</button>
                        <button type="button" className="primary-btn red" disabled={tabs.length === 1} onClick={() => removeTab(tabIndex)}>Delete tab</button>
                    </div>
                </div>
                <NestedBlockListEditor blocks={Array.isArray(tab.blocks) ? tab.blocks : []} pageKey={pageKey} onChange={blocks => updateTab(tabIndex, { blocks })} onError={onError} />
            </section>)}</div>
            <button type="button" className="primary-btn blue" onClick={addTab}>Add tab</button>
        </>}
        </div>}
    </section>;
}
