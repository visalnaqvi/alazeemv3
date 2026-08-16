import { RESERVED_SLUGS } from "@/config/pageRegistry";

export const createBlockId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return `block-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const TAB_CHILD_BLOCK_TYPES = [
    "heading", "paragraph", "list", "image", "card", "slider", "table", "cta", "packages", "flightFares"
];

export const PAGE_BLOCK_TYPES = [...TAB_CHILD_BLOCK_TYPES, "tabs"];

export const getBlockTypeLabel = type => {
    if (type === "flightFares") return "flight fares";
    if (type === "slider") return "image slider";
    if (type === "tabs") return "tabs / filter";
    return type;
};

export const normalizeSlug = value => String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const validateSlug = value => {
    const slug = normalizeSlug(value);
    if (!slug) return "Enter a page URL slug.";
    if (slug.length < 2 || slug.length > 80) return "The slug must be between 2 and 80 characters.";
    if (RESERVED_SLUGS.includes(slug)) return "That URL is reserved by an existing page.";
    return "";
};

export const createBlock = type => {
    const base = { id: createBlockId(), type };
    switch (type) {
        case "heading": return { ...base, level: 2, text: "", align: "left" };
        case "paragraph": return { ...base, text: "" };
        case "list": return { ...base, ordered: false, iconList: false, bold: false, items: [""] };
        case "image": return {
            ...base,
            url: "",
            storagePath: "",
            alt: "",
            caption: "",
            size: "fullWidth",
            rounded: false,
            shadow: false
        };
        case "card": return {
            ...base,
            heading: "",
            content: "",
            imageUrl: "",
            imageStoragePath: "",
            imageAlt: "",
            imagePosition: "right",
            buttonText: "",
            buttonHref: "",
            buttonNewTab: false
        };
        case "slider": return { ...base, images: [] };
        case "table": return { ...base, caption: "", headers: ["Column 1", "Column 2"], rows: [["", ""]] };
        case "cta": return { ...base, text: "Contact us", href: "tel:+919811136987", newTab: false };
        case "packages": return {
            ...base,
            source: "umrah",
            city: "all",
            groupTagIds: []
        };
        case "flightFares": return { ...base, heading: "Flight Fares" };
        case "tabs": {
            const firstTabId = createBlockId();
            const secondTabId = createBlockId();
            return {
                ...base,
                label: "",
                defaultTabId: firstTabId,
                tabs: [
                    { id: firstTabId, label: "Tab 1", blocks: [] },
                    { id: secondTabId, label: "Tab 2", blocks: [] }
                ]
            };
        }
        default: throw new Error(`Unsupported block type: ${type}`);
    }
};

export const moveItem = (items, from, to) => {
    if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return items;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
};

const validateBlockList = (blocks, prefix = "Block", allowTabs = true) => {
    if (!Array.isArray(blocks)) return `${prefix}s must be a valid list.`;
    for (let index = 0; index < blocks.length; index += 1) {
        const block = blocks[index];
        const name = `${prefix} ${index + 1}`;
        if (!block || typeof block !== "object") return `${name}: select a valid block type.`;
        if (!allowTabs && !TAB_CHILD_BLOCK_TYPES.includes(block.type)) return `${name}: tabs and system blocks cannot be placed inside a tab.`;
        if (block.type === "heading" && !block.text?.trim()) return `${name}: heading text is required.`;
        if (block.type === "paragraph" && !block.text?.trim()) return `${name}: paragraph text is required.`;
        if (block.type === "list" && (!block.items?.length || block.items.some(item => !item?.trim()))) return `${name}: list items cannot be empty.`;
        if (block.type === "image" && (!block.url || !block.alt?.trim())) return `${name}: upload an image and add alt text.`;
        if (block.type === "card") {
            if (!block.heading?.trim()) return `${name}: card heading is required.`;
            if (!block.content?.trim()) return `${name}: card content is required.`;
            if (!block.imageUrl || !block.imageAlt?.trim()) return `${name}: upload a card image and add alt text.`;
            const hasButton = Boolean(block.buttonText?.trim() || block.buttonHref?.trim());
            if (hasButton && (!block.buttonText?.trim() || !/^(\/|https?:\/\/|mailto:|tel:|#)/i.test(block.buttonHref || ""))) {
                return `${name}: card button text and a valid link are required when a button is added.`;
            }
        }
        if (block.type === "slider") {
            if (!Array.isArray(block.images) || block.images.length < 2 || block.images.length > 3) return `${name}: image sliders require 2 to 3 images.`;
            if (block.images.some(image => !image?.url || !image?.alt?.trim())) return `${name}: every slider image needs an image and alt text.`;
        }
        if (block.type === "table" && (!block.headers?.length || block.headers.some(cell => !cell?.trim()))) return `${name}: table headers cannot be empty.`;
        if (block.type === "cta" && (!block.text?.trim() || !/^(\/|https?:\/\/|mailto:|tel:|#)/i.test(block.href || ""))) return `${name}: CTA text and a valid link are required.`;
        if (block.type === "packages" && !["umrah", "hajj", "iraq", "turkey", "holiday"].includes(block.source)) return `${name}: select a valid package source.`;
        if (block.type === "tabs") {
            if (!allowTabs) return `${name}: nested tabs are not supported.`;
            if (!Array.isArray(block.tabs) || !block.tabs.length) return `${name}: add at least one tab.`;
            const labels = block.tabs.map(tab => tab?.label?.trim().toLowerCase());
            if (labels.some(label => !label)) return `${name}: tab names cannot be empty.`;
            if (new Set(labels).size !== labels.length) return `${name}: tab names must be unique.`;
            const tabIds = block.tabs.map(tab => tab?.id).filter(Boolean);
            if (tabIds.length !== block.tabs.length || new Set(tabIds).size !== tabIds.length) return `${name}: tabs must have unique IDs.`;
            if (!tabIds.includes(block.defaultTabId)) return `${name}: select a valid default tab.`;
            for (let tabIndex = 0; tabIndex < block.tabs.length; tabIndex += 1) {
                const tab = block.tabs[tabIndex];
                if (!Array.isArray(tab.blocks) || !tab.blocks.length) return `${name}, tab "${tab.label.trim()}": add at least one content block.`;
                const childError = validateBlockList(tab.blocks, `${name}, tab "${tab.label.trim()}", block`, false);
                if (childError) return childError;
            }
        }
    }
    return "";
};

export const validateBlocks = blocks => validateBlockList(blocks);

export const normalizeNavItem = (item, index = 0) => {
    const rawHref = item.href || item.link || "/";
    const href = /^https?:\/\//.test(rawHref) || rawHref.startsWith("/") ? rawHref : `/${rawHref}`;
    return {
        id: item.id,
        label: item.label || item.title || "Untitled link",
        targetType: item.targetType || (item.pageKey ? "page" : "route"),
        pageKey: item.pageKey || "",
        href,
        visible: typeof item.visible === "boolean" ? item.visible : item.active !== false,
        order: Number.isFinite(item.order) ? item.order : index
    };
};
