import Head from "next/head";
import { useEffect, useId, useRef, useState } from "react";
import CarouselComp from "@/components/carousel/carousel";
import IconList from "@/components/lists/iconList";
import PackageBlock from "./PackageBlock";
import FlightFaresBlock from "./FlightFaresBlock";
import styles from "./pageBuilder.module.css";

const Heading = ({ block }) => {
    const Tag = [1, 2, 3].includes(Number(block.level)) ? `h${block.level}` : "h2";
    const align = ["left", "center", "right"].includes(block.align) ? block.align : "left";
    return <Tag className={Number(block.level) === 1 ? "boldHeading" : "subHeading"} style={{ textAlign: align }}>{block.text}</Tag>;
};

const RenderedBlock = ({ block, systemComponents }) => {
    if (block.type === "system") {
        const SystemComponent = systemComponents[block.systemKey];
        return <div className={styles.block}>
            {typeof SystemComponent === "function" ? <SystemComponent /> : SystemComponent || null}
        </div>;
    }
    if (block.type === "heading") return <div className={`${styles.block} ${styles.contentBlock}`}><Heading block={block} /></div>;
    if (block.type === "paragraph") return <p className={`${styles.block} ${styles.contentBlock} ${styles.paragraph}`}>{block.text}</p>;
    if (block.type === "list") {
        if (block.iconList) return <div className={`${styles.block} ${styles.contentBlock} ${styles.iconList}`}>
            <IconList items={block.items} bold={Boolean(block.bold)} big />
        </div>;
        const Tag = block.ordered ? "ol" : "ul";
        return <Tag className={`${styles.block} ${styles.contentBlock} ${styles.list} ${block.bold ? styles.boldList : ""}`}>{block.items.map((item, index) => <li key={index}>{item}</li>)}</Tag>;
    }
    if (block.type === "image") return <figure className={`${styles.block} ${styles.imageBlock}`}>
        <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture>
                {block.mobileUrl && <source media="(max-width: 700px)" srcSet={block.mobileUrl} />}
                <img
                    className={`${styles.image} ${block.size === "original" ? styles.imageOriginal : styles.imageFullWidth} ${block.rounded ? styles.imageRounded : ""} ${block.shadow ? styles.imageShadow : ""}`}
                    src={block.url}
                    alt={block.alt}
                />
            </picture>
        </div>
        {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
    </figure>;
    if (block.type === "card") {
        const hasButton = Boolean(block.buttonText?.trim() && block.buttonHref?.trim());
        return <article className={`${styles.block} ${styles.contentBlock} ${styles.featureCard} ${block.imagePosition === "left" ? styles.featureCardImageLeft : ""}`}>
            <div className={styles.featureCardImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.featureCardImage} src={block.imageUrl} alt={block.imageAlt} />
            </div>
            <div className={styles.featureCardContent}>
                <h2 className={styles.featureCardHeading}>{block.heading}</h2>
                <p className={styles.featureCardText}>{block.content}</p>
                {hasButton && <a href={block.buttonHref} target={block.buttonNewTab ? "_blank" : undefined} rel={block.buttonNewTab ? "noopener noreferrer" : undefined} className="primary-btn blue">{block.buttonText}</a>}
            </div>
        </article>;
    }
    if (block.type === "slider") return <section className={`${styles.block} ${styles.sliderBlock}`} aria-label="Image slider">
        <CarouselComp images={Array.isArray(block.images) ? block.images : []} fixedFrame />
    </section>;
    if (block.type === "table") return <div className={`${styles.block} ${styles.contentBlock} ${styles.tableWrap}`}>
        <table className={styles.table}>
            {block.caption && <caption>{block.caption}</caption>}
            <thead><tr>{block.headers.map((cell, index) => <th key={index}>{cell}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
        </table>
    </div>;
    if (block.type === "cta") return <div className={`${styles.block} ${styles.contentBlock} ${styles.cta}`}><a href={block.href} target={block.newTab ? "_blank" : undefined} rel={block.newTab ? "noopener noreferrer" : undefined} className="primary-btn blue">{block.text}</a></div>;
    if (block.type === "packages") return <div className={styles.block}><PackageBlock block={block} /></div>;
    if (block.type === "flightFares") return <div className={styles.block}><FlightFaresBlock block={block} /></div>;
    if (block.type === "tabs") return <TabsBlock block={block} systemComponents={systemComponents} />;
    return null;
};

const BlockList = ({ blocks, systemComponents }) => (blocks || []).map(block =>
    <RenderedBlock block={block} systemComponents={systemComponents} key={block.id} />
);

const TabsBlock = ({ block, systemComponents }) => {
    const tabs = Array.isArray(block.tabs) ? block.tabs : [];
    const configuredDefault = tabs.some(tab => tab.id === block.defaultTabId) ? block.defaultTabId : tabs[0]?.id;
    const [activeTabId, setActiveTabId] = useState(configuredDefault);
    const tabRefs = useRef([]);
    const reactId = useId().replace(/:/g, "");
    const tabIds = tabs.map(tab => tab.id).join("|");

    useEffect(() => {
        const nextDefault = tabs.some(tab => tab.id === block.defaultTabId) ? block.defaultTabId : tabs[0]?.id;
        setActiveTabId(nextDefault);
    // Reset when the configured default or available tabs change in a live preview.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [block.defaultTabId, tabIds]);

    if (!tabs.length) return null;
    const activeIndex = Math.max(0, tabs.findIndex(tab => tab.id === activeTabId));
    const activeTab = tabs[activeIndex];
    const focusTab = index => {
        const wrappedIndex = (index + tabs.length) % tabs.length;
        setActiveTabId(tabs[wrappedIndex].id);
        tabRefs.current[wrappedIndex]?.focus();
    };
    const handleKeyDown = (event, index) => {
        if (event.key === "ArrowRight") { event.preventDefault(); focusTab(index + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); focusTab(index - 1); }
        if (event.key === "Home") { event.preventDefault(); focusTab(0); }
        if (event.key === "End") { event.preventDefault(); focusTab(tabs.length - 1); }
    };
    const panelId = `${reactId}-panel-${activeTab.id}`;

    return <section className={`${styles.block} ${styles.contentBlock} ${styles.tabsBlock}`}>
        <div className={styles.tabsHeader}>
            {block.label?.trim() && <span className={styles.tabsLabel}>{block.label}</span>}
            <div className={styles.tabList} role="tablist" aria-label={block.label?.trim() || "Content filters"}>
                {tabs.map((tab, index) => {
                    const selected = tab.id === activeTab.id;
                    return <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`${reactId}-tab-${tab.id}`}
                        aria-selected={selected}
                        aria-controls={`${reactId}-panel-${tab.id}`}
                        tabIndex={selected ? 0 : -1}
                        className={`${styles.tabButton} ${selected ? styles.activeTabButton : ""}`}
                        onClick={() => setActiveTabId(tab.id)}
                        onKeyDown={event => handleKeyDown(event, index)}
                        ref={element => { tabRefs.current[index] = element; }}
                    >{tab.label}</button>;
                })}
            </div>
        </div>
        <div id={panelId} role="tabpanel" aria-labelledby={`${reactId}-tab-${activeTab.id}`} className={styles.tabPanel}>
            <BlockList blocks={activeTab.blocks} systemComponents={systemComponents} />
        </div>
    </section>;
};

export default function PageRenderer({ page, version, systemComponents = {} }) {
    if (!version) return <div className={styles.empty}>Page content is unavailable.</div>;
    return <>
        <Head>
            <title>{version.seoTitle || page?.title || "Al Azeem Tours"}</title>
            {version.seoDescription && <meta name="description" content={version.seoDescription} />}
            {version.seoKeywords && <meta name="keywords" content={version.seoKeywords} />}
        </Head>
        <div>
            <BlockList blocks={version.blocks} systemComponents={systemComponents} />
        </div>
    </>;
}
