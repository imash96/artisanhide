"use client"

import { DrawerContext } from "@libs/context/drawer-context";
import { Text } from "lucide-react"
import { use } from "react";

// TODO: mix mobilebutton with mobile drawer
export default function MenuDrawerButton({ className }: { className: string }) {
    const { toggleMenuDrawer } = use(DrawerContext);
    return (
        <button className={className} aria-label="Toggle menu" onClick={toggleMenuDrawer}>
            <Text size={24} strokeWidth={2} />
        </button>
    )
}