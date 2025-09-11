export const filterList = [
    {
        label: "Sort",
        value: "sort",
        options: [
            { label: "Newest", value: "newest" },
            { label: "Price: Low to High", value: "price_asc" },
            { label: "Price: High to Low", value: "price_desc" },
            { label: "Most Popular", value: "popular" },
        ],
    },
    {
        label: "Price",
        value: "price",
        options: [
            { label: "Under $100", value: "under-100" },
            { label: "$100 - $200", value: "100-200" },
            { label: "$200 - $500", value: "200-500" },
            { label: "Above $500", value: "above-500" },
        ],
    },
    {
        label: "Material",
        value: "material",
        options: [
            { label: "Genuine Leather", value: "genuine-leather" },
            { label: "Faux Leather", value: "faux-leather" },
            { label: "Suede", value: "suede" },
            { label: "Shearling", value: "shearling" },
        ],
    },
    {
        label: "Color",
        value: "color",
        options: [
            { label: "Black", value: "black" },
            { label: "Brown", value: "brown" },
            { label: "Tan", value: "tan" },
            { label: "White", value: "white" },
            { label: "Red", value: "red" },
        ],
    },
    {
        label: "Size",
        value: "size",
        options: [
            { label: "XS", value: "xs" },
            { label: "S", value: "s" },
            { label: "M", value: "m" },
            { label: "L", value: "l" },
            { label: "XL", value: "xl" },
            { label: "XXL", value: "xxl" },
        ],
    },
    {
        label: "Brand",
        value: "brand",
        options: [
            { label: "Azura", value: "azura" },
            { label: "LeatherCo", value: "leatherco" },
            { label: "Hidecraft", value: "hidecraft" },
            { label: "Urban Hides", value: "urban-hides" },
        ],
    },
];

export const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
    { label: "Most Popular", value: "popular" },
];
