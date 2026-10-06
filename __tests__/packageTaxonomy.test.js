import { addPackageCategory, addPackageFeature, createTaxonomyId, getPackageCategories, getPackageFeatures } from "@/services/packageTaxonomy";
import { getDoc, getDocs, setDoc } from "firebase/firestore";

jest.mock("@/config/firebase", () => ({}));
jest.mock("@/config/collections", () => ({ packageCategoriesCollection: {}, packageFeaturesCollection: {}, packageTagsCollection: {} }));
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

    test("provides built-in feature options and creates reusable custom features", async () => {
        expect(await getPackageFeatures()).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: "air-ticket-and-visa", label: "Air Ticket and Visa" })
        ]));

        getDoc.mockResolvedValue({ exists: () => false });
        await expect(addPackageFeature(" Private   Transfer ")).resolves.toMatchObject({
            id: "private-transfer",
            label: "Private Transfer"
        });
        expect(setDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ label: "Private Transfer" }));
    });

    test("reuses a built-in feature without writing a duplicate", async () => {
        await expect(addPackageFeature("Hotel 4/5 Bed Sharing")).resolves.toMatchObject({
            id: "hotel-45-bed-sharing"
        });
        expect(setDoc).not.toHaveBeenCalled();
    });
});
