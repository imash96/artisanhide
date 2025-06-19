"use client"

import { categories } from "../header";
import { ChevronDown } from "lucide-react";
import type { StoreProductCategory } from "@medusajs/types";
import { ArrowRight } from "lucide-react";
import MenuPromotion from "./menu-promotion";
import Link from "next/link";
import { EnhancedCategoriesType } from "./header-wrapper";
import { AnimatePresence, motion } from "motion/react";
import type { MotionProps } from "motion/react";
import { useState } from "react";

export default function MegaMenu({ enhancedCategories }: MegaMenuProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const handleMouseLeave = () => setActiveCategory(null)
    const handleMouseEnter = (id: string) => setActiveCategory(id)

    return (
        <>
            {enhancedCategories.map((category) => (
                <div key={category.id} className="group/mega flex items-center gap-0.5 cursor-default" onMouseEnter={() => handleMouseEnter(category.id)} onMouseLeave={handleMouseLeave}>
                    <button className="flex h-full items-center gap-1 mega-hover">
                        {category.name}
                        <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/mega:rotate-180" aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                        {activeCategory === category.id && <>
                            <div className="bg-black/75 absolute top-full left-0 w-full h-screen" />
                            <motion.div
                                {...megaMenuMotion}
                                onMouseLeave={handleMouseLeave}
                                className="overflow-hidden no-scrollbar border-t absolute top-full left-0 w-full bg-white z-40">
                                <div className="relative z-20 bg-gray-100">
                                    <div className="grid grid-cols-4 gap-8 px-10 py-12 mx-auto max-w-8xl md:px-10 lg:px-14">
                                        <div className="col-span-1">
                                            <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
                                                Shop by Category
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </h3>
                                            <ul className="">
                                                {category.shop.map((item) => (
                                                    <li key={item.id} className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                                        <Link href={`/category/${item.handle}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                                    <Link href={`/category/${category?.handle}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                                        View all
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-span-1">
                                            <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
                                                Shop by Style
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </h3>
                                            <ul className="">
                                                {category.style.map((item) => (
                                                    <li key={item.id} className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                                        <Link href={`/category/${item.handle}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                                    <Link href={`/category/${category?.handle}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                                        View all
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <MenuPromotion name={category.name} isMegaMenu />
                                    </div>
                                </div>
                            </motion.div>
                        </>}
                    </AnimatePresence>
                </div>
            ))}
            {categories.map((page, index) => (
                <li key={index} className={`flex mega-hover items-center gap-0.5 cursor-default`} onMouseEnter={handleMouseLeave}>
                    <Link href={page.href}>
                        {page.name}
                    </Link>
                </li>
            ))}
        </>

    )
}

const megaMenuMotion: MotionProps = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3, ease: "easeInOut" },
}

type MegaMenuProps = {
    enhancedCategories: EnhancedCategoriesType[]
    categoryData?: {
        style: StoreProductCategory[]
        shop: StoreProductCategory[]
    } & StoreProductCategory
}