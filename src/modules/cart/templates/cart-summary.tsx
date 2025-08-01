import { convertToLocale } from "@libs/util/money";
import { StoreCart } from "@medusajs/types";
import Button from "@modules/common/custom-button";


export default function CartSummary({ cart }: { cart: StoreCart }) {
    const { currency_code, total, subtotal, tax_total, discount_total, gift_card_total, shipping_subtotal, } = cart
    return (
        <div className="space-y-8 p-8 rounded-lg shadow-lg border">
            <h2 className="text-xl font-medium text-brown">Cart Summary</h2>
            <div className="space-y-4 text-gray-600">
                <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{convertToLocale({ amount: subtotal ?? 0, currency_code })}</span>
                </div>
                <hr />
                {!!gift_card_total &&
                    <>
                        <div className="flex items-center justify-between text-sm">
                            <span>Gift Card</span>
                            <span>{convertToLocale({ amount: gift_card_total ?? 0, currency_code })}</span>
                        </div>
                        <hr />
                    </>
                }
                {!!discount_total &&
                    <>
                        <div className="flex items-center justify-between text-sm">
                            <span>Gift Card</span>
                            <span>{convertToLocale({ amount: discount_total ?? 0, currency_code })}</span>
                        </div>
                        <hr />
                    </>
                }
                <div className="flex items-center justify-between text-sm">
                    <span>Shipping</span>
                    <span>{convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between text-sm">
                    <span>Taxes</span>
                    <span>{convertToLocale({ amount: tax_total ?? 0, currency_code })}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between text-sm">
                    <span>Total</span>
                    <span>{convertToLocale({ amount: total ?? 0, currency_code })}</span>
                </div>
            </div>
            <div>
                <Button href={"/checkout"} pill >
                    CHECKOUT
                </Button>
            </div>
        </div>
    )
}