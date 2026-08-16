import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import BlockEditor from "@/components/pageBuilder/BlockEditor";
import { loadPackageEditorOptions } from "@/services/packageBlocks";
import { uploadPageImage } from "@/services/media";

jest.mock("@/services/packageBlocks", () => ({ loadPackageEditorOptions: jest.fn() }));
jest.mock("@/services/media", () => ({ uploadPageImage: jest.fn() }));

const baseProps = {
    index: 0, count: 1, pageKey: "home", onMove: jest.fn(), onDelete: jest.fn(),
    onDragStart: jest.fn(), onDrop: jest.fn(), onError: jest.fn(), defaultExpanded: true
};

const SliderEditorHost = ({ initialBlock, onChange = () => {} }) => {
    const [block, setBlock] = useState(initialBlock);
    return <BlockEditor {...baseProps} block={block} onChange={nextBlock => { setBlock(nextBlock); onChange(nextBlock); }} />;
};

describe("BlockEditor collapse controls", () => {
    test("starts collapsed and expands or collapses the component editor", () => {
        const block = { id: "heading", type: "heading", level: 2, text: "Welcome" };
        render(<BlockEditor {...baseProps} defaultExpanded={false} block={block} onChange={jest.fn()} />);

        expect(screen.getByText("1. heading")).toBeInTheDocument();
        expect(screen.queryByLabelText("Heading text")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Expand heading component" }));
        expect(screen.getByDisplayValue("Welcome")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Collapse heading component" }));
        expect(screen.queryByDisplayValue("Welcome")).not.toBeInTheDocument();
    });
});

describe("BlockEditor heading controls", () => {
    test("defaults to left alignment and saves the selected alignment", () => {
        const onChange = jest.fn();
        const block = { id: "heading", type: "heading", level: 2, text: "Welcome" };
        render(<BlockEditor {...baseProps} block={block} onChange={onChange} />);

        expect(screen.getByLabelText("Left")).toBeChecked();
        expect(screen.getByLabelText("Center")).not.toBeChecked();
        expect(screen.getByLabelText("Right")).not.toBeChecked();

        fireEvent.click(screen.getByLabelText("Center"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ align: "center" }));
    });
});

describe("BlockEditor list controls", () => {
    test("edits icon-list and bold-text settings", () => {
        const onChange = jest.fn();
        const block = { id: "list", type: "list", ordered: false, items: ["Passport"] };
        render(<BlockEditor {...baseProps} block={block} onChange={onChange} />);

        expect(screen.getByLabelText("Icon list")).not.toBeChecked();
        expect(screen.getByLabelText("Bold text")).not.toBeChecked();

        fireEvent.click(screen.getByLabelText("Icon list"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ iconList: true }));

        fireEvent.click(screen.getByLabelText("Bold text"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ bold: true }));
    });
});

describe("BlockEditor package controls", () => {
    beforeEach(() => loadPackageEditorOptions.mockResolvedValue({ tags: [
        { id: "sunni", label: "Sunni" },
        { id: "shia", label: "Shia" }
    ], cities: ["DELHI"] }));

    test("uses tags instead of a package type for Iraq packages", async () => {
        const onChange = jest.fn();
        const block = { id: "p", type: "packages", source: "iraq", city: "all", groupTagIds: [] };
        render(<BlockEditor {...baseProps} block={block} onChange={onChange} />);
        expect(screen.queryByLabelText("Package type")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("City")).not.toBeInTheDocument();
        expect(screen.queryByText("Heading (optional)")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Category")).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getByLabelText("Shia")).toBeInTheDocument());
        fireEvent.click(screen.getByLabelText("Shia"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ groupTagIds: ["shia"] }));
    });

    test("switching source resets incompatible filters", async () => {
        const onChange = jest.fn();
        const block = { id: "p", type: "packages", source: "iraq", city: "DELHI", groupTagIds: ["shia"] };
        render(<BlockEditor {...baseProps} block={block} onChange={onChange} />);
        await screen.findByLabelText("Shia");
        fireEvent.change(screen.getByLabelText("Package source"), { target: { value: "hajj" } });
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ source: "hajj", city: "all", groupTagIds: [] }));
    });
});

describe("BlockEditor image controls", () => {
    test("edits size, rounded border, and shadow settings", () => {
        const onChange = jest.fn();
        const block = { id: "image", type: "image", url: "/photo.jpg", storagePath: "", alt: "Photo", caption: "" };
        render(<BlockEditor {...baseProps} block={block} onChange={onChange} />);

        expect(screen.getByLabelText("Image size")).toHaveValue("fullWidth");
        expect(screen.getByLabelText("Rounded border")).not.toBeChecked();
        expect(screen.getByLabelText("Shadow")).not.toBeChecked();

        fireEvent.change(screen.getByLabelText("Image size"), { target: { value: "original" } });
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ size: "original" }));

        fireEvent.click(screen.getByLabelText("Rounded border"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ rounded: true }));

        fireEvent.click(screen.getByLabelText("Shadow"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ shadow: true }));
    });
});

describe("BlockEditor slider controls", () => {
    beforeEach(() => uploadPageImage.mockReset());

    test("uploads multiple images in order", async () => {
        const onChange = jest.fn();
        uploadPageImage
            .mockResolvedValueOnce({ url: "/one.jpg", storagePath: "page-media/one.jpg" })
            .mockResolvedValueOnce({ url: "/two.jpg", storagePath: "page-media/two.jpg" });
        render(<SliderEditorHost initialBlock={{ id: "slider", type: "slider", images: [] }} onChange={onChange} />);

        fireEvent.change(screen.getByLabelText("Slider image files"), { target: { files: [
            new File(["one"], "one.jpg", { type: "image/jpeg" }),
            new File(["two"], "two.jpg", { type: "image/jpeg" })
        ] } });

        await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            images: [
                expect.objectContaining({ url: "/one.jpg", storagePath: "page-media/one.jpg", alt: "one" }),
                expect.objectContaining({ url: "/two.jpg", storagePath: "page-media/two.jpg", alt: "two" })
            ]
        })));
        expect(screen.getByText("2 images uploaded successfully.")).toBeInTheDocument();
        expect(screen.getByText("2 of 3 images added")).toBeInTheDocument();
        expect(screen.getByAltText("Slide 1 preview")).toHaveAttribute("src", "/one.jpg");
    });

    test("edits, reorders, removes, and caps configured slides", () => {
        const onChange = jest.fn();
        const images = [
            { id: "one", url: "/one.jpg", storagePath: "", alt: "One" },
            { id: "two", url: "/two.jpg", storagePath: "", alt: "Two" },
            { id: "three", url: "/three.jpg", storagePath: "", alt: "Three" }
        ];
        render(<BlockEditor {...baseProps} block={{ id: "slider", type: "slider", images }} onChange={onChange} />);

        expect(screen.getByLabelText("Slider image files")).toBeDisabled();
        expect(screen.getByRole("button", { name: "Add image by URL" })).toBeDisabled();

        fireEvent.change(screen.getByLabelText("Alt text", { selector: "#slider-alt-slider-two" }), { target: { value: "Updated two" } });
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            images: expect.arrayContaining([expect.objectContaining({ id: "two", alt: "Updated two" })])
        }));

        fireEvent.click(screen.getByRole("button", { name: "Move slide 2 left" }));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ images: [
            expect.objectContaining({ id: "two", alt: "Updated two" }), images[0], images[2]
        ] }));

        fireEvent.click(screen.getByRole("button", { name: "Remove slide 3" }));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ images: [
            expect.objectContaining({ id: "two", alt: "Updated two" }), images[0]
        ] }));
    });

    test("uploads a separate mobile image and reports upload failures inline", async () => {
        const onChange = jest.fn();
        uploadPageImage
            .mockResolvedValueOnce({ url: "/one-mobile.jpg", storagePath: "page-media/one-mobile.jpg" })
            .mockRejectedValueOnce(new Error("Storage permission denied"));
        render(<SliderEditorHost initialBlock={{ id: "slider", type: "slider", images: [
            { id: "one", url: "/one.jpg", storagePath: "", mobileUrl: "", mobileStoragePath: "", alt: "One" },
            { id: "two", url: "/two.jpg", storagePath: "", mobileUrl: "", mobileStoragePath: "", alt: "Two" }
        ] }} onChange={onChange} />);

        fireEvent.change(screen.getAllByLabelText("Upload mobile image")[0], { target: { files: [
            new File(["mobile"], "one-mobile.jpg", { type: "image/jpeg" })
        ] } });
        await waitFor(() => expect(screen.getByAltText("Slide 1 mobile preview")).toHaveAttribute("src", "/one-mobile.jpg"));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ images: expect.arrayContaining([
            expect.objectContaining({ id: "one", mobileUrl: "/one-mobile.jpg", mobileStoragePath: "page-media/one-mobile.jpg" })
        ]) }));

        fireEvent.change(screen.getAllByLabelText("Upload mobile image")[0], { target: { files: [
            new File(["mobile"], "two-mobile.jpg", { type: "image/jpeg" })
        ] } });
        await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Storage permission denied"));
        expect(screen.getByText(/Mobile upload failed/)).toBeInTheDocument();
    });
});

describe("BlockEditor tabs controls", () => {
    const tabsBlock = {
        id: "filters",
        type: "tabs",
        label: "Flights From:",
        defaultTabId: "delhi",
        tabs: [
            { id: "delhi", label: "Delhi", blocks: [] },
            { id: "lucknow", label: "Lucknow", blocks: [] }
        ]
    };

    test("edits tab settings and adds nested content", () => {
        const onChange = jest.fn();
        render(<BlockEditor {...baseProps} block={tabsBlock} onChange={onChange} />);

        fireEvent.change(screen.getByLabelText("Label before tabs (optional)"), { target: { value: "Departure city:" } });
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ label: "Departure city:" }));

        fireEvent.change(screen.getAllByLabelText("Tab name")[0], { target: { value: "New Delhi" } });
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            tabs: expect.arrayContaining([expect.objectContaining({ id: "delhi", label: "New Delhi" })])
        }));

        fireEvent.click(screen.getAllByLabelText("Default tab")[1]);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ defaultTabId: "lucknow" }));

        fireEvent.click(screen.getAllByRole("button", { name: "image" })[0]);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            tabs: expect.arrayContaining([expect.objectContaining({
                id: "delhi",
                blocks: [expect.objectContaining({ type: "image" })]
            })])
        }));

        fireEvent.click(screen.getAllByRole("button", { name: "image slider" })[0]);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            tabs: expect.arrayContaining([expect.objectContaining({
                id: "delhi",
                blocks: [expect.objectContaining({ type: "slider", images: [] })]
            })])
        }));
    });

    test("reorders, adds, and safely deletes tabs", () => {
        const onChange = jest.fn();
        render(<BlockEditor {...baseProps} block={tabsBlock} onChange={onChange} />);

        fireEvent.click(screen.getByRole("button", { name: "Move Delhi right" }));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ tabs: [tabsBlock.tabs[1], tabsBlock.tabs[0]] }));

        fireEvent.click(screen.getByRole("button", { name: "Add tab" }));
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            tabs: expect.arrayContaining([expect.objectContaining({ label: "Tab 3", blocks: [] })])
        }));

        fireEvent.click(screen.getAllByRole("button", { name: "Delete tab" })[0]);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            defaultTabId: "lucknow",
            tabs: [tabsBlock.tabs[1]]
        }));
    });
});
