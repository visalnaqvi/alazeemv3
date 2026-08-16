import { render, screen } from "@testing-library/react";
import CarouselComp from "@/components/carousel/carousel";

jest.mock("react-responsive-carousel", () => ({
    Carousel: ({ children, autoPlay, infiniteLoop, showArrows, showIndicators, showStatus, showThumbs, swipeable }) => <div
        data-testid="carousel"
        data-auto-play={String(autoPlay)}
        data-infinite-loop={String(infiniteLoop)}
        data-show-arrows={String(showArrows)}
        data-show-indicators={String(showIndicators)}
        data-show-status={String(showStatus)}
        data-show-thumbs={String(showThumbs)}
        data-swipeable={String(swipeable)}
    >{children}</div>
}));

describe("CarouselComp", () => {
    test("enables slider controls for ordered page-builder images", () => {
        const { container } = render(<CarouselComp fixedFrame images={[
            { id: "one", url: "/one.jpg", mobileUrl: "/one-mobile.jpg", alt: "One" },
            { id: "two", url: "/two.jpg", alt: "Two" },
            { id: "three", url: "/three.jpg", alt: "Three" }
        ]} />);

        const carousel = screen.getByTestId("carousel");
        expect(carousel).toHaveAttribute("data-auto-play", "true");
        expect(carousel).toHaveAttribute("data-infinite-loop", "true");
        expect(carousel).toHaveAttribute("data-show-arrows", "true");
        expect(carousel).toHaveAttribute("data-show-indicators", "true");
        expect(carousel).toHaveAttribute("data-show-status", "true");
        expect(carousel).toHaveAttribute("data-show-thumbs", "false");
        expect(carousel).toHaveAttribute("data-swipeable", "true");
        expect(screen.getAllByRole("img").map(image => image.alt)).toEqual(["One", "Two", "Three"]);
        expect(container.querySelector('source[media="(max-width: 700px)"]')).toHaveAttribute("srcset", "/one-mobile.jpg");
    });

    test("keeps legacy string images and disables controls for one slide", () => {
        render(<CarouselComp images={["/legacy.jpg"]} width={900} height={500} />);
        const carousel = screen.getByTestId("carousel");
        expect(carousel).toHaveAttribute("data-auto-play", "false");
        expect(carousel).toHaveAttribute("data-show-arrows", "false");
        expect(screen.getByAltText("Kabba")).toBeInTheDocument();
    });
});
