import CartDrawerClient from "../components/cart-drawer-client"
import CartContent from "../components/cart-content"
import EmptyCart from "../../../module/common/empty-cart"
import { retrieveCart } from "@lib/action/cart"

export default async function CartDrawer() {
    const cart = await retrieveCart()
    return (
        <CartDrawerClient>
            {cart && cart.items?.length ? (<CartContent cart={cart} />) : (<EmptyCart className="min-h-[70vh]" />)}
        </CartDrawerClient>
    )
}

