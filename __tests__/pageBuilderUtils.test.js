import { PAGE_BLOCK_TYPES, TAB_CHILD_BLOCK_TYPES, createBlock, moveItem, normalizeNavItem, normalizeSlug, validateBlocks, validateSlug } from "@/services/pageBuilderUtils";

describe("page builder utilities", () => {
    test("normalizes and validates custom page slugs", () => {
        expect(normalizeSlug(" About Our Trips! ")).toBe("about-our-trips");
        expect(validateSlug("about-our-trips")).toBe("");
        expect(validateSlug("admin-panel")).toMatch(/reserved/i);
        expect(validateSlug("!")).toMatch(/enter/i);
    });

    test("creates supported editable block shapes", () => {
        expect(PAGE_BLOCK_TYPES).toContain("slider");
        expect(TAB_CHILD_BLOCK_TYPES).toContain("slider");
        expect(PAGE_BLOCK_TYPES).toContain("card");
        expect(TAB_CHILD_BLOCK_TYPES).toContain("card");
        expect(createBlock("heading")).toMatchObject({ type: "heading", level: 2, text: "", align: "left" });
        expect(createBlock("list")).toMatchObject({ type: "list", ordered: false, iconList: false, bold: false, items: [""] });
        expect(createBlock("image")).toMatchObject({ type: "image", size: "fullWidth", rounded: false, shadow: false });
        expect(createBlock("slider")).toMatchObject({ type: "slider", images: [] });
        expect(createBlock("card")).toMatchObject({
            type: "card", heading: "", content: "", imageUrl: "", imageAlt: "", imagePosition: "right",
            buttonText: "", buttonHref: "", buttonNewTab: false
        });
        expect(createBlock("table")).toMatchObject({ type: "table", headers: ["Column 1", "Column 2"], rows: [["", ""]] });
        expect(createBlock("packages")).toMatchObject({ type: "packages", source: "umrah", groupTagIds: [] });
        expect(createBlock("flightFares")).toMatchObject({ type: "flightFares" });
        const tabs = createBlock("tabs");
        expect(tabs).toMatchObject({
            type: "tabs",
            label: "",
            defaultTabId: tabs.tabs[0].id,
            tabs: [
                { label: "Tab 1", blocks: [] },
                { label: "Tab 2", blocks: [] }
            ]
        });
        expect(new Set([tabs.id, ...tabs.tabs.map(tab => tab.id)]).size).toBe(3);
    });

    test("moves blocks without mutating the source", () => {
        const source = ["a", "b", "c"];
        expect(moveItem(source, 0, 2)).toEqual(["b", "c", "a"]);
        expect(source).toEqual(["a", "b", "c"]);
    });

    test("requires meaningful editable block content", () => {
        expect(validateBlocks([{ type: "heading", text: "" }])).toMatch(/heading text/i);
        expect(validateBlocks([{ type: "image", url: "https://example.com/a.jpg", alt: "" }])).toMatch(/alt text/i);
        expect(validateBlocks([{ type: "card", heading: "Offer", content: "Details", imageUrl: "/offer.jpg", imageAlt: "Offer", buttonText: "", buttonHref: "" }])).toBe("");
        expect(validateBlocks([{ type: "card", heading: "Offer", content: "Details", imageUrl: "/offer.jpg", imageAlt: "Offer", buttonText: "Book", buttonHref: "" }])).toMatch(/valid link/i);
        expect(validateBlocks([{ type: "slider", images: [{ id: "1", url: "/one.jpg", alt: "One" }] }])).toMatch(/2 to 3 images/i);
        expect(validateBlocks([{ type: "slider", images: [
            { id: "1", url: "/one.jpg", alt: "One" },
            { id: "2", url: "/two.jpg", alt: "" }
        ] }])).toMatch(/every slider image/i);
        expect(validateBlocks([{ type: "slider", images: [
            { id: "1", url: "/one.jpg", alt: "One" },
            { id: "2", url: "/two.jpg", alt: "Two" },
            { id: "3", url: "/three.jpg", alt: "Three" },
            { id: "4", url: "/four.jpg", alt: "Four" }
        ] }])).toMatch(/2 to 3 images/i);
        expect(validateBlocks([{ type: "slider", images: [
            { id: "1", url: "/one.jpg", alt: "One" },
            { id: "2", url: "/two.jpg", alt: "Two" }
        ] }])).toBe("");
        expect(validateBlocks([{ type: "paragraph", text: "Ready" }])).toBe("");
        expect(validateBlocks([{ type: "cta", text: "Call", href: "tel:+91123" }])).toBe("");
        expect(validateBlocks([{ type: "packages", source: "unknown" }])).toMatch(/valid package source/i);
    });

    test("recursively validates tab names, defaults, and child content", () => {
        const tabs = createBlock("tabs");
        const validTabs = {
            ...tabs,
            tabs: tabs.tabs.map((tab, index) => ({
                ...tab,
                label: index === 0 ? "Delhi" : "Lucknow",
                blocks: [{ id: `copy-${index}`, type: "paragraph", text: `Panel ${index + 1}` }]
            }))
        };
        expect(validateBlocks([validTabs])).toBe("");
        expect(validateBlocks([{ ...validTabs, defaultTabId: "missing" }])).toMatch(/valid default tab/i);
        expect(validateBlocks([{ ...validTabs, tabs: validTabs.tabs.map(tab => ({ ...tab, label: "Delhi" })) }])).toMatch(/unique/i);
        expect(validateBlocks([{ ...validTabs, tabs: [{ ...validTabs.tabs[0], blocks: [] }] }])).toMatch(/add at least one content block/i);
        expect(validateBlocks([{ ...validTabs, tabs: [{ ...validTabs.tabs[0], blocks: [{ id: "nested", type: "tabs", tabs: [] }] }] }])).toMatch(/cannot be placed inside a tab/i);
        expect(validateBlocks([{ ...validTabs, tabs: [{ ...validTabs.tabs[0], blocks: [{ id: "locked", type: "system" }] }] }])).toMatch(/cannot be placed inside a tab/i);
    });

    test("normalizes legacy navigation records", () => {
        expect(normalizeNavItem({ id: "1", title: "Forex", link: "forex", active: false }, 3)).toEqual({
            id: "1", label: "Forex", targetType: "route", pageKey: "", href: "/forex", visible: false, order: 3
        });
    });
});
