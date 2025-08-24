"use client"

import { useToggleState } from "@libs/hooks/use-toggle-state";
import { createContext, useContext, useState } from "react";

type DrawerContextValue = {
    isCartDrawerOpen: boolean;
    toggleCartDrawer: () => void;
    isMenuDrawerOpen: boolean;
    toggleMenuDrawer: () => void;
    activeCategory: string | null;
    setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export const useDrawer = (): DrawerContextValue => {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
    return ctx;
};

export const DrawerProvider = ({ children }: React.PropsWithChildren) => {
    const { state: isCartDrawerOpen, toggle: toggleCartDrawer } = useToggleState();
    const { state: isMenuDrawerOpen, toggle: toggleMenuDrawer } = useToggleState();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const value: DrawerContextValue = {
        isCartDrawerOpen,
        toggleCartDrawer,
        isMenuDrawerOpen,
        toggleMenuDrawer,
        activeCategory,
        setActiveCategory,
    };

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};