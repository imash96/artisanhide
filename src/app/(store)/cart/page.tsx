import { retrieveCart } from "@lib/action/cart";
import EmptyCart from "@module/cart/templates/empty-cart";
import CartSummary from "@module/cart/templates/cart-summary";
import Container from "@module/common/create-section";
import { notFound } from "next/navigation";
import CartLineitem from "@module/cart/templates/line-item-new";
import { retrieveCustomer } from "@lib/action/customer";
import SignInPrompt from "@module/cart/templates/sign-in-prompt";

export default async function Page() {
    const [customer, cart] = await Promise.all([retrieveCustomer(), retrieveCart()]);
    if (!cart) return notFound();

    return (
        <Container width={7} className="grid grid-cols-1 lg:gap-x-6 xl:gap-x-14 gap-y-8 lg:grid-cols-10 py-8 md:py-10 lg:py-14">
            <div className="lg:col-span-6 space-y-4">
                {!customer && (<SignInPrompt />)}
                {cart.items?.length ? <CartLineitem items={cart.items} currencyCode={cart.currency_code} /> : <EmptyCart />}
            </div>
            <div className="lg:col-span-4 sticky top-24 self-start w-full">
                <CartSummary cart={cart} />
            </div>
        </Container>
    )
}