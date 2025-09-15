"use client"

import { Elements } from "@stripe/react-stripe-js"
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js"
import { createContext } from "react"
import { StorePaymentSession } from "@medusajs/types"

type StripeContextProps = {
    paymentSession: StorePaymentSession
    stripeKey?: string
    stripePromise: Promise<Stripe | null> | null
    currency: string,
    buyerCountry?: string,
} & React.PropsWithChildren

export const StripeContext = createContext<{ initialized: boolean }>({ initialized: false })

export default function StripeProvider({ paymentSession, stripeKey, stripePromise, currency, buyerCountry, children }: StripeContextProps) {
    if (!stripeKey) throw new Error("Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable.")

    if (!stripePromise) throw new Error("Stripe promise is missing. Make sure you have provided a valid Stripe key.")

    const clientSecret = paymentSession?.data?.client_secret as string | undefined
    if (!clientSecret) throw new Error("Stripe client secret is missing. Cannot initialize Stripe.")

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "flat",
            labels: "floating",
            variables: {
                borderRadius: "0.375rem",
                fontSizeBase: "0.875rem",
                fontLineHeight: "1.45",
                fontWeightNormal: "400",
                fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                colorBackground: "#F2F0ED",
                colorPrimary: "#4F3424",
                colorText: "#1F1F1F",
            },
            rules: {
                ".Input": {
                    border: "1px solid var(--border)",
                    // padding: "14px 10px 6px", // top padding to make floating label consistent
                },
                ".Label": {
                    fontSize: "14px",
                },
            },
        },
        loader: "always",
    }

    return (
        <StripeContext.Provider value={{ initialized: true }}>
            <Elements options={options} stripe={stripePromise}>
                {children}
            </Elements>
        </StripeContext.Provider>
    )
}