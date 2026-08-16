const normalizeLabel = value => String(value || "").trim().replace(/\s+/g, " ");
const createId = value => normalizeLabel(value).toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const asArray = value => Array.isArray(value) ? value : [];
const chunkItems = (items, size = 450) => {
    if (!Number.isInteger(size) || size < 1) throw new Error("Chunk size must be a positive integer.");
    const chunks = [];
    for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
    return chunks;
};
const sourcePage = source => source === "umrah" ? "hajjUmrah" : source === "iraq" ? "iraq" : "";

const buildTagMigration = sections => {
    const tagsById = new Map();
    const sectionToTag = new Map();
    [...sections].sort((a, b) => Number(a.order || 0) - Number(b.order || 0)).forEach(section => {
        const label = normalizeLabel(section.title);
        if (!section.id || !label) throw new Error(`Legacy section ${section.id || "<missing id>"} has no valid title.`);
        const id = createId(label);
        if (!id) throw new Error(`Legacy section ${section.id} cannot be converted to a tag ID.`);
        const current = tagsById.get(id) || { id, label, order: Number(section.order) || 0, legacySectionIds: [] };
        current.order = Math.min(current.order, Number(section.order) || 0);
        if (!current.legacySectionIds.includes(section.id)) current.legacySectionIds.push(section.id);
        tagsById.set(id, current);
        sectionToTag.set(section.id, id);
    });
    return { tags: [...tagsById.values()], sectionToTag };
};

const mapLegacyIds = (legacyIds, sectionToTag) => {
    const tagIds = [];
    const unresolved = [];
    asArray(legacyIds).forEach(id => {
        const tagId = sectionToTag.get(id);
        if (!tagId) unresolved.push(id);
        else if (!tagIds.includes(tagId)) tagIds.push(tagId);
    });
    return { tagIds, unresolved };
};

const migratePackageRecord = (record, sectionToTag) => {
    const mapped = mapLegacyIds(record.sectionId, sectionToTag);
    const groupTagIds = [...new Set([...asArray(record.groupTagIds), ...mapped.tagIds])];
    return { groupTagIds, unresolved: mapped.unresolved };
};

const packageBlock = (block, groupTagIds, sectionIds = asArray(block.sectionIds)) => {
    const { heading, category, ...rest } = block;
    return { ...rest, groupTagIds: [...new Set(groupTagIds)], sectionIds, groupBySection: false };
};

const migratePageBlocks = (blocks, sections, sectionToTag) => {
    const migrated = [];
    const unresolved = [];
    asArray(blocks).forEach(block => {
        if (block.type !== "packages") {
            migrated.push(block);
            return;
        }

        if (block.heading?.trim()) migrated.push({ id: `${block.id}-heading`, type: "heading", level: 2, text: block.heading.trim() });
        if (block.groupBySection && ["umrah", "iraq"].includes(block.source)) {
            const page = sourcePage(block.source);
            const selected = asArray(block.sectionIds).length
                ? sections.filter(section => block.sectionIds.includes(section.id))
                : sections.filter(section => section.page === page);
            if (selected.length) {
                selected.sort((a, b) => Number(a.order || 0) - Number(b.order || 0)).forEach(section => {
                    const tagId = sectionToTag.get(section.id);
                    if (!tagId) {
                        unresolved.push(section.id);
                        return;
                    }
                    migrated.push({ id: `${block.id}-legacy-${section.id}-heading`, type: "heading", level: 3, text: section.title });
                    migrated.push(packageBlock({ ...block, id: `${block.id}-legacy-${section.id}`, heading: "" }, [tagId], [section.id]));
                });
                return;
            }
        }

        const mapped = mapLegacyIds(block.sectionIds, sectionToTag);
        unresolved.push(...mapped.unresolved);
        migrated.push(packageBlock(block, [...asArray(block.groupTagIds), ...mapped.tagIds]));
    });
    return { blocks: migrated, unresolved: [...new Set(unresolved)] };
};

module.exports = { buildTagMigration, chunkItems, createId, mapLegacyIds, migratePackageRecord, migratePageBlocks, normalizeLabel };
