import { StepId } from "@/types/common";
import { retrieveCart } from "@libs/actions/cart";
import { retrieveCustomer } from "@libs/actions/customer";
import { listCartShippingMethods } from "@libs/actions/fulfillment";
import { listCartPaymentMethods } from "@libs/actions/payment";
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import AddressStep from "@modules/checkout/templates/step-address";
import CheckoutProgress from "@modules/checkout/templates/checkout-progress"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary";
import { notFound, redirect } from "next/navigation";
import ShippingStep from "@modules/checkout/templates/step-shipping";

const validSteps: StepId[] = ["address", "shipping", "payment"];

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const isValidStep = validSteps.includes((await searchParams).step as StepId);
    if (!isValidStep) redirect("/checkout?step=address");

    const cart = await retrieveCart();
    if (!cart) return notFound();

    const [customer, shippingMethods, paymentMethods] = await Promise.all([
        retrieveCustomer(),
        listCartShippingMethods(cart.id),
        listCartPaymentMethods(cart.region?.id ?? "")
    ]);

    if (!shippingMethods || !paymentMethods) return null

    return (
        <PaymentWrapper cart={cart}>
            <div className="lg:col-span-6 space-y-8 min-h-screen">
                <CheckoutProgress />
                <AddressStep cart={cart} customer={customer} />
                <ShippingStep cart={cart} availableShippingMethods={shippingMethods} />
                {/* <PaymentStep /> */}
            </div>
            <div className="lg:col-span-4 sticky top-24 self-start w-full">
                <CheckoutSummary cart={cart} />
            </div>
        </PaymentWrapper>
    )
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>