"use client"

import { useDrawer } from "@lib/context/drawer-context";
import { Text } from "lucide-react";

export default function MenuDrawerButton({ className }: { className: string }) {
    const { toggleMenuDrawer } = useDrawer();

    return (
        <button
            type="button"
            className={className}
            aria-label="Toggle menu"
            onClick={toggleMenuDrawer}
        >
            <Text size={24} strokeWidth={2} />
        </button>
    );
}
