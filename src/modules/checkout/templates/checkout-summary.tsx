import { convertToLocale } from "@libs/util/money"
import SummaryCartCard from "../components/summary-cart-cart"
import { StoreCart } from "@medusajs/types"


export default function CheckoutSummary({ cart }: { cart: StoreCart }) {
    const { currency_code, total, subtotal, tax_total, discount_total, gift_card_total, shipping_subtotal, } = cart
    return (
        <div className="border rounded-lg space-y-6 p-5">
            <div className="py-2">
                {cart.items?.map((item, index) => (
                    <SummaryCartCard key={index} item={item as any} currency_code={currency_code} />
                ))}
            </div>
            <hr />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-gray-700 text-sm">{convertToLocale({ amount: subtotal ?? 0, currency_code })}</p>
                </div>
                {!!gift_card_total &&
                    <div className="flex items-center justify-between">
                        <p className="text-sm">Gift Card</p>
                        <p className="text-gray-700 text-sm">{convertToLocale({ amount: gift_card_total ?? 0, currency_code })}</p>
                    </div>
                }
                <div className="flex items-center justify-between">
                    <p className="text-sm">Shipping</p>
                    <p className="text-gray-700 text-sm">{convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm">Taxes</p>
                    <p className="text-gray-700 text-sm">{convertToLocale({ amount: tax_total ?? 0, currency_code })}</p>
                </div>
                <hr />
                <div className="flex items-center font-medium text-lg justify-between">
                    <p>Total</p>
                    <p>{convertToLocale({ amount: total ?? 0, currency_code })}</p>
                </div>
            </div>
        </div>
    )
}

type CartTotalsProps = {
    totals: {
        total?: number | null
        subtotal?: number | null
        tax_total?: number | null
        shipping_total?: number | null
        discount_total?: number | null
        gift_card_total?: number | null
        currency_code: string
        shipping_subtotal?: number | null
    }
}