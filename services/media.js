import { storage } from "@/config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const validatePageImage = (file, maxImageBytes = MAX_IMAGE_BYTES) => {
    if (!file) return "Choose an image to upload.";
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return "Only JPEG, PNG, and WebP images are supported.";
    if (file.size > maxImageBytes) return `Images must be ${Math.floor(maxImageBytes / (1024 * 1024))} MB or smaller.`;
    return "";
};

export const uploadPageImage = async (pageKey, file, { maxImageBytes = MAX_IMAGE_BYTES } = {}) => {
    const error = validatePageImage(file, maxImageBytes);
    if (error) throw new Error(error);
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
    const uniqueSuffix = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    const storagePath = `page-media/${pageKey}/${Date.now()}-${uniqueSuffix}-${safeName}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file, { contentType: file.type });
    return { storagePath, url: await getDownloadURL(storageRef) };
};

const listImageRefs = async directoryRef => {
    const result = await listAll(directoryRef);
    const nestedItems = await Promise.all(result.prefixes.map(listImageRefs));
    return [...result.items, ...nestedItems.flat()];
};

export const listUploadedImages = async () => {
    const imageRefs = await listImageRefs(ref(storage, "page-media"));
    const images = await Promise.all(imageRefs.map(async imageRef => ({
        name: imageRef.name.replace(/^\d+-(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[a-z0-9]+)-/i, ""),
        pageKey: imageRef.fullPath.split("/")[1] || "Unknown page",
        storagePath: imageRef.fullPath,
        url: await getDownloadURL(imageRef)
    })));
    return images.sort((first, second) => second.storagePath.localeCompare(first.storagePath));
};
