"use client"

import { loadStripe } from "@stripe/stripe-js"
import { StoreCart } from "@medusajs/types"
import { isStripe } from "@lib/constant"
import StripeProvider from "@lib/context/stripe-context"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
const stripePromise = stripeKey ? loadStripe(stripeKey) : null

export default function PaymentWrapper({ cart, children }: PaymentWrapperProps) {
    const paymentSession = cart.payment_collection?.payment_sessions?.find(s => s.status === "pending")

    if (isStripe(paymentSession?.provider_id) && paymentSession && stripePromise) {
        return (
            <StripeProvider paymentSession={paymentSession} stripeKey={stripeKey} stripePromise={stripePromise}>
                {children}
            </StripeProvider>
        )
    }

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

    if (
        paymentSession?.provider_id === "pp_paypal_paypal" &&
        paypalClientId !== undefined &&
        cart
    ) {
        return (
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                    buyerCountry: cart.shipping_address?.country_code?.toUpperCase(),
                    currency: cart.currency_code.toUpperCase(),
                    intent: "capture",
                    dataPageType: "checkout",
                    components: "buttons",
                }}
            >
                {children}
            </PayPalScriptProvider>
        )
    }

    return <>{children}</>
}

type PaymentWrapperProps = {
    cart: StoreCart
} & React.PropsWithChildren