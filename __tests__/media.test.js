import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uploadPageFile, validatePageFile } from "@/services/media";

jest.mock("@/config/firebase", () => ({ storage: {} }));
jest.mock("firebase/storage", () => ({
    getDownloadURL: jest.fn(),
    listAll: jest.fn(),
    ref: jest.fn((storage, path) => ({ fullPath: path })),
    uploadBytes: jest.fn()
}));

describe("page file uploads", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getDownloadURL.mockResolvedValue("https://example.com/download.pdf");
        uploadBytes.mockResolvedValue({});
    });

    test("validates supported types and the 20 MB size limit", () => {
        expect(validatePageFile(new File(["pdf"], "guide.pdf", { type: "application/pdf" }))).toBe("");
        expect(validatePageFile(new File(["script"], "unsafe.exe"))).toMatch(/PDF, Office document/i);
        expect(validatePageFile({ name: "large.pdf", size: 21 * 1024 * 1024 })).toMatch(/20 MB/i);
    });

    test("uploads files as downloadable attachments", async () => {
        const file = new File(["pdf"], "Travel Guide.pdf", { type: "application/pdf" });
        await expect(uploadPageFile("forex", file)).resolves.toMatchObject({
            fileName: "Travel Guide.pdf",
            fileType: "application/pdf",
            url: "https://example.com/download.pdf"
        });
        expect(ref).toHaveBeenCalledWith(expect.anything(), expect.stringMatching(/^page-files\/forex\/.+-travel-guide\.pdf$/));
        expect(uploadBytes).toHaveBeenCalledWith(expect.anything(), file, expect.objectContaining({
            contentDisposition: "attachment; filename=\"travel-guide.pdf\"",
            contentType: "application/pdf"
        }));
    });
});
