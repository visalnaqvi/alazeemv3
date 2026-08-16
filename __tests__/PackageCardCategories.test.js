import { render, screen } from "@testing-library/react";
import PackageCard from "@/components/cards/packageCard/packageCard";

jest.mock("@/services/vendor", () => ({ getPackageVendor: jest.fn(() => new Promise(() => {})) }));
jest.mock("@/services/auth", () => ({ checkStorageForAdminToken: jest.fn(() => false) }));
jest.mock("@/services/deleteData", () => ({ deletePackage: jest.fn() }));
jest.mock("@/components/flights/container/popUp", () => function FlightPopUp() { return null; });

describe("PackageCard category rows", () => {
    test("renders category-specific details and the corrected Deluxe label", () => {
        render(<PackageCard type="hajjUmrah" fetchData={jest.fn()} tour={{
            id: "package-1",
            title: "Test package",
            features: [],
            isBold: [],
            hotels: [],
            pricing: [],
            flights: [],
            sectionData: [{ id: "dulex", price: "100", makkahHotel: "Makkah One", madinaHotel: "Madina One" }]
        }} />);
        expect(screen.getByText("Deluxe")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
        expect(screen.getByText("Makkah One")).toBeInTheDocument();
        expect(screen.getByText("Madina One")).toBeInTheDocument();
    });
});
