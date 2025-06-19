import HeaderWrapper from "../components/header-wrapper";
import { getRandomCategory, getRandomStyle } from "libs/util/get-random-categories";
import { getInitialTheme } from "libs/util/get-initial-theme";
import { fetchCartItemCount } from "libs/actions/cart";
import HeaderClient from "../components/header-client";
import { StoreProductCategory } from "@medusajs/types";
import { MEGA_MENU } from "../header";

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