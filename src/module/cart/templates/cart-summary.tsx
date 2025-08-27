import { convertToLocale } from "@lib/util/money";
import { StoreCart } from "@medusajs/types";
import Button from "@module/common/custom-button";
import DiscountCode from "../components/DiscountCode";

export default function CartSummary({ cart }: { cart: StoreCart }) {
    const { currency_code, total, subtotal, tax_total, discount_total, gift_card_total, shipping_subtotal, } = cart
    return (
        <div className="space-y-6 p-8 rounded-lg shadow-lg border">
            <DiscountCode promotions={cart.promotions} />
            <hr />
            <h2 className="text-xl font-medium">Cart Total</h2>
            <div className="space-y-4 text-card-foreground text-sm">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{convertToLocale({ amount: subtotal ?? 0, currency_code })}</span>
                </div>
                {!!gift_card_total &&
                    <>
                        <div className="flex items-center justify-between">
                            <span>Gift Card</span>
                            <span>{convertToLocale({ amount: gift_card_total ?? 0, currency_code })}</span>
                        </div>
                    </>
                }
                {!!discount_total &&
                    <>
                        <div className="flex items-center justify-between text-price-discount">
                            <span>Discount</span>
                            <span>{convertToLocale({ amount: discount_total ?? 0, currency_code })}</span>
                        </div>
                    </>
                }
                <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>{convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span>{convertToLocale({ amount: tax_total ?? 0, currency_code })}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>{convertToLocale({ amount: total ?? 0, currency_code })}</span>
                </div>
            </div>
            <Button href={"/checkout"} pill className="w-full" >
                CHECKOUT
            </Button>
        </div>
    )
}