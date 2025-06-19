import type { StoreProductCategory } from "@medusajs/types";
import { Search, User } from "lucide-react";
import Link from "next/link"
import Logo from "@/icons/logo";
import MegaMenu from "./mega-menu";
import MenuDrawerButton from "./button-menu-drawer";
import Container from "@modules/common/create-section";
import ThemeButton from "./button-theme";
import CartDrawerButton from "./button-cart-drawer";

export default function HeaderWrapper({ enhancedCategories, initialTheme, totalItems }: HeaderWrapperProps) {
    return (
        <Container as="nav" aria-label="nav" className="flex justify-between items-center h-[4.5rem]">
            <div className="flex justify-center items-center gap-x-2 h-full">
                <MenuDrawerButton className="xm:hidden p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
                <Link href={"/"} aria-label="logo">
                    <Logo className={`w-26`} />
                </Link>
                <nav className="hidden gap-2.5 text-sm h-full font-extralight tracking-[0.05em] ml-6 lg:flex lg:gap-x-6">
                    <MegaMenu enhancedCategories={enhancedCategories} />
                </nav>
            </div>
            <div className="flex justify-center items-center h-full gap-2">
                <ThemeButton initialTheme={initialTheme} className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
                <span className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                    <Search size={18} strokeWidth={1.5} />
                </span>
                <Link href={"/account"} aria-label="account" className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                    <User size={18} strokeWidth={1.5} />
                </Link>
                <CartDrawerButton totalItems={totalItems} className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
            </div>
        </Container>
    )
}

export type EnhancedCategoriesType = {
    shop: StoreProductCategory[];
    style: StoreProductCategory[];
} & StoreProductCategory

type HeaderWrapperProps = {
    enhancedCategories: EnhancedCategoriesType[]
    initialTheme: "light" | "dark"
    totalItems: number
}