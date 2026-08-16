import { addPackageCategory, createTaxonomyId, getPackageCategories } from "@/services/packageTaxonomy";
import { getDoc, getDocs, setDoc } from "firebase/firestore";

jest.mock("@/config/firebase", () => ({}));
jest.mock("@/config/collections", () => ({ packageCategoriesCollection: {}, packageTagsCollection: {} }));
jest.mock("firebase/firestore", () => ({
    doc: jest.fn(() => ({ path: "package_categories/test" })),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    setDoc: jest.fn()
}));

describe("package taxonomy", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getDocs.mockResolvedValue({ docs: [] });
    });

    test("keeps the legacy dulex key while showing the corrected label", async () => {
        const categories = await getPackageCategories();
        expect(categories.find(category => category.id === "dulex")).toMatchObject({ label: "Deluxe" });
    });

    test("normalizes and creates a reusable custom category", async () => {
        getDoc.mockResolvedValue({ exists: () => false });
        await expect(addPackageCategory(" Premium   Plus ")).resolves.toMatchObject({ id: "premium-plus", label: "Premium Plus" });
        expect(createTaxonomyId("Premium Plus")).toBe("premium-plus");
        expect(setDoc).toHaveBeenCalledTimes(1);
    });

    test("returns an existing category instead of duplicating it", async () => {
        getDoc.mockResolvedValue({ exists: () => true, id: "premium", data: () => ({ label: "Premium" }) });
        await expect(addPackageCategory("Premium")).resolves.toMatchObject({ id: "premium", label: "Premium" });
        expect(setDoc).not.toHaveBeenCalled();
    });
});
