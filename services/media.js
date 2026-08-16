import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const validatePageImage = file => {
    if (!file) return "Choose an image to upload.";
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return "Only JPEG, PNG, and WebP images are supported.";
    if (file.size > MAX_IMAGE_BYTES) return "Images must be 5 MB or smaller.";
    return "";
};

export const uploadPageImage = async (pageKey, file) => {
    const error = validatePageImage(file);
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
