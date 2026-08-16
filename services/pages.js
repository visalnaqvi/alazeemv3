import db from "@/config/firebase";
import { PUBLIC_PAGE_DEFINITIONS, getDefaultVersion, getPageDefinition } from "@/config/pageRegistry";
import { normalizeSlug, validateSlug } from "./pageBuilderUtils";
import {
    collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where, writeBatch
} from "firebase/firestore";

export const PAGES_COLLECTION = process.env.NEXT_PUBLIC_PAGES_COLLECTION || "pages";

const pageRef = pageKey => doc(db, PAGES_COLLECTION, pageKey);
const versionRef = (pageKey, version) => doc(db, PAGES_COLLECTION, pageKey, "versions", version);

const plainMetadata = snapshot => snapshot.exists() ? { ...snapshot.data(), pageKey: snapshot.id } : null;

export const getAdminPage = async pageKey => {
    const definition = getPageDefinition(pageKey);
    const [metadataSnapshot, draftSnapshot, publishedSnapshot] = await Promise.all([
        getDoc(pageRef(pageKey)),
        getDoc(versionRef(pageKey, "draft")),
        getDoc(versionRef(pageKey, "published"))
    ]);
    const metadata = plainMetadata(metadataSnapshot) || (definition ? { ...definition } : null);
    if (!metadata) return null;

    const fallback = definition ? getDefaultVersion(definition) : { seoTitle: metadata.title || "", seoDescription: "", blocks: [] };
    const published = publishedSnapshot.exists() ? publishedSnapshot.data() : null;
    const draft = draftSnapshot.exists() ? draftSnapshot.data() : (published || fallback);
    return { ...metadata, draft, published, hasPublishedVersion: Boolean(published) };
};

export const getPublicPage = async pageKey => {
    const definition = getPageDefinition(pageKey);
    const [metadataSnapshot, publishedSnapshot] = await Promise.all([
        getDoc(pageRef(pageKey)),
        getDoc(versionRef(pageKey, "published"))
    ]);
    const metadata = plainMetadata(metadataSnapshot);
    if (metadata?.status === "archived") return null;
    if (publishedSnapshot.exists()) {
        return { ...(metadata || definition), version: publishedSnapshot.data() };
    }
    if (definition) return { ...definition, version: getDefaultVersion(definition), isDefault: true };
    return null;
};

export const listAdminPages = async () => {
    const snapshot = await getDocs(collection(db, PAGES_COLLECTION));
    const stored = snapshot.docs.map(item => ({ ...item.data(), pageKey: item.id }));
    const merged = PUBLIC_PAGE_DEFINITIONS.map(definition => ({
        ...definition,
        ...(stored.find(item => item.pageKey === definition.pageKey) || {})
    }));
    stored.filter(item => item.kind === "custom").forEach(item => merged.push(item));
    return merged.sort((a, b) => a.title.localeCompare(b.title));
};

export const listPublishedPageTargets = async () => {
    const pages = await listAdminPages();
    return pages.filter(page => page.kind === "existing" || page.status === "published")
        .map(page => ({ pageKey: page.pageKey, title: page.title, route: page.route }));
};

export const createCustomPage = async ({ title, slug }) => {
    const normalizedSlug = normalizeSlug(slug);
    const slugError = validateSlug(normalizedSlug);
    if (slugError) throw new Error(slugError);
    if (!title?.trim()) throw new Error("Enter a page title.");
    const pageKey = `custom--${normalizedSlug}`;
    const existing = await getDoc(pageRef(pageKey));
    if (existing.exists()) throw new Error("A page already uses that URL.");

    const metadata = {
        pageKey,
        title: title.trim(),
        slug: normalizedSlug,
        route: `/${normalizedSlug}`,
        kind: "custom",
        status: "draft",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };
    const draft = { seoTitle: title.trim(), seoDescription: "", blocks: [], updatedAt: serverTimestamp() };
    const batch = writeBatch(db);
    batch.set(pageRef(pageKey), metadata);
    batch.set(versionRef(pageKey, "draft"), draft);
    await batch.commit();
    return pageKey;
};

export const savePageDraft = async ({ pageKey, title, version }) => {
    const current = await getDoc(pageRef(pageKey));
    const definition = getPageDefinition(pageKey);
    const currentData = current.exists() ? current.data() : definition;
    if (!currentData) throw new Error("Page not found.");
    const status = currentData.status === "published" ? "published" : "draft";
    const batch = writeBatch(db);
    batch.set(pageRef(pageKey), {
        pageKey,
        title: title.trim(),
        route: currentData.route,
        slug: currentData.slug || "",
        kind: currentData.kind,
        status,
        createdAt: currentData.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
    }, { merge: true });
    batch.set(versionRef(pageKey, "draft"), { ...version, updatedAt: serverTimestamp() });
    await batch.commit();
};

export const publishPage = async pageKey => {
    const draft = await getDoc(versionRef(pageKey, "draft"));
    if (!draft.exists()) throw new Error("Save a draft before publishing.");
    const publishedData = { ...draft.data(), publishedAt: serverTimestamp() };
    const batch = writeBatch(db);
    batch.set(versionRef(pageKey, "published"), publishedData);
    batch.set(pageRef(pageKey), { status: "published", updatedAt: serverTimestamp(), publishedAt: serverTimestamp() }, { merge: true });
    await batch.commit();
};

export const revertPageDraft = async pageKey => {
    const definition = getPageDefinition(pageKey);
    const published = await getDoc(versionRef(pageKey, "published"));
    const version = published.exists() ? published.data() : getDefaultVersion(definition);
    if (!version) throw new Error("There is no published version to restore.");
    await setDoc(versionRef(pageKey, "draft"), { ...version, updatedAt: serverTimestamp() });
    return version;
};

export const archiveCustomPage = async pageKey => {
    const snapshot = await getDoc(pageRef(pageKey));
    if (!snapshot.exists() || snapshot.data().kind !== "custom") throw new Error("Existing site pages cannot be archived.");
    const navCollectionName = process.env.NEXT_PUBLIC_NAVLINK_COLLECTION;
    const linkedItems = navCollectionName
        ? await getDocs(query(collection(db, navCollectionName), where("pageKey", "==", pageKey)))
        : { docs: [] };
    const batch = writeBatch(db);
    batch.set(pageRef(pageKey), { status: "archived", updatedAt: serverTimestamp() }, { merge: true });
    linkedItems.docs.forEach(item => batch.set(item.ref, { visible: false, active: false }, { merge: true }));
    await batch.commit();
};

export const deleteCustomPage = async pageKey => {
    const snapshot = await getDoc(pageRef(pageKey));
    if (!snapshot.exists() || snapshot.data().kind !== "custom") throw new Error("Existing site pages cannot be deleted.");
    const navCollectionName = process.env.NEXT_PUBLIC_NAVLINK_COLLECTION;
    const linkedItems = navCollectionName
        ? await getDocs(query(collection(db, navCollectionName), where("pageKey", "==", pageKey)))
        : { docs: [] };
    const batch = writeBatch(db);
    batch.delete(versionRef(pageKey, "draft"));
    batch.delete(versionRef(pageKey, "published"));
    linkedItems.docs.forEach(item => batch.set(item.ref, { visible: false, active: false }, { merge: true }));
    batch.delete(pageRef(pageKey));
    await batch.commit();
};
