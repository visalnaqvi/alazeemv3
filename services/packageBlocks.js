import {
    getCitiesFromTags,
    getHajjPackages,
    getHolidayPackages,
    getIraqPackages,
    getTurkeyPackages,
    getUmrahPackages
} from "@/services/getData";
import { getPackageTags } from "@/services/packageTaxonomy";

const asArray = value => Array.isArray(value) ? value : [];

const haveSameIds = (left, right) => {
    const leftIds = new Set(asArray(left));
    const rightIds = new Set(asArray(right));
    return leftIds.size === rightIds.size && [...leftIds].every(id => rightIds.has(id));
};

export const resolveRecordGroupTagIds = (item, tags = []) => {
    if (Array.isArray(item.groupTagIds)) return item.groupTagIds;
    const legacyIds = asArray(item.sectionId);
    return tags.filter(tag => asArray(tag.legacySectionIds).some(id => legacyIds.includes(id))).map(tag => tag.id);
};

export const filterAdminPackagesByTags = (records, selectedTagIds = [], tags = []) => {
    const selectedIds = new Set(asArray(selectedTagIds));
    if (!selectedIds.size) return asArray(records);

    return asArray(records).filter(item =>
        resolveRecordGroupTagIds(item, tags).some(id => selectedIds.has(id))
    );
};

export const getIraqPackageVariant = item => {
    const tagIds = resolveRecordGroupTagIds(item).map(id => String(id).toLowerCase());
    return ["sunni", "shia"].find(id => tagIds.includes(id)) || "";
};

export const filterPackageRecords = (records, block, tags = []) => asArray(records).filter(item => {
    if (block.source === "holiday" && block.city && block.city !== "all" && String(item.city || "").toUpperCase() !== String(block.city).toUpperCase()) return false;
    if (block.groupTagIds?.length && !haveSameIds(block.groupTagIds, resolveRecordGroupTagIds(item, tags))) return false;
    if (!block.groupTagIds?.length && block.sectionIds?.length && !block.sectionIds.some(id => asArray(item.sectionId).includes(id))) return false;
    return true;
});

export const groupPackageRecords = records => [{ id: "all", title: "", packages: records }];

export const loadPackageBlock = async block => {
    let records = [];
    if (block.source === "umrah") records = await getUmrahPackages();
    if (block.source === "hajj") records = await getHajjPackages();
    if (block.source === "iraq") records = await getIraqPackages();
    if (block.source === "turkey") records = await getTurkeyPackages();
    if (block.source === "holiday") records = await getHolidayPackages(block.city || "all");
    if (!Array.isArray(records)) throw new Error(records?.msg || "Unable to load packages.");

    const tags = await getPackageTags();
    const filtered = filterPackageRecords(records, block, tags);
    return { records: filtered, groups: groupPackageRecords(filtered), tags };
};

export const loadPackageEditorOptions = async source => {
    const [tags, cities] = await Promise.all([
        getPackageTags(),
        source === "holiday" ? getCitiesFromTags() : []
    ]);
    return { tags: asArray(tags), cities: asArray(cities) };
};
