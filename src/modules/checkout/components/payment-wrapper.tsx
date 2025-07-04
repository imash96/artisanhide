"use client"

import { isStripe } from "@libs/constant"
import { StoreCart } from "@medusajs/types"
import { loadStripe } from "@stripe/stripe-js"
import StripeWrapper from "./stripe-wrapper"

type PaymentWrapperProps = {
    cart: StoreCart
} & React.PropsWithChildren

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
const stripePromise = stripeKey ? loadStripe(stripeKey) : null

export default function PaymentWrapper({ cart, children }: PaymentWrapperProps) {
    const paymentSession = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
    )

    if (isStripe(paymentSession?.provider_id) && paymentSession && stripePromise) {
        return (
            <StripeWrapper paymentSession={paymentSession} stripeKey={stripeKey} stripePromise={stripePromise}>
                {children}
            </StripeWrapper>
        )
    }

    return <div>{children}</div>
}