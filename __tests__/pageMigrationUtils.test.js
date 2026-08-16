const { mergeLegacyBlocks, validateVersionSize } = require("../scripts/pageMigrationUtils");

describe("page migration safeguards", () => {
    const seed = { blocks: [{ id: "migrated-home-1", type: "paragraph", text: "Migrated" }] };

    test("replaces only the legacy marker and preserves admin blocks around it", () => {
        const existing = { seoTitle: "Custom", blocks: [
            { id: "before", type: "heading", text: "Before" },
            { id: "legacy", type: "system", systemKey: "legacy-page" },
            { id: "after", type: "paragraph", text: "After" }
        ] };
        const result = mergeLegacyBlocks(existing, seed, "home");
        expect(result.status).toBe("replace-legacy");
        expect(result.version.blocks.map(block => block.id)).toEqual(["before", "migrated-home-1", "after"]);
        expect(result.version.seoTitle).toBe("Custom");
    });

    test("is idempotent and refuses ambiguous existing content", () => {
        expect(mergeLegacyBlocks(seed, seed, "home").status).toBe("already-migrated");
        expect(() => mergeLegacyBlocks({ blocks: [{ id: "custom", type: "paragraph", text: "Do not overwrite" }] }, seed, "home")).toThrow(/refusing to overwrite/i);
    });

    test("validates the Firestore document size", () => {
        expect(validateVersionSize(seed, "home")).toBeGreaterThan(0);
        expect(() => validateVersionSize({ blocks: [{ text: "x".repeat(951000) }] }, "huge")).toThrow(/too large/i);
    });
});
