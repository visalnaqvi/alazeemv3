import db from "@/config/firebase";
import { navCollection } from "@/config/collections";
import { normalizeNavItem } from "./pageBuilderUtils";
import { addDoc, deleteDoc, doc, getDocs, orderBy, query, writeBatch } from "firebase/firestore";

export const getNavigationItems = async ({ visibleOnly = false } = {}) => {
    const snapshot = await getDocs(query(navCollection, orderBy("order")));
    const items = snapshot.docs.map((item, index) => normalizeNavItem({ ...item.data(), id: item.id }, index));
    if (!items.some(item => item.href === "/forex")) {
        items.push({ id: null, label: "FOREX", targetType: "page", pageKey: "forex", href: "/forex", visible: true, order: items.length, isMigrationFallback: true });
    }
    return visibleOnly ? items.filter(item => item.visible) : items;
};

export const addNavigationItem = async item => {
    const ref = await addDoc(navCollection, {
        label: item.label,
        targetType: item.targetType,
        pageKey: item.pageKey || "",
        href: item.href,
        visible: true,
        order: item.order
    });
    return ref.id;
};

export const saveNavigationItems = async items => {
    const batch = writeBatch(db);
    items.filter(item => item.id).forEach((item, index) => {
        batch.set(doc(navCollection, item.id), {
            label: item.label.trim(),
            title: item.label.trim(),
            targetType: item.targetType,
            pageKey: item.pageKey || "",
            href: item.href,
            link: item.href,
            visible: Boolean(item.visible),
            active: Boolean(item.visible),
            order: index
        }, { merge: true });
    });
    await batch.commit();
};

export const removeNavigationItem = id => deleteDoc(doc(navCollection, id));
