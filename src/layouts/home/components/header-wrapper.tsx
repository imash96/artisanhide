"use client"

import { StoreProductCategory } from "@medusajs/types";
import Container from "@modules/common/create-section";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import MenuDrawerButton from "./button-menu-drawer";
import LocalizedClientLink from "@modules/common/localized-client-link";
import Logo from "@/icons/logo";
import { Popover, PopoverButton, PopoverGroup } from "@headlessui/react";
import { categories } from "../header";
import { ChevronDown, Search, User } from "lucide-react";
import MegaMenu from "./mega-menu";
import ThemeButton from "./button-theme";
import CartDrawerButton from "./button-cart-drawer";

const HOME_REGEX = /^\/[a-z]{2}$/

export default function HeaderWrapper({ enhancedCategories, initialTheme, totalItems }: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = useState(false)

    const detectScrollY = useCallback(() => setIsScrolled(window.scrollY > 35), [])
    const pathname = usePathname()
    const isHome = useMemo(() => HOME_REGEX.test(pathname), [pathname]);

    useEffect(() => {
        document.addEventListener("scroll", detectScrollY, { passive: true });
        return () => document.removeEventListener("scroll", detectScrollY);
    }, [detectScrollY]);

    return (
        <div className={`group/nav sticky top-0 z-10 transition-colors ease-in-out duration-300 hover:text-brown hover:bg-gray-100 ${isScrolled ? "bg-gray-100 shadow-md text-brown" : "bg-transparent text-gray-50 group-hover/nav:text-brown"} ${!isHome && "shadow-md"}`}>
            <Container as="nav" aria-label="nav" className="flex justify-between items-center h-[4.5rem]">
                <div className="flex justify-center items-center gap-x-2 h-full">
                    <MenuDrawerButton className="xm:hidden p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
                    <LocalizedClientLink href={"/"} aria-label="logo">
                        <Logo className={`w-26`} />
                    </LocalizedClientLink>
                    <PopoverGroup as="ul" className="hidden gap-2.5 text-sm h-full font-extralight tracking-[0.05em] ml-6 lg:flex lg:gap-x-6">
                        {enhancedCategories.map((category) => (
                            <Popover key={category.id} className="group/mega flex items-center gap-0.5 cursor-default">
                                <PopoverButton className="flex h-full items-center gap-1 mega-hover">
                                    {category.name}
                                    <ChevronDown className="w-5 h-5 transition-transform duration-200 group-hover/mega:rotate-180" aria-hidden="true" />
                                </PopoverButton>
                                <MegaMenu categoryData={category} />
                            </Popover>
                        ))}

                        {categories.map((page, index) => (
                            <li key={index} className={`flex mega-hover items-center gap-0.5 cursor-default`}>
                                <LocalizedClientLink href={page.href}>
                                    {page.name}
                                </LocalizedClientLink>
                            </li>
                        ))}
                    </PopoverGroup>
                </div>
                <div className="flex justify-center items-center h-full gap-2">
                    <ThemeButton initialTheme={initialTheme} className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
                    <span className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                        <Search size={18} strokeWidth={1.5} />
                    </span>
                    <LocalizedClientLink href={"/account"} aria-label="account" className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                        <User size={18} strokeWidth={1.5} />
                    </LocalizedClientLink>

                    <CartDrawerButton totalItems={totalItems} className="flex items-center p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
                </div>
            </Container>
        </div>
    )
}

type EnhancedCategoriesType = {
    shop: StoreProductCategory[];
    style: StoreProductCategory[];
} & StoreProductCategory

type HeaderClientProps = {
    enhancedCategories: EnhancedCategoriesType[]
    initialTheme: "light" | "dark"
    totalItems: number
}