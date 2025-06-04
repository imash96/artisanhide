"use client"

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "@modules/common/create-section";
import Logo from "@/icons/logo";
import LocalizedClientLink from "@modules/common/localized-client-link";
import { ChevronDown, Search, ShoppingBag, User } from "lucide-react";
import { categories } from "../header";
import MegaMenu from "./mega-menu";
import { StoreProductCategory } from "@medusajs/types";
import { motion, AnimatePresence } from "motion/react";
import ThemeButton from "./button-theme";

const HOME_REGEX = /^\/[a-z]{2}$/

export default function HeaderWrapper({ enhancedCategories, initialTheme }: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeMenu, setActiveMenu] = useState<EnhancedCategoriesType | null>(null);
    const pathname = usePathname()
    const isHome = useMemo(() => HOME_REGEX.test(pathname), [pathname]);

    const detectScrollY = useCallback(() => setIsScrolled(window.scrollY > 35), [])

    useEffect(() => {
        document.addEventListener("scroll", detectScrollY, { passive: true });
        return () => document.removeEventListener("scroll", detectScrollY);
    }, [detectScrollY]);

    const handleClick = () => setActiveMenu(null);

    return (
        <div className={`group/nav sticky top-0 z-40 transition-all ease-in-out duration-300 hover:bg-gray-100 hover:text-brown ${isScrolled ? "bg-gray-100 shadow-md text-brown" : "bg-transparent text-gray-50 group-hover/nav:text-brown"} ${!isHome && "shadow-md"}`}>
            <Container as="nav" aria-label="nav" className="flex justify-between items-center h-[4.5rem]">
                <div className="flex justify-center items-center gap-x-2 h-full">
                    <LocalizedClientLink href={"/"}>
                        <Logo className={`w-26`} />
                    </LocalizedClientLink>

                    <ul className="hidden xm:flex xm:gap-x-6 gap-2.5 text-sm h-full font-extralight tracking-[0.05em] ml-6">
                        {enhancedCategories.map((item) => (
                            <li key={item.id} className={`group/mega flex mega-hover items-center gap-0.5 cursor-default`} onMouseEnter={() => setActiveMenu(item)}>
                                <button className="flex gap-1">
                                    {item.name}
                                    <ChevronDown className="w-5 h-5 transition-transform duration-200 group-hover/mega:rotate-180" aria-hidden="true" />
                                </button>
                            </li>
                        ))}
                        {categories.map((item, index) => (
                            <li key={index} className={`flex mega-hover items-center gap-0.5 cursor-default`} onMouseEnter={() => setActiveMenu(null)}>
                                <LocalizedClientLink href={item.href} className="">
                                    {item.name}
                                </LocalizedClientLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center items-center h-full gap-2">
                    <span className="flex items-center header-btn p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                        <Search size={18} strokeWidth={1.5} />
                    </span>
                    <span className="flex items-center header-btn p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                        <ShoppingBag size={18} strokeWidth={1.5} />
                    </span>
                    <LocalizedClientLink href={"/account"} className="flex items-center header-btn p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400">
                        <User size={18} strokeWidth={1.5} />
                    </LocalizedClientLink>

                    <ThemeButton initialTheme={initialTheme} className="flex items-center header-btn p-1 lg:p-2 rounded-full cursor-pointer hover:bg-gray-400" />
                </div>
            </Container>

            {activeMenu && (
                <div className="bg-black/75 absolute top-full left-0 w-full h-screen"></div>
            )}

            <AnimatePresence>
                {activeMenu && <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onMouseLeave={handleClick}
                    className="overflow-hidden no-scrollbar hidden xm:block border absolute bg-gray-50 z-50 group-hover/mega:block border-t top-full left-0 w-full"
                >
                    <MegaMenu categoryData={activeMenu} />
                </motion.div>
                }
            </AnimatePresence>
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
}