const {
    buildTagMigration,
    chunkItems,
    migratePackageRecord,
    migratePageBlocks
} = require("../scripts/packageTagsMigrationUtils");

describe("package tag migration", () => {
    const sections = [
        { id: "u1", title: "Summer Trips", page: "hajjUmrah", order: 2 },
        { id: "i1", title: " Summer   Trips ", page: "iraq", order: 1 },
        { id: "u2", title: "Winter Trips", page: "hajjUmrah", order: 3 }
    ];

    test("deduplicates legacy headings and records every old ID", () => {
        const result = buildTagMigration(sections);
        expect(result.tags).toHaveLength(2);
        expect(result.tags.find(tag => tag.id === "summer-trips")).toMatchObject({
            label: "Summer Trips", order: 1, legacySectionIds: ["i1", "u1"]
        });
        expect(result.sectionToTag.get("u1")).toBe("summer-trips");
    });

    test("copies package assignments without removing existing tags", () => {
        const { sectionToTag } = buildTagMigration(sections);
        expect(migratePackageRecord({ sectionId: ["u1", "u2"], groupTagIds: ["featured"] }, sectionToTag)).toEqual({
            groupTagIds: ["featured", "summer-trips", "winter-trips"], unresolved: []
        });
    });

    test("expands grouped blocks into headings and single-tag flat package blocks", () => {
        const { sectionToTag } = buildTagMigration(sections);
        const original = [{
            id: "packages", type: "packages", heading: "Umrah Packages", source: "umrah",
            sectionIds: [], groupBySection: true, packageType: "all", city: "all"
        }];
        const first = migratePageBlocks(original, sections, sectionToTag);
        expect(first.unresolved).toEqual([]);
        expect(first.blocks.map(block => [block.type, block.text || "", block.groupTagIds || []])).toEqual([
            ["heading", "Umrah Packages", []],
            ["heading", "Summer Trips", []],
            ["packages", "", ["summer-trips"]],
            ["heading", "Winter Trips", []],
            ["packages", "", ["winter-trips"]]
        ]);
        expect(migratePageBlocks(first.blocks, sections, sectionToTag).blocks).toEqual(first.blocks);
    });

    test("keeps non-grouped blocks flat and reports unknown selected sections", () => {
        const { sectionToTag } = buildTagMigration(sections);
        const result = migratePageBlocks([{
            id: "flat", type: "packages", source: "hajj", sectionIds: ["missing"], groupBySection: false
        }], sections, sectionToTag);
        expect(result.blocks[0].groupTagIds).toEqual([]);
        expect(result.unresolved).toEqual(["missing"]);
    });

    test("splits Firestore operations below the batch limit", () => {
        expect(chunkItems(Array.from({ length: 901 }), 450).map(chunk => chunk.length)).toEqual([450, 450, 1]);
    });
});
