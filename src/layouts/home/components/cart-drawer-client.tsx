"use client"

import { ShoppingBag, X } from "lucide-react"
import { useDrawer } from "@libs/context/drawer-context";
import Drawer from "../components/drawer"

export default function CartDrawerClient({ children }: React.PropsWithChildren) {
    const { isCartDrawerOpen, toggleCartDrawer } = useDrawer();
    return (
        <Drawer state={isCartDrawerOpen} onClose={toggleCartDrawer} direction="right" type="cart" >
            <div className="flex flex-col h-full w-full bg-background">
                <div className="flex items-center px-4 py-3 border-b justify-between">
                    <ShoppingBag />
                    <h2 className="ml-2">Shopping Cart</h2>
                    <button className="p-2 hover:bg-accent rounded-full" onClick={toggleCartDrawer}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}