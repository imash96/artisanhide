import { Search, User } from "lucide-react";
import Link from "next/link"
import Logo from "@/icon/logo";
import Container from "@module/common/create-section";
import ThemeButton from "./button-theme";
import CartDrawerButton from "./button-cart-drawer";
import MegaMenu from "./mega-menu";
import MenuDrawerButton from "./button-menu-drawer";
import { getInitialTheme } from "@lib/util/get-initial-theme";
import { fetchCartItemCount } from "@lib/action/cart";
import { product_categories } from "@/JSON/category";
import { getEnhancedCategories } from "@lib/util/get-mega-menu";
import { MEGA_MENU } from "@/JSON/header";

export default async function HeaderWrapper() {
    const initialTheme = await getInitialTheme()
    const totalItems = await fetchCartItemCount()
    const mainCategories = product_categories?.filter(category => MEGA_MENU.includes(category.name))
    const otherCategories = product_categories?.filter(category => !MEGA_MENU.includes(category.name)).slice(0, 4)
    if (mainCategories.length < 2) return null;
    const enhancedCategories = mainCategories.map(getEnhancedCategories)

    return (
        <Container as="nav" aria-label="nav" className="flex justify-between items-center h-[4.5rem]">
            <div className="flex justify-center items-center gap-x-2 h-full">
                <MenuDrawerButton className="xm:hidden p-2 rounded-full cursor-pointer hover:bg-accent hover:text-accent-foreground" />
                <Link href={"/"} aria-label="logo">
                    <Logo className="w-28" />
                </Link>
                <MegaMenu enhancedCategories={enhancedCategories} otherCategories={otherCategories} />
            </div>
            <div className="flex justify-center items-center h-full gap-x-3">
                <ThemeButton initialTheme={initialTheme} className="flex items-center p-2 rounded-full cursor-pointer hover:bg-accent hover:text-accent-foreground" />
                <span className="hidden md:block items-center p-2 rounded-full cursor-pointer hover:bg-accent hover:text-accent-foreground">
                    <Search size={18} strokeWidth={1.5} />
                </span>
                <Link href={"/account"} aria-label="account" className="hidden lg:block items-center p-2 rounded-full cursor-pointer hover:bg-accent hover:text-accent-foreground">
                    <User size={18} strokeWidth={1.5} />
                </Link>
                <CartDrawerButton totalItems={totalItems} className="flex items-center p-2 rounded-full cursor-pointer hover:bg-accent hover:text-accent-foreground" />
            </div>
        </Container>
    )
}