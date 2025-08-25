import { retrieveCart } from "@lib/action/cart";
import { retrieveCustomer } from "@lib/action/customer";
import { listCartShippingMethods } from "@lib/action/fulfillment";
import { listCartPaymentMethods } from "@lib/action/payment";
import PaymentWrapper from "@module/checkout/components/payment-wrapper"
import AddressStep from "@module/checkout/templates/step-address";
import CheckoutProgress from "@module/checkout/templates/checkout-progress"
import CheckoutSummary from "@module/checkout/templates/checkout-summary";
import { notFound } from "next/navigation";
import ShippingStep from "@module/checkout/templates/step-shipping";
import PaymentStep from "@module/checkout/templates/step-payment";
import { CheckoutProvider } from "@lib/context/checkout-context";

export default async function Page() {
    const cart = await retrieveCart();
    if (!cart) return notFound();

    const [customer, shippingMethods, paymentMethods] = await Promise.all([
        retrieveCustomer(),
        listCartShippingMethods(cart.id),
        listCartPaymentMethods(cart.region?.id ?? "")
    ]);

    if (!shippingMethods || !paymentMethods) return null

    return (
        <CheckoutProvider>
            <div className="lg:col-span-6 space-y-8 min-h-screen">
                <CheckoutProgress />
                <PaymentWrapper cart={cart}>
                    <AddressStep cart={cart} customer={customer} />
                    <ShippingStep cart={cart} availableShippingMethods={shippingMethods} />
                    <PaymentStep paymentMethods={paymentMethods} cart={cart} />
                </PaymentWrapper>
            </div>
            <div className="lg:col-span-4 sticky top-24 self-start w-full">
                <CheckoutSummary cart={cart} />
            </div>
        </CheckoutProvider >
    )
}