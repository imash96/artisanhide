"use client"

import { useToggleStore } from "libs/store/use-toggle-drawer"
import { ShoppingBag, X } from "lucide-react"
import Drawer from "../components/drawer"

export default function CartDrawerClient({ children }: React.PropsWithChildren) {
    const { isCartDrawerOpen, toggleCartDrawer } = useToggleStore()
    return (
        <Drawer state={isCartDrawerOpen} onClose={toggleCartDrawer} direction="right" type="cart" >
            <div className="flex flex-col justify-between h-full w-full">
                <div className="flex items-center px-6 py-4 border-b justify-between w-full">
                    <ShoppingBag />
                    <h2 className="ml-2">Shopping Cart</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0" onClick={toggleCartDrawer}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}