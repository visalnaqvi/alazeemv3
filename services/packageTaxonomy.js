import db from "@/config/firebase";
import { DEFAULT_PACKAGE_CATEGORIES } from "@/config/categories";
import { DEFAULT_PACKAGE_FEATURES } from "@/config/packageFeatures";
import { packageCategoriesCollection, packageFeaturesCollection, packageTagsCollection } from "@/config/collections";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const normalizeTaxonomyLabel = value => String(value || "").trim().replace(/\s+/g, " ");

export const createTaxonomyId = value => normalizeTaxonomyLabel(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const sortRecords = records => [...records].sort((left, right) => {
    const order = Number(left.order ?? Number.MAX_SAFE_INTEGER) - Number(right.order ?? Number.MAX_SAFE_INTEGER);
    return order || left.label.localeCompare(right.label);
});

const readCollection = async collectionRef => {
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
};

export const getPackageCategories = async () => {
    let stored = [];
    try {
        stored = await readCollection(packageCategoriesCollection);
    } catch (error) {
        // The built-ins keep package editing usable before the optional collection is provisioned.
        return DEFAULT_PACKAGE_CATEGORIES;
    }
    const merged = new Map(DEFAULT_PACKAGE_CATEGORIES.map(category => [category.id, category]));
    stored.forEach(category => merged.set(category.id, {
        id: category.id,
        label: normalizeTaxonomyLabel(category.label) || category.id,
        order: category.order
    }));
    return sortRecords([...merged.values()]);
};

export const addPackageCategory = async label => {
    const normalizedLabel = normalizeTaxonomyLabel(label);
    const id = createTaxonomyId(normalizedLabel);
    if (!id) throw new Error("Enter a category name using letters or numbers.");

    const builtIn = DEFAULT_PACKAGE_CATEGORIES.find(category => category.id === id);
    if (builtIn) return builtIn;

    const reference = doc(db, process.env.NEXT_PUBLIC_PACKAGE_CATEGORIES_COLLECTION || "package_categories", id);
    const existing = await getDoc(reference);
    if (existing.exists()) return { id: existing.id, ...existing.data() };

    const category = { label: normalizedLabel, order: Date.now() };
    await setDoc(reference, category);
    return { id, ...category };
};

export const getPackageFeatures = async () => {
    let stored = [];
    try {
        stored = await readCollection(packageFeaturesCollection);
    } catch (error) {
        // Built-in options keep the editor usable until the collection is provisioned.
        return DEFAULT_PACKAGE_FEATURES;
    }
    const merged = new Map(DEFAULT_PACKAGE_FEATURES.map(feature => [feature.id, feature]));
    stored.forEach(feature => merged.set(feature.id, {
        id: feature.id,
        label: normalizeTaxonomyLabel(feature.label) || feature.id,
        order: feature.order
    }));
    return sortRecords([...merged.values()]);
};

export const addPackageFeature = async label => {
    const normalizedLabel = normalizeTaxonomyLabel(label);
    const id = createTaxonomyId(normalizedLabel);
    if (!id) throw new Error("Enter a feature using letters or numbers.");

    const builtIn = DEFAULT_PACKAGE_FEATURES.find(feature => feature.id === id);
    if (builtIn) return builtIn;

    const reference = doc(db, process.env.NEXT_PUBLIC_PACKAGE_FEATURES_COLLECTION || "package_features", id);
    const existing = await getDoc(reference);
    if (existing.exists()) return { id: existing.id, ...existing.data() };

    const feature = { label: normalizedLabel, order: Date.now() };
    await setDoc(reference, feature);
    return { id, ...feature };
};

export const getPackageTags = async () => sortRecords((await readCollection(packageTagsCollection)).map(tag => ({
    ...tag,
    label: normalizeTaxonomyLabel(tag.label) || tag.id,
    legacySectionIds: Array.isArray(tag.legacySectionIds) ? tag.legacySectionIds : []
})));

export const addPackageTag = async label => {
    const normalizedLabel = normalizeTaxonomyLabel(label);
    const id = createTaxonomyId(normalizedLabel);
    if (!id) throw new Error("Enter a tag name using letters or numbers.");

    const reference = doc(db, process.env.NEXT_PUBLIC_PACKAGE_TAGS_COLLECTION || "package_tags", id);
    const existing = await getDoc(reference);
    if (existing.exists()) return { id: existing.id, ...existing.data() };

    const tag = { label: normalizedLabel, order: Date.now(), legacySectionIds: [] };
    await setDoc(reference, tag);
    return { id, ...tag };
};

export const updatePackageTag = async tag => {
    const label = normalizeTaxonomyLabel(tag.label);
    if (!tag.id || !label) throw new Error("Tag name is required.");
    const reference = doc(db, process.env.NEXT_PUBLIC_PACKAGE_TAGS_COLLECTION || "package_tags", tag.id);
    await setDoc(reference, { label, order: Number(tag.order) || 0 }, { merge: true });
    return { ...tag, label, order: Number(tag.order) || 0 };
};
