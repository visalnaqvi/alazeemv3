export const DEFAULT_PACKAGE_CATEGORIES = [
    { id: "budget", label: "Budget", order: 0 },
    { id: "economy", label: "Economy", order: 1 },
    { id: "dulex", label: "Deluxe", order: 2 },
    { id: "ramzan", label: "Ramzan", order: 3 }
];

// Kept for legacy screens while category consumers move to the shared registry.
export const CATEGORIES = DEFAULT_PACKAGE_CATEGORIES.map(category => category.id);

export const getCategoryLabel = categoryId =>
    DEFAULT_PACKAGE_CATEGORIES.find(category => category.id === categoryId)?.label || categoryId;
