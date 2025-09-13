"use client"

import { placeOrder } from "@lib/action/cart"
import { isManual, isPaypal, isStripe } from "@lib/constant"
import { StoreCart } from "@medusajs/types"
import Button from "@module/common/custom-button"
import ErrorMessage from "@module/checkout/components/error-message"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { Loader } from "lucide-react"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalCardFieldsProvider, PayPalCVVField, PayPalExpiryField, PayPalNameField, PayPalNumberField, usePayPalCardFields, usePayPalScriptReducer } from "@paypal/react-paypal-js"

export default function PaymentButton({ cart }: PaymentButtonProps) {
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
        case isPaypal(paymentSession?.provider_id):
            return (
                <PayPalPaymentButton
                    notReady={notReady}
                    cart={cart}
                />
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

        await stripe.confirmCardPayment(session?.data.client_secret as string, {
            payment_method: {
                card: card,
                billing_details: {
                    name: cart.billing_address?.first_name + " " + cart.billing_address?.last_name,
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
            shipping: {
                name: cart.shipping_address?.first_name + " " + cart.shipping_address?.last_name,
                address: {
                    city: cart.shipping_address?.city ?? undefined,
                    country: cart.shipping_address?.country_code ?? undefined,
                    line1: cart.shipping_address?.address_1 ?? "",
                    line2: cart.shipping_address?.address_2 ?? undefined,
                    postal_code: cart.shipping_address?.postal_code ?? undefined,
                    state: cart.shipping_address?.province ?? undefined,
                },
                phone: cart.shipping_address?.phone ?? undefined
            }
        }).then(({ error, paymentIntent }) => {
            if (error) {
                const pi = error.payment_intent

                if ((pi && pi.status === "requires_capture") || (pi && pi.status === "succeeded"))
                    onPaymentCompleted()

                setErrorMessage(error.message || null)
                return
            }

            if ((paymentIntent && paymentIntent.status === "requires_capture") || paymentIntent.status === "succeeded")
                return onPaymentCompleted()

            return
        })
    }

    return (
        <>
            <Button
                disabled={disabled || notReady}
                onClick={handlePayment}
                isLoading={submitting}
                className="mt-4"
            >
                Place order
            </Button>
            <ErrorMessage error={errorMessage} />
        </>
    )
}

const PayPalPaymentButton = ({ cart, notReady }: { cart: StoreCart; notReady: boolean }) => {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onPaymentCompleted = async () => {
        await placeOrder().catch(() => {
            setErrorMessage("An error occurred, please try again.")
            setSubmitting(false)
        })
    }

    const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
    )

    const handlePayment = async (
        _data: OnApproveData,
        actions: OnApproveActions
    ) => {
        actions?.order
            ?.authorize()
            .then((authorization) => {
                if (authorization.status !== "COMPLETED") {
                    setErrorMessage(`An error occurred, status: ${authorization.status}`)
                    return
                }
                onPaymentCompleted()
            })
            .catch(() => {
                setErrorMessage(`An unknown error occurred, please try again.`)
                setSubmitting(false)
            })
    }

    const [{ isPending, isResolved }] = usePayPalScriptReducer()

    if (isPending) {
        return <Loader />
    }

    if (isResolved) {
        return (
            <>
                <PayPalButtons
                    style={{ layout: "horizontal", }}

                    createOrder={async () => session?.data.id as string}
                    onApprove={handlePayment}
                    disabled={notReady || submitting || isPending}
                />
                <PayPalCardFieldsProvider
                    createOrder={async () => session?.data.id as string}
                    onApprove={(onApprove) => { console.log(onApprove) }}
                    onError={(err) => console.log(err)}
                    style={{
                        input: {
                            "font-size": "16px",
                            "font-family": "courier, monospace",
                            "font-weight": "lighter",
                            color: "#ccc",
                        },
                        ".invalid": { color: "purple" },
                    }}
                >
                    <PayPalNameField
                        style={{
                            input: { color: "blue" },
                            ".invalid": { color: "purple" },
                        }}
                    />
                    <PayPalNumberField />
                    <PayPalExpiryField />
                    <PayPalCVVField />

                    {/* Custom client component to handle card fields submission */}
                    <SubmitPayment />
                </PayPalCardFieldsProvider>
                <ErrorMessage
                    error={errorMessage}
                />
            </>
        )
    }
}

const SubmitPayment = () => {
    const { cardFieldsForm, fields } = usePayPalCardFields();

    const handleClick = async () => {
        if (!cardFieldsForm) {
            const childErrorMessage =
                "Unable to find any child components in the <PayPalCardFieldsProvider />";

            throw new Error(childErrorMessage);
        }
        const formState = await cardFieldsForm.getState();

        if (!formState.isFormValid) {
            return alert("The payment form is invalid");
        }

        cardFieldsForm.submit().catch((err) => {
            console.log(err)
        });
    };

    return (
        <Button
            style={{ float: "right" }}
            onClick={handleClick}
        >
            {"Pay"}
        </Button>
    );
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onPaymentCompleted = async () => {
        await placeOrder().catch((err) => {
            setErrorMessage(err.message)
        }).finally(() => {
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
            >
                Place order
            </Button>
            <ErrorMessage error={errorMessage} />
        </>
    )
}

type PaymentButtonProps = {
    cart: StoreCart
}