"use client"

import { CreditCard } from "lucide-react";
import StepHeader from "../components/step-header";
import { useCheckout } from "@libs/context/checkout-context";
import { StoreCart, StorePaymentProvider } from "@medusajs/types";
import { isStripe as isStripeFunc } from "@libs/constant";
import { useLayoutEffect, useState } from "react";
import { initiatePaymentSessionCustom, initiatePaymentSession } from "@libs/actions/payment";
import PaymentContainer, { StripeCardContainer } from "../components/payment-container";
import { paymentInfoMap } from "../components/payment-map";
import PaymentButton from "../components/payment-button";

export default function PaymentStep({ cart, paymentMethods }: ShippingProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "payment"
    const activeSession = cart.payment_collection?.payment_sessions?.find(
        (paymentSession: any) => paymentSession.status === "pending"
    )
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(activeSession?.provider_id ?? "")
    const [error, setError] = useState<string | null>(null)
    const [cardBrand, setCardBrand] = useState<string | null>(null)
    const [cardComplete, setCardComplete] = useState(false)

    const isStripe = isStripeFunc(selectedPaymentMethod)

    const setPaymentMethod = async (method: string) => {
        setSelectedPaymentMethod(method)
        if (isStripeFunc(method)) {
            await initiatePaymentSessionCustom(cart.id, cart.payment_collection?.id, {
                provider_id: method,
                data: { payment_description: "Men Leather Jacket" }
            }, {})
        }
    }

    const paymentReady = (activeSession && cart.shipping_methods?.length !== 0 && cart.shipping_address?.address_1)

    useLayoutEffect(() => {
        if (!cart.shipping_methods?.length && currentStep === "payment") setCurrentStep("delivery")
    }, [currentStep]);

    // useLayoutEffect(() => {
    //     if (!paymentReady && currentStep === "payment") setCurrentStep("delivery")
    //     console.log({ paymentReady, currentStep })
    // }, [paymentReady, currentStep]);


    const handleSubmit = async () => {
        try {
            const shouldInputCard = isStripeFunc(selectedPaymentMethod) && !activeSession
            const checkActiveSession = activeSession?.provider_id === selectedPaymentMethod
            console.log("Review", checkActiveSession, activeSession?.provider_id, selectedPaymentMethod)

            if (!checkActiveSession) {
                await initiatePaymentSession(cart, {
                    provider_id: selectedPaymentMethod,
                    data: { payment_description: "Men Leather Jacket" }
                })
            }

        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={CreditCard} title="Payment" subtitle="Choose your preferred payment option" />
            <div className={isOpen ? "block" : "hidden"}>
                {/* Show payment methods */}
                {paymentMethods?.length > 0 && (
                    <fieldset className="grid grid-cols-1 gap-4 mt-6">
                        {paymentMethods.map((paymentMethod, idx) => (
                            <label
                                key={paymentMethod.id}
                                htmlFor={paymentMethod.id}
                                className={`relative flex flex-col cursor-pointer rounded-lg border p-4 shadow-sm transition hover:border-indigo-400 hover:shadow-md ${selectedPaymentMethod === paymentMethod.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"}`}
                            >
                                {/* Hidden radio input */}
                                <input
                                    type="radio"
                                    id={paymentMethod.id}
                                    name="payment-method"
                                    value={paymentMethod.id}
                                    checked={selectedPaymentMethod === paymentMethod.id}
                                    onChange={() => setPaymentMethod(paymentMethod.id)}
                                    className="peer sr-only"
                                />

                                <div className="flex flex-col flex-1">
                                    <h3 className="font-semibold text-gray-900">{paymentMethod.id}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {isStripeFunc(paymentMethod.id) ? "Pay securely with credit/debit card" : "Alternative payment option"}
                                    </p>
                                </div>

                                {/* Custom payment forms */}
                                <div className="mt-3 w-full">
                                    {isStripeFunc(paymentMethod.id) ? (
                                        <StripeCardContainer
                                            paymentProviderId={paymentMethod.id}
                                            selectedPaymentOptionId={selectedPaymentMethod}
                                            paymentInfoMap={paymentInfoMap}
                                            setCardBrand={setCardBrand}
                                            setError={setError}
                                            setCardComplete={setCardComplete}
                                        />
                                    ) : (
                                        <PaymentContainer
                                            paymentInfoMap={paymentInfoMap}
                                            paymentProviderId={paymentMethod.id}
                                            selectedPaymentOptionId={selectedPaymentMethod}
                                        />
                                    )}
                                </div>

                                {/* Highlight border on selection */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-indigo-500 peer-focus-visible:border-indigo-500"
                                />
                            </label>
                        ))}
                    </fieldset>
                )}

                {/* Error message */}
                {/* <ErrorMessage error={error} data-testid="payment-method-error-message" /> */}

                {/* Submit button */}
                {/* <button
                    onClick={handleSubmit}
                    disabled={
                        // isLoading ||
                        (isStripe && !cardComplete) ||
                        (!selectedPaymentMethod)
                    }
                    className="mt-6 px-6 py-3 w-full sm:w-auto rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                    data-testid="submit-payment-button"
                >
                    {isLoading && (
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    )}
                    {!activeSession && isStripeFunc(selectedPaymentMethod)
                        ? "Enter card details"
                        : "Continue to review"}
                </button> */}
                <PaymentButton cart={cart} />
            </div>
        </div>
    )
}

type ShippingProps = {
    cart: StoreCart
    paymentMethods: StorePaymentProvider[]
}