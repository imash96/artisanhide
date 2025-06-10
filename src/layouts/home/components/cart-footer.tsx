import type { StoreCart } from "@medusajs/types"
import { Button } from "@modules/common/button"
import { useToggleStore } from "libs/store/use-toggle-drawer"
import { convertToLocale } from "libs/util/money"


export default function CartFooter({ cart }: { cart: StoreCart }) {
    const { toggleCartDrawer } = useToggleStore()
    return (
        <div className="w-full">
            <div className="flex w-full justify-between text-lg">
                <h2 className="font-semibold">SUBTOTAL</h2>
                <span className="font-normal">
                    {convertToLocale({
                        amount: cart.subtotal,
                        currency_code: cart.currency_code,
                    })}
                </span>
            </div>

            <p className="text-xs mt-2 text-gray-500">Shipping, taxes, and discounts calculated at checkout.</p>

            <Button variant="solid" onClick={toggleCartDrawer} className="w-full mt-6" href="/cart" pill>
                CHECKOUT
            </Button>
        </div>
    )
}