import { fireEvent, render, screen } from "@testing-library/react";
import PackageTagFilter from "@/components/filters/packageTagFilter/packageTagFilter";

describe("admin package tag filter", () => {
    const tags = [
        { id: "summer", label: "Summer" },
        { id: "winter", label: "Winter" }
    ];

    test("supports All and multiple selected tags", () => {
        const onChange = jest.fn();
        const { rerender } = render(
            <PackageTagFilter tags={tags} selectedTagIds={[]} onChange={onChange} resultCount={3} />
        );

        expect(screen.getByLabelText("All")).toBeChecked();
        expect(screen.getByText("3 packages shown")).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText("Summer"));
        expect(onChange).toHaveBeenLastCalledWith(["summer"]);

        rerender(<PackageTagFilter tags={tags} selectedTagIds={["summer"]} onChange={onChange} resultCount={2} />);
        fireEvent.click(screen.getByLabelText("Winter"));
        expect(onChange).toHaveBeenLastCalledWith(["summer", "winter"]);

        fireEvent.click(screen.getByLabelText("All"));
        expect(onChange).toHaveBeenLastCalledWith([]);
    });
});
