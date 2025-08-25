import type { StoreCart } from "@medusajs/types"
import CartDrawerClient from "../components/cart-drawer-client"
import CartContent from "../components/cart-content"
import EmptyCart from "../components/empty-cart"

export default function CartDrawer({ cart }: { cart: StoreCart | null }) {
    return (
        <CartDrawerClient>
            {cart && cart.items?.length ? (<CartContent cart={cart} />) : (<EmptyCart />)}
        </CartDrawerClient>
    )
}

