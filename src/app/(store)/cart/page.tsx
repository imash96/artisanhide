import { retrieveCart } from "@libs/actions/cart";
import EmptyCart from "@modules/cart/components/empty-cart";
import CartSummary from "@modules/cart/templates/cart-summary";
import Container from "@modules/common/create-section";
import { notFound } from "next/navigation";

export default async function Page() {
    const cart = await retrieveCart();

    if (!cart) return notFound();

    return (
        <Container width={7} className="grid grid-cols-1 gap-x-14 lg:grid-cols-10 py-8 md:py-10 lg:py-14 w-full">
            <div className="lg:col-span-6">
                <h1 className="text-2xl font-medium text-brown">Your Cart</h1>
                {cart.items?.length === 0 ? <EmptyCart /> : <></>}

            </div>
            <div className="lg:col-span-4 sticky top-24 self-start w-full">
                <CartSummary cart={cart} />
            </div>
        </Container>
    )
}