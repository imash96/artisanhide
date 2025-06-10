"use client"

import { useToggleStore } from "libs/store/use-toggle-drawer"
import { ShoppingCart, X } from "lucide-react"
import type { StoreCart } from "@medusajs/types"
import Drawer from "../components/drawer"
import CartContent from "../components/cart-content"

export default function CartDrawer({ cart }: { cart: StoreCart | null }) {
    const { isCartDrawerOpen, toggleCartDrawer } = useToggleStore()

    return (
        <Drawer state={isCartDrawerOpen} onClose={toggleCartDrawer} direction="right" type="cart" >
            <div className="flex flex-col p-6 justify-between gap-y-4 h-full w-full">
                <div className="flex items-center justify-between w-full">
                    <span className="flex justify-center items-center">
                        <ShoppingCart />
                        <h2 className="ml-2">My Cart</h2>
                    </span>
                    <button className="rounded-md button-sec" onClick={toggleCartDrawer}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>
                <hr />
                {cart && cart.items?.length ? (<CartContent cart={cart} />) : (<></>)}
            </div>
        </Drawer>
    )
}