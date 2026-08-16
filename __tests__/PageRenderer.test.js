import { fireEvent, render, screen } from "@testing-library/react";
import PageRenderer from "@/components/pageBuilder/PageRenderer";
import styles from "@/components/pageBuilder/pageBuilder.module.css";

jest.mock("@/components/pageBuilder/PackageBlock", () => function MockPackageBlock({ block }) {
    return <div>Packages from {block.source}</div>;
});
jest.mock("@/components/carousel/carousel", () => function MockCarousel({ images, fixedFrame }) {
    return <div data-testid="image-slider" data-fixed-frame={String(fixedFrame)}>{images.map(image => <img src={image.url} alt={image.alt} key={image.id} />)}</div>;
});

describe("PageRenderer", () => {
    test("renders legacy and configured image display presets", () => {
        render(<PageRenderer
            page={{ title: "Images" }}
            version={{ blocks: [
                { id: "legacy", type: "image", url: "/legacy.jpg", alt: "Legacy image" },
                { id: "styled", type: "image", url: "/styled.jpg", alt: "Styled image", size: "original", rounded: true, shadow: true },
                { id: "rounded", type: "image", url: "/rounded.jpg", alt: "Rounded image", size: "fullWidth", rounded: true, shadow: false },
                { id: "shadow", type: "image", url: "/shadow.jpg", alt: "Shadow image", size: "fullWidth", rounded: false, shadow: true }
            ] }}
        />);

        expect(screen.getByAltText("Legacy image")).toHaveClass(styles.imageFullWidth);
        expect(screen.getByAltText("Legacy image")).not.toHaveClass(styles.imageRounded, styles.imageShadow);
        expect(screen.getByAltText("Legacy image").closest("figure")).toHaveClass(styles.imageBlock);
        expect(screen.getByAltText("Legacy image").closest("figure")).not.toHaveClass(styles.contentBlock);
        expect(screen.getByAltText("Styled image")).toHaveClass(styles.imageOriginal, styles.imageRounded, styles.imageShadow);
        expect(screen.getByAltText("Rounded image")).toHaveClass(styles.imageRounded);
        expect(screen.getByAltText("Rounded image")).not.toHaveClass(styles.imageShadow);
        expect(screen.getByAltText("Shadow image")).toHaveClass(styles.imageShadow);
        expect(screen.getByAltText("Shadow image")).not.toHaveClass(styles.imageRounded);
    });

    test("renders editable blocks and the locked system component in order", () => {
        render(<PageRenderer
            page={{ title: "Test page" }}
            version={{ seoTitle: "Test page", blocks: [
                { id: "1", type: "heading", level: 1, text: "Welcome" },
                { id: "2", type: "paragraph", text: "Page copy" },
                { id: "3", type: "list", ordered: false, items: ["One", "Two"] },
                { id: "4", type: "table", caption: "Prices", headers: ["Room"], rows: [["Double"]] },
                { id: "5", type: "system", systemKey: "legacy-page" }
            ] }}
            systemComponents={{ "legacy-page": <div>Package listing</div> }}
        />);
        expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
        expect(screen.getByText("Page copy")).toBeInTheDocument();
        expect(screen.getByText("Two")).toBeInTheDocument();
        expect(screen.getByText("Double")).toBeInTheDocument();
        expect(screen.getByText("Package listing")).toBeInTheDocument();
    });

    test("renders heading alignment and defaults legacy headings to the left", () => {
        render(<PageRenderer
            page={{ title: "Headings" }}
            version={{ blocks: [
                { id: "legacy", type: "heading", level: 2, text: "Legacy heading" },
                { id: "centered", type: "heading", level: 2, text: "Centered heading", align: "center" },
                { id: "right", type: "heading", level: 3, text: "Right heading", align: "right" }
            ] }}
        />);

        expect(screen.getByRole("heading", { name: "Legacy heading" })).toHaveStyle({ textAlign: "left" });
        expect(screen.getByRole("heading", { name: "Centered heading" })).toHaveStyle({ textAlign: "center" });
        expect(screen.getByRole("heading", { name: "Right heading" })).toHaveStyle({ textAlign: "right" });
    });

    test("renders reversible cards with an optional button", () => {
        render(<PageRenderer
            page={{ title: "Cards" }}
            version={{ blocks: [
                { id: "card-one", type: "card", heading: "Umrah offer", content: "A complete travel package.", imageUrl: "/umrah.jpg", imageAlt: "The Kaaba", imagePosition: "right", buttonText: "View package", buttonHref: "/umrahPackage" },
                { id: "card-two", type: "card", heading: "Simple card", content: "No action is needed.", imageUrl: "/simple.jpg", imageAlt: "A destination", imagePosition: "left", buttonText: "", buttonHref: "" }
            ] }}
        />);

        expect(screen.getByRole("heading", { name: "Umrah offer" }).closest("article")).not.toHaveClass(styles.featureCardImageLeft);
        expect(screen.getByRole("link", { name: "View package" })).toHaveAttribute("href", "/umrahPackage");
        expect(screen.getByRole("heading", { name: "Simple card" }).closest("article")).toHaveClass(styles.featureCardImageLeft);
        expect(screen.getAllByRole("link")).toHaveLength(1);
        expect(screen.getByAltText("The Kaaba")).toHaveAttribute("src", "/umrah.jpg");
    });

    test("renders icon lists with check icons and bold list text", () => {
        render(<PageRenderer
            page={{ title: "List styles" }}
            version={{ blocks: [
                { id: "icons", type: "list", ordered: false, iconList: true, bold: true, items: ["Passport", "Vaccination certificate"] },
                { id: "bold", type: "list", ordered: false, iconList: false, bold: true, items: ["Aadhaar card"] }
            ] }}
        />);

        const iconItem = screen.getByText("Passport").closest(".icon-list-item");
        expect(iconItem).toHaveClass("bold", "big");
        expect(iconItem.querySelector("svg")).toBeInTheDocument();
        expect(screen.getByText("Aadhaar card").closest("ul")).toHaveClass(styles.boldList);
    });

    test("renders ordered slider images in the fixed responsive frame", () => {
        render(<PageRenderer
            page={{ title: "Slider" }}
            version={{ blocks: [{ id: "slider", type: "slider", images: [
                { id: "one", url: "/one.jpg", alt: "First slide" },
                { id: "two", url: "/two.jpg", alt: "Second slide" }
            ] }] }}
        />);

        const slider = screen.getByTestId("image-slider");
        expect(slider).toHaveAttribute("data-fixed-frame", "true");
        expect(slider.closest("section")).toHaveAttribute("aria-label", "Image slider");
        expect(slider.querySelectorAll("img")).toHaveLength(2);
        expect(slider.querySelectorAll("img")[0]).toHaveAttribute("alt", "First slide");
        expect(slider.querySelectorAll("img")[1]).toHaveAttribute("alt", "Second slide");
    });

    test("renders the configured tab and switches nested content by click and keyboard", () => {
        render(<PageRenderer
            page={{ title: "Departures" }}
            version={{ blocks: [{
                id: "departure-tabs",
                type: "tabs",
                label: "Flights From:",
                defaultTabId: "lucknow",
                tabs: [
                    { id: "delhi", label: "Delhi", blocks: [{ id: "delhi-image", type: "image", url: "/delhi.jpg", alt: "Delhi departure", size: "original", rounded: true, shadow: true }] },
                    { id: "lucknow", label: "Lucknow", blocks: [{ id: "lucknow-packages", type: "packages", source: "umrah" }] }
                ]
            }] }}
        />);

        const delhiTab = screen.getByRole("tab", { name: "Delhi" });
        const lucknowTab = screen.getByRole("tab", { name: "Lucknow" });
        expect(screen.getByRole("tablist", { name: "Flights From:" })).toBeInTheDocument();
        expect(lucknowTab).toHaveAttribute("aria-selected", "true");
        expect(screen.getByText("Packages from umrah")).toBeInTheDocument();
        expect(screen.queryByAltText("Delhi departure")).not.toBeInTheDocument();

        fireEvent.click(delhiTab);
        expect(delhiTab).toHaveAttribute("aria-selected", "true");
        expect(screen.getByAltText("Delhi departure")).toHaveClass(styles.imageOriginal, styles.imageRounded, styles.imageShadow);
        expect(screen.queryByText("Packages from umrah")).not.toBeInTheDocument();

        fireEvent.keyDown(delhiTab, { key: "ArrowRight" });
        expect(lucknowTab).toHaveAttribute("aria-selected", "true");
        expect(lucknowTab).toHaveFocus();
    });
});
