import { getRandomCategory, getRandomStyle } from "@lib/util/get-random-categories";
import { StoreProductCategory } from "@medusajs/types";
import { MEGA_MENU } from "@/JSON/header";
import { getInitialTheme } from "@lib/util/get-initial-theme";
import { fetchCartItemCount } from "@lib/action/cart";
import HeaderClient from "../components/header-client";
import HeaderWrapper from "../components/header-wrapper";

export default async function Header({ parent_categories }: { parent_categories: StoreProductCategory[] }) {

    const initialTheme = await getInitialTheme()
    const totalItems = await fetchCartItemCount()
    const mainCategories = parent_categories?.filter(category => MEGA_MENU.includes(category.name)) ?? [];
    if (mainCategories.length < 2) return null;

    const enhancedCategories = mainCategories.map(category => {
        const shop = getRandomCategory(category.category_children, 5);
        const style = getRandomStyle(category.category_children, 5);
        return { shop, style, ...category };
    });

    return (
        <HeaderClient>
            <HeaderWrapper enhancedCategories={enhancedCategories} initialTheme={initialTheme} totalItems={totalItems} />
        </HeaderClient>
    )
}