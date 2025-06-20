"use client"

import { ShoppingBag } from "lucide-react"
import { useToggleStore } from "libs/store/use-toggle-drawer"

// TODO: mix cartbutton with cart drawer
export default function CartDrawerButton({ className, totalItems }: CartDrawerButtonProps) {
    const { toggleCartDrawer } = useToggleStore()
    return (
        <button onClick={toggleCartDrawer} className={className}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="sr-only">items in cart, view bag</span>
            <span className="ml-2 text-sm font-medium">{totalItems}</span>
        </button>
    )
}

type CartDrawerButtonProps = {
    className: string;
    totalItems: number
}