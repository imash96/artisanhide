"use client"

import { useState } from "react"
import { placeOrder } from "@lib/action/cart"
import { isManual, isPaypal, isStripe } from "@lib/constant"
import { StoreCart } from "@medusajs/types"
import Button from "@module/common/custom-button"
import ErrorMessage from "@module/checkout/components/error-message"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { Loader } from "lucide-react"
import {
    PayPalButtons,
    PayPalCardFieldsProvider,
    PayPalCVVField,
    PayPalExpiryField,
    PayPalNameField,
    PayPalNumberField,
    usePayPalCardFields,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import FinalPaymentButton from "./payment-button-new"

type PaymentButtonProps = { cart: StoreCart }

export default function PaymentButton({ cart }: PaymentButtonProps) {
    const notReady = !cart || !cart.shipping_address || !cart.billing_address || !cart.email || (cart.shipping_methods?.length ?? 0) < 1
    const paymentSession = cart.payment_collection?.payment_sessions?.[0]
    if (!paymentSession) return <FinalPaymentButton disabled>Select a payment method</FinalPaymentButton>

    if (isStripe(paymentSession.provider_id))
        return <StripePaymentButton cart={cart} notReady={notReady} />

    if (isPaypal(paymentSession.provider_id))
        return <PayPalPaymentButton cart={cart} notReady={notReady} />

    if (isManual(paymentSession.provider_id))
        return <ManualPaymentButton notReady={notReady} />

    return <FinalPaymentButton disabled>Select a valid payment method</FinalPaymentButton>
}

/* ---------------- Stripe ---------------- */
function StripePaymentButton({ cart, notReady, }: { cart: StoreCart, notReady: boolean }) {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const stripe = useStripe()
    const elements = useElements()
    const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
    )
    const card = elements?.getElement("card")

    const handlePayment = async () => {
        if (!stripe || !elements || !card || !cart) return
        setSubmitting(true)

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                session?.data.client_secret as string,
                {
                    payment_method: {
                        card,
                        billing_details: {
                            name:
                                cart.billing_address?.first_name +
                                " " +
                                cart.billing_address?.last_name,
                            email: cart.email,
                            phone: cart.billing_address?.phone ?? undefined,
                            address: {
                                line1: cart.billing_address?.address_1 ?? "",
                                line2: cart.billing_address?.address_2 ?? undefined,
                                city: cart.billing_address?.city ?? undefined,
                                state: cart.billing_address?.province ?? undefined,
                                postal_code: cart.billing_address?.postal_code ?? undefined,
                                country: cart.billing_address?.country_code ?? undefined,
                            },
                        },
                    },
                    shipping: {
                        name:
                            cart.shipping_address?.first_name +
                            " " +
                            cart.shipping_address?.last_name,
                        phone: cart.shipping_address?.phone ?? undefined,
                        address: {
                            line1: cart.shipping_address?.address_1 ?? "",
                            line2: cart.shipping_address?.address_2 ?? undefined,
                            city: cart.shipping_address?.city ?? undefined,
                            state: cart.shipping_address?.province ?? undefined,
                            postal_code: cart.shipping_address?.postal_code ?? undefined,
                            country: cart.shipping_address?.country_code ?? undefined,
                        },
                    },
                }
            )

            if (
                (paymentIntent &&
                    ["requires_capture", "succeeded"].includes(paymentIntent.status)) ||
                (error?.payment_intent &&
                    ["requires_capture", "succeeded"].includes(
                        error.payment_intent.status
                    ))
            ) {
                await placeOrder()
            } else if (error) {
                setErrorMessage(error.message ?? "Payment failed")
            }
        } catch (err: any) {
            setErrorMessage(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <FinalPaymentButton
                disabled={!stripe || !elements || notReady}
                isLoading={submitting}
                onClick={handlePayment}
            // className="w-full mt-4"
            >
                Pay with Card
            </FinalPaymentButton>
            <ErrorMessage error={errorMessage} />
        </>
    )
}

/* ---------------- PayPal ---------------- */
function PayPalPaymentButton({ cart, notReady, }: { cart: StoreCart, notReady: boolean }) {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
    )
    const [{ isPending, isResolved }] = usePayPalScriptReducer()

    const onPaymentCompleted = async () => {
        try {
            await placeOrder()
        } catch {
            setErrorMessage("An error occurred, please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const handlePayment = async (
        _data: OnApproveData,
        actions: OnApproveActions
    ) => {
        console.log(actions, _data)
        try {
            const authorization = await actions.order?.capture()
            console.log(authorization)
            if (authorization?.status !== "COMPLETED") {
                setErrorMessage(`Payment error: ${authorization?.status}`)
                return
            }
            onPaymentCompleted()
        } catch (e) {
            console.log("An unknown error occurred, please try again.", e)
            setErrorMessage("An unknown error occurred, please try again.")
        }
    }

    if (isPending) return <Loader className="animate-spin" />

    if (!isResolved) return null

    return (
        <>
            <div className="space-y-4 mt-4">
                <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={async () => session?.data.id as string}
                    onApprove={handlePayment}
                    disabled={notReady || submitting || isPending}
                />

                <PayPalCardFieldsProvider
                    createOrder={async () => session?.data.id as string}
                    onApprove={() => onPaymentCompleted()}
                    onError={(err) => setErrorMessage(err.message as string)}
                >
                    <div className="grid gap-2">
                        <PayPalNameField />
                        <PayPalNumberField />
                        <div className="flex gap-2">
                            <PayPalExpiryField className="flex-1" />
                            <PayPalCVVField className="flex-1" />
                        </div>
                        <SubmitPayPalCard />
                    </div>
                </PayPalCardFieldsProvider>
            </div>
            <ErrorMessage error={errorMessage} />
        </>
    )
}

const SubmitPayPalCard = () => {
    const { cardFieldsForm } = usePayPalCardFields()

    const handleClick = async () => {
        if (!cardFieldsForm) return
        const formState = await cardFieldsForm.getState()
        if (!formState.isFormValid) return alert("Invalid PayPal card form")

        cardFieldsForm.submit().catch(console.error)
    }

    return (
        <Button className="w-full" onClick={handleClick}>
            Pay with PayPal Card
        </Button>
    )
}

/* ---------------- Manual ---------------- */
function ManualPaymentButton({ notReady }: { notReady: boolean }) {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handlePayment = async () => {
        setSubmitting(true)
        try {
            await placeOrder()
        } catch (err: any) {
            setErrorMessage(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <FinalPaymentButton
                disabled={notReady}
                isLoading={submitting}
                onClick={handlePayment}
            // className="w-full mt-4"
            >
                Place Order (Manual)
            </FinalPaymentButton>
            <ErrorMessage error={errorMessage} />
        </>
    )
}
