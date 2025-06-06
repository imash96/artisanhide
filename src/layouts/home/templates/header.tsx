import HeaderWrapper from "../components/header-wrapper";
import { getParentCategories } from "libs/actions/categories";
import { getRandomCategory, getRandomStyle } from "libs/util/get-random-categories";
import { getInitialTheme } from "libs/util/get-initial-theme";
import { fetchCartItemCount } from "libs/actions/cart";

const MEGA_MENU = ["Men", "Women"]

export default async function Header() {

    const initialTheme = await getInitialTheme()
    const totalItems = await fetchCartItemCount()
    const mainCategories = await getParentCategories(MEGA_MENU)
    if (mainCategories.length < 2) return null;

    const enhancedCategories = mainCategories.map(category => {
        const shop = getRandomCategory(category.category_children, 5);
        const style = getRandomStyle(category.category_children, 5);
        return { shop, style, ...category };
    });

    return (
        <HeaderWrapper enhancedCategories={enhancedCategories} initialTheme={initialTheme} totalItems={totalItems} />
    )
}