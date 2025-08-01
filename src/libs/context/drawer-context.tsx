"use client"

import { useToggleState } from "@libs/hooks/use-toggle-state";
import { createContext, useContext } from "react";

type DrawerContextValue = {
    isCartDrawerOpen: boolean;
    toggleCartDrawer: () => void;

    isMenuDrawerOpen: boolean;
    toggleMenuDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextValue>({
    isCartDrawerOpen: false,
    toggleCartDrawer: () => { },

    isMenuDrawerOpen: false,
    toggleMenuDrawer: () => { },
})

export const useDrawer = (): DrawerContextValue => {
    const ctx = useContext(DrawerContext)
    if (!ctx) throw new Error("useDrawer must be used within DrawerProvider")
    return ctx
}

export const DrawerProvider = ({ children }: React.PropsWithChildren) => {
    const { state: isCartDrawerOpen, toggle: toggleCartDrawer } = useToggleState()
    const { state: isMenuDrawerOpen, toggle: toggleMenuDrawer } = useToggleState()

    const value = {
        isCartDrawerOpen,
        toggleCartDrawer,
        isMenuDrawerOpen,
        toggleMenuDrawer,
    }

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}