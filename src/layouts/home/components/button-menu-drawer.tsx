"use client"

import { useToggleStore } from "libs/store/use-toggle-drawer"
import { Text } from "lucide-react"

export default function MenuDrawerButton({ className }: { className: string }) {
    const { toggleMenuDrawer } = useToggleStore()
    return (
        <button className={className} aria-label="Toggle menu" onClick={toggleMenuDrawer}>
            <Text size={24} strokeWidth={2} />
        </button>
    )
}