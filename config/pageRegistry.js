import pageSeeds from "@/data/pageSeeds.generated.json";

const definitions = [
    { pageKey: "home", title: "Home", route: "/", pathname: "/" },
    { pageKey: "umrah", title: "Umrah Packages", route: "/umrahPackage", pathname: "/umrahPackage" },
    { pageKey: "hajj", title: "Hajj Packages", route: "/hajjPackage", pathname: "/hajjPackage" },
    { pageKey: "hajj-experimental", title: "Hajj Packages (Extended)", route: "/hajjPackage_exp", pathname: "/hajjPackage_exp" },
    { pageKey: "iraq-shia", title: "Karbala Ziyarat", route: "/iraq-ziyarat-packages/karbala-iraq-ziyarat", pathname: "/iraq-ziyarat-packages/[type]" },
    { pageKey: "iraq-sunni", title: "Iraq Ziyarat", route: "/iraq-ziyarat-packages/iraq-ziyarat", pathname: "/iraq-ziyarat-packages/[type]" },
    { pageKey: "turkey-packages", title: "Turkey Packages", route: "/turkey-packages", pathname: "/turkey-packages" },
    { pageKey: "turkey", title: "Turkey", route: "/turkey", pathname: "/turkey" },
    { pageKey: "holiday-packages", title: "Holiday Packages", route: "/holiday-packages", pathname: "/holiday-packages" },
    { pageKey: "flight-fare", title: "Flight Fare", route: "/flight-fare", pathname: "/flight-fare" },
    { pageKey: "forex", title: "Forex", route: "/forex", pathname: "/forex" },
    { pageKey: "visa", title: "Visa", route: "/visa", pathname: "/visa" }
];

export const PUBLIC_PAGE_DEFINITIONS = definitions.map(definition => ({
    ...definition,
    kind: "existing",
    status: "published",
    defaultVersion: pageSeeds[definition.pageKey] || { seoTitle: definition.title, seoDescription: "", seoKeywords: "", blocks: [] }
}));

export const RESERVED_SLUGS = [
    "admin-panel", "api", "flight-fare", "forex", "hajjPackage", "hajjPackage_exp",
    "holiday-packages", "iraq-ziyarat-packages", "login", "preview", "register",
    "turkey", "turkey-packages", "umrahPackage", "visa"
].map(value => value.toLowerCase());

export const getPageDefinition = pageKey =>
    PUBLIC_PAGE_DEFINITIONS.find(page => page.pageKey === pageKey);

export const getPageDefinitionForRoute = (pathname, asPath = "") => {
    if (pathname === "/iraq-ziyarat-packages/[type]") {
        return getPageDefinition(asPath.includes("karbala-iraq-ziyarat") ? "iraq-shia" : "iraq-sunni");
    }
    return PUBLIC_PAGE_DEFINITIONS.find(page => page.pathname === pathname);
};

export const getDefaultVersion = definition => ({
    seoTitle: definition?.defaultVersion?.seoTitle || definition?.title || "",
    seoDescription: definition?.defaultVersion?.seoDescription || "",
    seoKeywords: definition?.defaultVersion?.seoKeywords || "",
    blocks: (definition?.defaultVersion?.blocks || []).map(block => ({ ...block }))
});
