import { render, screen, waitFor } from "@testing-library/react";
import PackageBlock from "@/components/pageBuilder/PackageBlock";
import { loadPackageBlock } from "@/services/packageBlocks";

jest.mock("@/services/packageBlocks", () => ({ loadPackageBlock: jest.fn() }));
jest.mock("@/components/cards/packageCard/packageCard", () => function Card({ tour }) { return <div>{tour.title}</div>; });
jest.mock("@/components/cards/imageCardFormal/imageCardFormal", () => function HolidayCard({ tour }) { return <div>{tour.title}</div>; });

describe("PackageBlock", () => {
    test("reloads live matching records when its filter configuration changes", async () => {
        loadPackageBlock
            .mockResolvedValueOnce({ groups: [{ id: "all", title: "", packages: [{ id: "1", title: "First package" }] }] })
            .mockResolvedValueOnce({ groups: [{ id: "all", title: "", packages: [{ id: "2", title: "New matching package" }] }] });
        const base = { id: "p", type: "packages", source: "holiday", city: "DELHI", groupTagIds: [] };
        const { rerender } = render(<PackageBlock block={base} />);
        expect(await screen.findByText("First package")).toBeInTheDocument();
        rerender(<PackageBlock block={{ ...base, city: "KERALA" }} />);
        await waitFor(() => expect(screen.getByText("New matching package")).toBeInTheDocument());
        expect(loadPackageBlock).toHaveBeenCalledTimes(2);
    });
});
