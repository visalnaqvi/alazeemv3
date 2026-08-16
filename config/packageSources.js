export const PACKAGE_SOURCES = [
    { value: "umrah", label: "Umrah Packages", editorType: "hajjUmrah" },
    { value: "hajj", label: "Hajj Packages", editorType: "hajj" },
    { value: "iraq", label: "Iraq Ziyarat Packages", editorType: "iraq" },
    { value: "turkey", label: "Turkey Packages", editorType: "turkey" },
    { value: "holiday", label: "Holiday Packages", editorType: "holiday", supportsCity: true }
];

export const getPackageSource = source => PACKAGE_SOURCES.find(item => item.value === source);
