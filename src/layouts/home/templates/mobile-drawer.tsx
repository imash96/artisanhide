"use client"

import { useState } from "react";
import type { StoreProductCategory } from "@medusajs/types";
import { AnimatePresence, motion } from "motion/react";
import { useToggleStore } from "libs/store/use-toggle-drawer";
import { ChevronLeft, ChevronRight, Search, User, X } from "lucide-react";
import Drawer from "../components/drawer";
import MenuPromotion from "../components/menu-promotion";
import { MEGA_MENU } from "../header";
import MobileDrawerContact from "../components/mobile-drawer-contact";

export default function MobileDrawer({ parent_categories }: { parent_categories: StoreProductCategory[] }) {
    const { isMenuDrawerOpen, toggleMenuDrawer } = useToggleStore()

    const [navigationStack, setNavigationStack] = useState<NavigationState[]>([
        { level: 0, category: null, breadcrumb: [] },
    ])

    const currentNav = navigationStack[navigationStack.length - 1]

    const handleCategoryClick = (category: StoreProductCategory) => {
        if (category.category_children && category.category_children.length > 0) {
            setNavigationStack((prev) => [
                ...prev,
                {
                    level: currentNav.level + 1,
                    category,
                    breadcrumb: [...currentNav.breadcrumb, category],
                },
            ])
        }
    }

    const handleBack = () => {
        if (navigationStack.length > 1) {
            setNavigationStack((prev) => prev.slice(0, -1))
        }
    }

    const handleClose = () => {
        setNavigationStack([{ level: 0, category: null, breadcrumb: [] }])
        toggleMenuDrawer()
    }

    const getCurrentCategories = () => {
        if (currentNav.level === 0) {
            return parent_categories
        }
        return currentNav.category?.category_children || []
    }

    // Show feature collections only for level 1 (parent > child, not deeper)
    const shouldShowFeatureCollections = () => currentNav.level === 1 && currentNav.category && MEGA_MENU.includes(currentNav.category?.name)

    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    }

    return (
        <Drawer state={isMenuDrawerOpen} onClose={toggleMenuDrawer} direction="left" >
            <div className="flex flex-col justify-between h-full w-full bg-modile-drawe bg-scroll">
                <div className="flex items-center px-6 py-4 border-b justify-between w-full">
                    {currentNav.level > 0 && (
                        <button onClick={handleBack} className="flex items-center mr-3">
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span className="text-sm">Back</span>
                        </button>
                    )}
                    <h2 className="text-lg font-semibold truncate">
                        {currentNav.level === 0 ? "Menu" : currentNav.category?.name}
                    </h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0" onClick={handleClose}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>

                {/* Breadcrumb - Fixed Height when present */}
                {currentNav.breadcrumb.length > 0 && (
                    <div className="flex-shrink-0 px-4 py-2 bg-gray-50 border-b">
                        <div className="flex items-center text-sm text-gray-600 overflow-hidden">
                            {currentNav.breadcrumb.map((item, index) => (
                                <div key={item.id} className="flex items-center flex-shrink-0">
                                    <span className={`truncate ${index === currentNav.breadcrumb.length - 1 ? "text-gray-900 font-medium" : ""}`}>
                                        {item.name}
                                    </span>
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto py-4 px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${currentNav.level}-${currentNav.category?.id || "root"}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            {/* Feature Collections - Only for level 1 */}
                            {shouldShowFeatureCollections() && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h4 className="text-lg font-semibold">Featured Collections</h4>
                                    <MenuPromotion name={currentNav.category?.name} />
                                </motion.div>
                            )}

                            {/* Categories List */}
                            <div className="space-y-2 divide-y">
                                {getCurrentCategories().map((category, index) => (
                                    <motion.button
                                        key={category.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleCategoryClick(category)}
                                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors group"
                                    >
                                        <span className="font-medium text-gray-900 group-hover:text-gray-700">{category.name}</span>
                                        {category.category_children && category.category_children.length > 0 && (
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Empty State for categories without children */}
                            {getCurrentCategories().length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No subcategories available</p>
                                </div>
                            )}
                        </motion.div>
                        {currentNav.breadcrumb.length === 0 && (
                            <motion.div
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-y-1 py-6 font-normal">
                                <MobileDrawerContact />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="flex justify-between px-4 py-3 border-t border-gray-300 z-10 bg-gray-100" onClick={toggleMenuDrawer}>
                    <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
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