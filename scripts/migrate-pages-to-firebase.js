/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { initializeApp, getApps } = require("firebase/app");
const { getFirestore, doc, getDoc, serverTimestamp, writeBatch } = require("firebase/firestore");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { mergeLegacyBlocks, validateVersionSize } = require("./pageMigrationUtils");
const seeds = require("../data/pageSeeds.generated.json");

const root = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(root, ".env") });
const apply = process.argv.includes("--apply");
const skipMedia = process.argv.includes("--skip-media");
const refreshSeo = process.argv.includes("--refresh-seo");
const requestedPage = process.argv.find(arg => arg.startsWith("--page="))?.split("=")[1];

const definitions = {
    home: { title: "Home", route: "/" },
    umrah: { title: "Umrah Packages", route: "/umrahPackage" },
    hajj: { title: "Hajj Packages", route: "/hajjPackage" },
    "hajj-experimental": { title: "Hajj Packages (Extended)", route: "/hajjPackage_exp" },
    "iraq-shia": { title: "Karbala Ziyarat", route: "/iraq-ziyarat-packages/karbala-iraq-ziyarat" },
    "iraq-sunni": { title: "Iraq Ziyarat", route: "/iraq-ziyarat-packages/iraq-ziyarat" },
    "turkey-packages": { title: "Turkey Packages", route: "/turkey-packages" },
    turkey: { title: "Turkey", route: "/turkey" },
    "holiday-packages": { title: "Holiday Packages", route: "/holiday-packages" },
    "flight-fare": { title: "Flight Fare", route: "/flight-fare" },
    forex: { title: "Forex", route: "/forex" },
    visa: { title: "Visa", route: "/visa" }
};

const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_ADD_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID
};

const missing = ["apiKey", "projectId", "storageBucket"].filter(key => !config[key]);
if (missing.length) throw new Error(`Missing Firebase configuration: ${missing.join(", ")}`);
if (requestedPage && !seeds[requestedPage]) throw new Error(`Unknown page key: ${requestedPage}`);

const app = getApps()[0] || initializeApp(config);
const db = getFirestore(app);
const storage = getStorage(app);
const collectionName = process.env.NEXT_PUBLIC_PAGES_COLLECTION || "pages";
const contentTypes = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };

const refsFor = pageKey => ({
    page: doc(db, collectionName, pageKey),
    draft: doc(db, collectionName, pageKey, "versions", "draft"),
    published: doc(db, collectionName, pageKey, "versions", "published")
});

const storageName = sourcePath => path.basename(sourcePath).replace(/[^a-zA-Z0-9._-]/g, "-");
const hydrateImages = async (pageKey, version) => {
    const blocks = [];
    for (const block of version.blocks) {
        if (block.type !== "image" || !block.sourcePath) { blocks.push(block); continue; }
        const localPath = path.join(root, "public", block.sourcePath.replace(/^\//, ""));
        if (!fs.existsSync(localPath)) throw new Error(`${pageKey}: missing image ${block.sourcePath}`);
        const storagePath = `page-media/${pageKey}/migrated/${storageName(block.sourcePath)}`;
        if (!apply || skipMedia) {
            blocks.push({ ...block, storagePath });
            continue;
        }
        const bytes = fs.readFileSync(localPath);
        const objectRef = ref(storage, storagePath);
        await uploadBytes(objectRef, bytes, { contentType: contentTypes[path.extname(localPath).toLowerCase()] || "application/octet-stream" });
        blocks.push({ ...block, url: await getDownloadURL(objectRef), storagePath });
    }
    return { ...version, blocks };
};

const migratePage = async pageKey => {
    const definition = definitions[pageKey];
    const refs = refsFor(pageKey);
    const [metadataSnapshot, draftSnapshot, publishedSnapshot] = await Promise.all([getDoc(refs.page), getDoc(refs.draft), getDoc(refs.published)]);
    const hydratedSeed = await hydrateImages(pageKey, seeds[pageKey]);
    const refreshMigratedFields = (merge, existing) => {
        if (merge.status !== "already-migrated" || !existing) return merge;
        const seedImages = new Map(hydratedSeed.blocks.filter(block => block.type === "image").map(block => [block.id, block]));
        let changed = false;
        const blocks = skipMedia ? existing.blocks : existing.blocks.map(block => {
            const image = seedImages.get(block.id);
            if (!image || image.url === block.url) return block;
            changed = true;
            return { ...block, url: image.url, storagePath: image.storagePath, sourcePath: image.sourcePath };
        });
        const seo = refreshSeo ? {
            seoTitle: hydratedSeed.seoTitle,
            seoDescription: hydratedSeed.seoDescription,
            seoKeywords: hydratedSeed.seoKeywords
        } : {};
        if (refreshSeo && (existing.seoTitle !== seo.seoTitle || existing.seoDescription !== seo.seoDescription || existing.seoKeywords !== seo.seoKeywords)) changed = true;
        return changed ? { status: refreshSeo && skipMedia ? "refresh-seo" : "refresh-migrated-fields", version: { ...existing, ...seo, blocks } } : merge;
    };
    const draftExisting = draftSnapshot.exists() ? draftSnapshot.data() : null;
    const publishedExisting = publishedSnapshot.exists() ? publishedSnapshot.data() : null;
    const draftMerge = refreshMigratedFields(mergeLegacyBlocks(draftExisting, hydratedSeed, pageKey), draftExisting);
    const publishedMerge = refreshMigratedFields(mergeLegacyBlocks(publishedExisting, hydratedSeed, pageKey), publishedExisting);
    const draftBytes = validateVersionSize(draftMerge.version, `${pageKey}/draft`);
    const publishedBytes = validateVersionSize(publishedMerge.version, `${pageKey}/published`);
    console.log(`${pageKey}: draft=${draftMerge.status} (${draftBytes} bytes), published=${publishedMerge.status} (${publishedBytes} bytes)`);
    if (!apply) return;

    const now = serverTimestamp();
    const batch = writeBatch(db);
    batch.set(refs.page, {
        pageKey,
        title: metadataSnapshot.exists() ? metadataSnapshot.data().title || definition.title : definition.title,
        route: definition.route,
        kind: "existing",
        status: "published",
        createdAt: metadataSnapshot.exists() ? metadataSnapshot.data().createdAt || now : now,
        updatedAt: now,
        publishedAt: now
    }, { merge: true });
    if (draftMerge.status !== "already-migrated") batch.set(refs.draft, { ...draftMerge.version, updatedAt: now });
    if (publishedMerge.status !== "already-migrated") batch.set(refs.published, { ...publishedMerge.version, publishedAt: now });
    await batch.commit();
};

(async () => {
    console.log(apply ? `APPLY mode: Firebase will be updated${skipMedia ? "; media uploads are skipped" : ""}.` : "DRY RUN mode: no Firebase or Storage writes will be made.");
    const pageKeys = requestedPage ? [requestedPage] : Object.keys(definitions);
    for (const pageKey of pageKeys) await migratePage(pageKey);
    console.log(apply ? "Migration complete." : "Dry run complete. Re-run with --apply to write changes.");
})().catch(error => { console.error(error); process.exitCode = 1; });
