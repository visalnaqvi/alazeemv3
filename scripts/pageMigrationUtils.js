const MAX_FIRESTORE_DOCUMENT_BYTES = 950000;

const mergeLegacyBlocks = (existing, seed, pageKey) => {
    if (!existing || !Array.isArray(existing.blocks) || existing.blocks.length === 0) {
        return { status: "seed", version: { ...seed, blocks: seed.blocks.map(block => ({ ...block })) } };
    }
    const legacyIndexes = existing.blocks.reduce((indexes, block, index) => block.type === "system" && block.systemKey === "legacy-page" ? [...indexes, index] : indexes, []);
    if (legacyIndexes.length > 1) throw new Error(`${pageKey}: version has multiple legacy-page blocks.`);
    if (legacyIndexes.length === 1) {
        const target = legacyIndexes[0];
        return {
            status: "replace-legacy",
            version: { ...existing, blocks: [...existing.blocks.slice(0, target), ...seed.blocks.map(block => ({ ...block })), ...existing.blocks.slice(target + 1)] }
        };
    }
    if (existing.blocks.some(block => String(block.id || "").startsWith(`migrated-${pageKey}-`))) {
        return { status: "already-migrated", version: existing };
    }
    throw new Error(`${pageKey}: version has content but no legacy-page marker; refusing to overwrite it.`);
};

const validateVersionSize = (version, pageKey) => {
    const bytes = Buffer.byteLength(JSON.stringify(version), "utf8");
    if (bytes > MAX_FIRESTORE_DOCUMENT_BYTES) throw new Error(`${pageKey}: page version is ${bytes} bytes and is too large for Firestore.`);
    return bytes;
};

module.exports = { MAX_FIRESTORE_DOCUMENT_BYTES, mergeLegacyBlocks, validateVersionSize };
