import type { StoreCart } from "@medusajs/types"
import CartDrawerClient from "../components/cart-drawer-client"
import CartContent from "../components/cart-content"
import Button from "@modules/common/custom-button"
import Image from "next/image"


export default function CartDrawer({ cart }: { cart: StoreCart | null }) {
    return (
        <CartDrawerClient>
            {cart && cart.items?.length ? (<CartContent cart={cart} />) : (<EmptyCart />)}
        </CartDrawerClient>
    )
}

function EmptyCart() {
    return (
        <div className="flex flex-col items-center mt-12 h-full gap-y-4 text-center p-4">
            <Image
                src={"/temp_img/emptycart.jpg"}
                alt="empty cart"
                height={150}
                width={150}
            />
            <h3 className="text-lg font-semibold">No products in the cart.</h3>
            <p className="text-gray-500 mb-2">Your cart is currently empty. Let us help you find the perfect item!</p>
            <Button pill className="px-6 py-3">
                Continue Shopping
            </Button>
        </div>
    )
}