"use client"

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import type { StoreProductCategory } from "@medusajs/types";
import { useDrawer } from "@lib/context/drawer-context";
import Drawer from "../components/drawer";
import MenuPromotion from "../components/menu-promotion";
import MobileDrawerContact from "../components/mobile-drawer-contact";
import { MEGA_MENU } from "@/JSON/header";

export default function MobileDrawer({ parent_categories }: { parent_categories: StoreProductCategory[] }) {
    const { isMenuDrawerOpen, toggleMenuDrawer } = useDrawer();

    const [navigationStack, setNavigationStack] = useState<NavigationState[]>([
        { level: 0, category: null, breadcrumb: [] },
    ])

    const currentNav = navigationStack[navigationStack.length - 1]

    const handleCategoryClick = (category: StoreProductCategory) => {
        if (category.category_children?.length) {
            setNavigationStack(prev => [
                ...prev,
                {
                    level: currentNav.level + 1,
                    category,
                    breadcrumb: [...currentNav.breadcrumb, category],
                },
            ])
        }
    }

    const handleBack = () => (navigationStack.length > 1) && setNavigationStack((prev) => prev.slice(0, -1))

    const handleClose = () => {
        setNavigationStack([{ level: 0, category: null, breadcrumb: [] }])
        toggleMenuDrawer()
    }

    const getCurrentCategories = () => currentNav.level === 0 ? parent_categories : currentNav.category?.category_children || []

    // Show feature collections only for level 1 (parent > child, not deeper)
    const shouldShowFeatureCollections = () => currentNav.level === 1 && currentNav.category && MEGA_MENU.includes(currentNav.category.name)

    const contentVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
    }

    return (
        <Drawer state={isMenuDrawerOpen} onClose={toggleMenuDrawer} direction="left" >
            <div className="flex flex-col h-full w-full bg-background text-foreground"> {/* bg-modile-drawe bg-scroll */}
                <div className="flex items-center px-4 py-3 border-b justify-between">
                    {currentNav.level > 0 && (
                        <button onClick={handleBack} className="flex items-center text-sm hover:text-foreground-muted">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </button>
                    )}
                    <h2 className="text-base font-semibold truncate">
                        {currentNav.level === 0 ? "Menu" : currentNav.category?.name}
                    </h2>
                    <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full" onClick={handleClose}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>

                {/* Breadcrumb - Fixed Height when present */}
                {currentNav.breadcrumb.length > 0 && (
                    <div className="px-4 py-2 text-sm text-secondary-foreground bg-secondary flex items-center overflow-x-auto whitespace-nowrap">
                        {currentNav.breadcrumb.map((item, i) => (
                            <div key={item.id} className="flex items-center">
                                <span className={i === currentNav.breadcrumb.length - 1 ? "font-medium" : ""}>
                                    {item.name}
                                </span>
                                <ChevronRight className="w-4 h-4 mx-1" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${currentNav.level}-${currentNav.category?.id || "root"}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.25 }}
                        >
                            {shouldShowFeatureCollections() && (
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold mb-2">Featured Collections</h4>
                                    <MenuPromotion name={currentNav.category?.name} />
                                </div>
                            )}

                            <div className="space-y-2">
                                {getCurrentCategories().map((cat, index) => (
                                    <motion.div
                                        key={cat.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                    >
                                        {cat.category_children?.length ? (
                                            <button onClick={() => handleCategoryClick(cat)} className="w-full flex justify-between items-center text-left px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground transition">
                                                <span className="font-medium">{cat.name}</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <Link href={`/category/${cat.handle}`} className="block px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground font-medium transition" onClick={handleClose}>
                                                {cat.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Additional Bottom Contact Section */}
                    {currentNav.breadcrumb.length === 0 && (
                        <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-y-1 mt-6"
                        >
                            <MobileDrawerContact />
                        </motion.div>
                    )}
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t">
                    <button className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground">
                        <Search className="w-5 h-5" />
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </Drawer>
    )
}

type NavigationState = {
    level: number
    category: StoreProductCategory | null
    breadcrumb: StoreProductCategory[]
}