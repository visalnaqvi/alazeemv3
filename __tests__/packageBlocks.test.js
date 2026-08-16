import { filterAdminPackagesByTags, filterPackageRecords, getIraqPackageVariant, groupPackageRecords } from "@/services/packageBlocks";

describe("package page blocks", () => {
    const records = [
        { id: "1", type: "shia", city: "DELHI", groupTagIds: ["summer"], sectionId: ["a"] },
        { id: "2", type: "shia", city: "KERALA", groupTagIds: ["winter"], sectionId: ["b"] },
        { id: "3", type: "sunni", city: "DELHI", groupTagIds: ["summer", "winter"], sectionId: ["a", "b"] }
    ];

    test("applies tag and city filters without using the legacy Iraq type", () => {
        expect(filterPackageRecords(records, { source: "iraq", packageType: "sunni", groupTagIds: ["summer"] }).map(item => item.id)).toEqual(["1"]);
        expect(filterPackageRecords(records, { source: "umrah", groupTagIds: ["winter"] }).map(item => item.id)).toEqual(["2"]);
        expect(filterPackageRecords(records, { source: "umrah", groupTagIds: ["summer", "winter"] }).map(item => item.id)).toEqual(["3"]);
        expect(filterPackageRecords(records, { source: "umrah", groupTagIds: ["winter", "summer"] }).map(item => item.id)).toEqual(["3"]);
        expect(filterPackageRecords(records, { source: "holiday", city: "kerala", groupTagIds: [] }).map(item => item.id)).toEqual(["2"]);
    });

    test("derives Iraq card styling from Sunni and Shia tags", () => {
        expect(getIraqPackageVariant({ type: "shia", groupTagIds: ["sunni"] })).toBe("sunni");
        expect(getIraqPackageVariant({ type: "sunni", groupTagIds: ["shia"] })).toBe("shia");
        expect(getIraqPackageVariant({ type: "sunni", groupTagIds: [] })).toBe("");
    });

    test("uses all records when no tags are selected", () => {
        expect(filterPackageRecords(records, { source: "umrah", groupTagIds: [] })).toEqual(records);
    });

    test("filters the admin package list by any selected tag", () => {
        expect(filterAdminPackagesByTags(records, ["summer"]).map(item => item.id)).toEqual(["1", "3"]);
        expect(filterAdminPackagesByTags(records, ["summer", "winter"]).map(item => item.id)).toEqual(["1", "2", "3"]);
        expect(filterAdminPackagesByTags(records, [])).toEqual(records);
    });

    test("filters legacy admin packages using migrated tag metadata", () => {
        const legacy = [{ id: "legacy", sectionId: ["a"] }, { id: "other", sectionId: ["b"] }];
        const tags = [{ id: "summer", legacySectionIds: ["a"] }];
        expect(filterAdminPackagesByTags(legacy, ["summer"], tags)).toEqual([legacy[0]]);
    });

    test("resolves unmigrated section IDs through tag metadata and always returns a flat group", () => {
        const legacy = [{ id: "legacy", sectionId: ["a"] }];
        const tags = [{ id: "summer", legacySectionIds: ["a"] }];
        expect(filterPackageRecords(legacy, { source: "umrah", groupTagIds: ["summer"] }, tags)).toEqual(legacy);
        expect(groupPackageRecords(records)).toEqual([{ id: "all", title: "", packages: records }]);
    });
});
