/* eslint-disable no-console */
const path = require("path");
const dotenv = require("dotenv");
const { initializeApp, getApps } = require("firebase/app");
const { collection, doc, getDocFromServer, getDocsFromServer, getFirestore, serverTimestamp, writeBatch } = require("firebase/firestore");
const { buildTagMigration, chunkItems, migratePackageRecord, migratePageBlocks } = require("./packageTagsMigrationUtils");
const { validateVersionSize } = require("./pageMigrationUtils");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
const apply = process.argv.includes("--apply");
const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_ADD_ID
};
const missing = ["apiKey", "projectId"].filter(key => !config[key]);
if (missing.length) throw new Error(`Missing Firebase configuration: ${missing.join(", ")}`);

const app = getApps()[0] || initializeApp(config);
const db = getFirestore(app);
const sectionsCollection = process.env.NEXT_PUBLIC_SECTIONS_COLLECTION;
const tagsCollection = process.env.NEXT_PUBLIC_PACKAGE_TAGS_COLLECTION || "package_tags";
const pagesCollection = process.env.NEXT_PUBLIC_PAGES_COLLECTION || "pages";
const packageCollections = [...new Set([
    process.env.NEXT_PUBLIC_UMRAH_COLLECTION,
    process.env.NEXT_PUBLIC_HAJJ_COLLECTION,
    process.env.NEXT_PUBLIC_IRAQ_COLLECTION,
    process.env.NEXT_PUBLIC_TURKEY_COLLECTION,
    process.env.NEXT_PUBLIC_HOLIDAY_COLLECTION
].filter(Boolean))];
if (!sectionsCollection) throw new Error("NEXT_PUBLIC_SECTIONS_COLLECTION is required.");

const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const operations = [];
const queueSet = (reference, data, options) => operations.push({ reference, data, options });
const commitOperations = async () => {
    for (const operationBatch of chunkItems(operations, 450)) {
        const batch = writeBatch(db);
        operationBatch.forEach(operation => batch.set(operation.reference, operation.data, operation.options));
        await batch.commit();
    }
};

(async () => {
    console.log(apply ? "APPLY mode: package tags and page versions will be updated." : "DRY RUN mode: no Firebase writes will be made.");
    const sectionSnapshot = await getDocsFromServer(collection(db, sectionsCollection));
    const sections = sectionSnapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    const { tags, sectionToTag } = buildTagMigration(sections);
    const existingTagSnapshot = await getDocsFromServer(collection(db, tagsCollection));
    const existingTags = new Map(existingTagSnapshot.docs.map(item => [item.id, item.data()]));
    let changedTags = 0;
    tags.forEach(tag => {
        const data = { label: tag.label, order: tag.order, legacySectionIds: tag.legacySectionIds };
        if (!same(existingTags.get(tag.id), data)) {
            changedTags += 1;
            queueSet(doc(db, tagsCollection, tag.id), data, { merge: true });
        }
    });

    let changedPackages = 0;
    const unresolved = [];
    for (const collectionName of packageCollections) {
        const snapshot = await getDocsFromServer(collection(db, collectionName));
        snapshot.docs.forEach(item => {
            const record = item.data();
            const migrated = migratePackageRecord(record, sectionToTag);
            migrated.unresolved.forEach(id => unresolved.push(`${collectionName}/${item.id}: ${id}`));
            if (!same(record.groupTagIds || [], migrated.groupTagIds)) {
                changedPackages += 1;
                queueSet(item.ref, { groupTagIds: migrated.groupTagIds }, { merge: true });
            }
        });
    }

    let changedVersions = 0;
    const pages = await getDocsFromServer(collection(db, pagesCollection));
    for (const page of pages.docs) {
        for (const versionName of ["draft", "published"]) {
            const reference = doc(db, pagesCollection, page.id, "versions", versionName);
            const snapshot = await getDocFromServer(reference);
            if (!snapshot.exists()) continue;
            const current = snapshot.data();
            const migrated = migratePageBlocks(current.blocks, sections, sectionToTag);
            migrated.unresolved.forEach(id => unresolved.push(`${pagesCollection}/${page.id}/${versionName}: ${id}`));
            if (!same(current.blocks || [], migrated.blocks)) {
                const version = { ...current, blocks: migrated.blocks };
                validateVersionSize(version, `${page.id}/${versionName}`);
                changedVersions += 1;
                queueSet(reference, { blocks: migrated.blocks, tagMigrationAt: serverTimestamp() }, { merge: true });
            }
        }
    }

    console.log(`Legacy sections: ${sections.length}; shared tags: ${tags.length}; tag writes: ${changedTags}.`);
    console.log(`Package collections: ${packageCollections.length}; package writes: ${changedPackages}; page-version writes: ${changedVersions}.`);
    if (unresolved.length) throw new Error(`Unresolved legacy section IDs:\n${unresolved.join("\n")}`);
    if (!apply) return console.log(`Dry run complete. ${operations.length} writes would be applied.`);
    await commitOperations();
    console.log(`Migration complete. ${operations.length} writes applied in batches of at most 450.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
