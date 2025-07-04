import { retrieveCart } from "@libs/actions/cart";
import { retrieveCustomer } from "@libs/actions/customer";
import { listCartShippingMethods } from "@libs/actions/fulfillment";
import { listCartPaymentMethods } from "@libs/actions/payment";
import PaymentWrapper from "@modules/checkout/components/payment-wrapper";
import CheckoutForm from "@modules/checkout/templates/checkout-form";
import CheckoutSummary from "@modules/checkout/templates/checkout-summary";
import Container from "@modules/common/create-section";
import { notFound } from "next/navigation";

export default async function Page() {
    const cart = await retrieveCart();

    if (!cart) return notFound();

    const customer = await retrieveCustomer()

    const shippingMethods = await listCartShippingMethods(cart.id)
    const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

    if (!shippingMethods || !paymentMethods) return null

    return (
        <Container width={7} className="grid grid-cols-1 gap-x-14 lg:grid-cols-10 py-8 md:py-10 lg:py-14 w-full">
            <div className="lg:col-span-6 h-[200vh]">
                <PaymentWrapper cart={cart}>
                    <CheckoutForm />
                </PaymentWrapper>
            </div>
            <div className="lg:col-span-4 sticky top-24 self-start w-full">
                <CheckoutSummary cart={cart} />
            </div>
        </Container>
    )
}