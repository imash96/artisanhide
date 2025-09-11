"use client"

import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, type MotionProps } from "motion/react";
import { div as Div } from "motion/react-client";
import MenuPromotion from "./menu-promotion";
import { useDrawer } from "@lib/context/drawer-context";
import { ProductCategory } from "@/type/common";

export default function MegaMenu({ enhancedCategories, otherCategories }: MegaMenuProps) {
    const { activeCategory, setActiveCategory } = useDrawer();

    const handleMouseLeave = () => setActiveCategory(null)
    const handleMouseEnter = (id: string) => setActiveCategory(id)

    return (
        <nav className="hidden gap-2.5 text-sm h-full font-extralight tracking-[0.05em] ml-6 lg:flex lg:gap-x-6">
            {enhancedCategories.map((category) => (
                <div key={category.id} className="group/mega flex items-center gap-0.5 cursor-default" onMouseEnter={() => handleMouseEnter(category.id)} onMouseLeave={handleMouseLeave}>
                    <button className="flex h-full items-center gap-1 mega-hover">
                        {category.name}
                        <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/mega:rotate-180" aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                        {activeCategory === category.id && <>
                            <div className="bg-overlay absolute top-full left-0 w-full h-screen" onClick={handleMouseLeave} />
                            <Div
                                {...megaMenuMotion}
                                onMouseLeave={handleMouseLeave}
                                className="overflow-hidden no-scrollbar border-t absolute top-full left-0 w-full z-40">
                                <div className="relative z-20 bg-background-muted">
                                    <div className="grid grid-cols-4 text-foreground-muted gap-8 px-10 py-12 mx-auto max-w-8xl md:px-10 lg:px-14">
                                        <div className="col-span-1">
                                            <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-border">
                                                Shop by Category
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </h3>
                                            <ul className="">
                                                {category.shop.map((item) =>
                                                    <LinkMenu key={item.id} handle={item.handle} title={item.name} />
                                                )}
                                                <LinkMenu handle={category?.handle} bold />
                                            </ul>
                                        </div>
                                        <div className="col-span-1">
                                            <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-border">
                                                Shop by Style
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </h3>
                                            <ul className="">
                                                {category.style.map((item) =>
                                                    <LinkMenu key={item.id} handle={item.handle} title={item.name} />
                                                )}
                                                <LinkMenu handle={category?.handle} bold />
                                            </ul>
                                        </div>
                                        <MenuPromotion name={category.name} isMegaMenu />
                                    </div>
                                </div>
                            </Div>
                        </>}
                    </AnimatePresence>
                </div>
            ))}
            {otherCategories?.map((page, index) => (
                <li key={index} className={`flex mega-hover items-center gap-0.5 cursor-default`} onMouseEnter={handleMouseLeave}>
                    <Link href={page.handle}>
                        {page.name}
                    </Link>
                </li>
            ))}
        </nav>

    )
}

const LinkMenu = ({ bold, handle, title = "View all" }: LinkMenuProps) => {
    return (
        <li className={`group/link w-full px-2 py-3 hover:bg-accent hover:text-accent-foreground rounded ${bold && "font-medium"}`}>
            <Link href={`/category/${handle}`} className="group-hover/link:text-accent-foreground transition-colors duration-50">
                {title}
            </Link>
        </li>
    )
}

const megaMenuMotion: MotionProps = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3, ease: "easeInOut" },
}

export type MegaMenuProps = {
    enhancedCategories: {
        shop: ProductCategory[];
        style: ProductCategory[];
        name: string,
        id: string,
        handle: string
    }[],
    otherCategories?: ProductCategory[]
}

type LinkMenuProps = {
    bold?: boolean,
    handle: string,
    title?: string
}