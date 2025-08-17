"use client"

import { placeOrder } from "@libs/actions/cart"
import { isManual, isStripe } from "@libs/constant"
import { StoreCart } from "@medusajs/types"
import Button from "@modules/common/custom-button"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import ErrorMessage from "./error-message"

export default function PaymentButton({ cart }: { cart: StoreCart }) {
    const notReady = !cart || !cart.shipping_address || !cart.billing_address || !cart.email || (cart.shipping_methods?.length ?? 0) < 1

    const paymentSession = cart.payment_collection?.payment_sessions?.[0]

    switch (true) {
        case isStripe(paymentSession?.provider_id):
            return (
                <StripePaymentButton
                    notReady={notReady}
                    cart={cart}
                />
            )
        case isManual(paymentSession?.provider_id):
            return (
                <ManualTestPaymentButton notReady={notReady} />
            )
        default:
            return <Button disabled>Select a payment method</Button>
    }
}

function StripePaymentButton({ cart, notReady, }: { cart: StoreCart, notReady: boolean }) {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onPaymentCompleted = async () => await placeOrder().catch((err) => {
        setErrorMessage(err.message)
    }).finally(() => {
        setSubmitting(false)
    })


    const stripe = useStripe()
    const elements = useElements()
    const card = elements?.getElement("card")

    const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
    )

    const disabled = !stripe || !elements ? true : false

    const handlePayment = async () => {
        setSubmitting(true)

        if (!stripe || !elements || !card || !cart) {
            setSubmitting(false)
            return
        }

        await stripe
            .confirmCardPayment(session?.data.client_secret as string, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name:
                            cart.billing_address?.first_name +
                            " " +
                            cart.billing_address?.last_name,
                        address: {
                            city: cart.billing_address?.city ?? undefined,
                            country: cart.billing_address?.country_code ?? undefined,
                            line1: cart.billing_address?.address_1 ?? undefined,
                            line2: cart.billing_address?.address_2 ?? undefined,
                            postal_code: cart.billing_address?.postal_code ?? undefined,
                            state: cart.billing_address?.province ?? undefined,
                        },
                        email: cart.email,
                        phone: cart.billing_address?.phone ?? undefined,
                    },
                },
            })
            .then(({ error, paymentIntent }) => {
                if (error) {
                    const pi = error.payment_intent

                    if (
                        (pi && pi.status === "requires_capture") ||
                        (pi && pi.status === "succeeded")
                    ) {
                        onPaymentCompleted()
                    }

                    setErrorMessage(error.message || null)
                    return
                }

                if (
                    (paymentIntent && paymentIntent.status === "requires_capture") ||
                    paymentIntent.status === "succeeded"
                ) {
                    return onPaymentCompleted()
                }

                return
            })
    }

    return (
        <>
            <Button
                disabled={disabled || notReady}
                onClick={handlePayment}
                isLoading={submitting}
            >
                Place order
            </Button>
            <ErrorMessage
                error={errorMessage}
                data-testid="stripe-payment-error-message"
            />
        </>
    )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onPaymentCompleted = async () => {
        await placeOrder()
            .catch((err) => {
                setErrorMessage(err.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const handlePayment = () => {
        setSubmitting(true)

        onPaymentCompleted()
    }

    return (
        <>
            <Button
                disabled={notReady}
                isLoading={submitting}
                onClick={handlePayment}
                data-testid="submit-order-button"
            >
                Place order
            </Button>
            <ErrorMessage
                error={errorMessage}
                data-testid="manual-payment-error-message"
            />
        </>
    )
}