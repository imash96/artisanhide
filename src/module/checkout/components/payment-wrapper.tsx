"use client"

import { loadStripe } from "@stripe/stripe-js"
import { StoreCart } from "@medusajs/types"
import { isStripe } from "@lib/constant"
import StripeProvider from "@lib/context/stripe-context"

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

    return <>{children}</>
}

type PaymentWrapperProps = {
    cart: StoreCart
} & React.PropsWithChildren