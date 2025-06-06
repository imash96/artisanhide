import { create } from "zustand";

type ToggleStore = {
    isCartDrawerOpen: boolean;
    toggleCartDrawer: () => void;

    isMenuDrawerOpen: boolean;
    toggleMenuDrawer: () => void;
};

export const useToggleStore = create<ToggleStore>((set) => ({
    isCartDrawerOpen: false,
    toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

    isMenuDrawerOpen: false,
    toggleMenuDrawer: () => set((state) => ({ isMenuDrawerOpen: !state.isMenuDrawerOpen })),
}));
