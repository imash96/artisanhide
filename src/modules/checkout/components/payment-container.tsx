"use client"

import React, { useContext, useMemo } from "react"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { isManual } from "@libs/constant"
import { StripeContext } from "@libs/context/stripe-context"
import TestPayment from "./test-payment"

type PaymentContainerProps = {
    paymentProviderId: string
    selectedPaymentOptionId: string | null
    disabled?: boolean
    paymentInfoMap: Record<string, { title: string; icon: React.ReactNode }>
    children?: React.ReactNode
    onChange?: (id: string) => void
}

export default function PaymentContainer({
    paymentProviderId,
    selectedPaymentOptionId,
    paymentInfoMap,
    disabled = false,
    children,
    onChange,
}: PaymentContainerProps) {
    const isDevelopment = process.env.NODE_ENV === "development"
    const isSelected = selectedPaymentOptionId === paymentProviderId

    return (
        <label
            htmlFor={paymentProviderId}
            className={`flex flex-col gap-y-2 cursor-pointer p-4 border rounded-lg mb-3 transition ${isSelected ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-gray-200 bg-white hover:border-indigo-300"}  ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        >
            {/* Hidden radio input */}
            <input
                type="radio"
                id={paymentProviderId}
                name="payment-method"
                value={paymentProviderId}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onChange?.(paymentProviderId)}
                className="sr-only peer"
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    {/* Custom radio indicator */}
                    <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? "border-indigo-500" : "border-gray-400"
                            }`}
                    >
                        {isSelected && (
                            <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        )}
                    </span>

                    <span className="text-base font-medium text-gray-900">
                        {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
                    </span>

                    {/* Test payment option only in dev */}
                    {isManual(paymentProviderId) && isDevelopment && (
                        <TestPayment className="hidden sm:block" />
                    )}
                </div>
                <span className="text-gray-600">
                    {paymentInfoMap[paymentProviderId]?.icon}
                </span>
            </div>

            {isManual(paymentProviderId) && isDevelopment && (
                <TestPayment className="sm:hidden text-xs mt-2" />
            )}

            {children}
        </label>
    )
}

// STRIPE-SPECIFIC CONTAINER
export function StripeCardContainer({
    paymentProviderId,
    selectedPaymentOptionId,
    paymentInfoMap,
    disabled = false,
    setCardBrand,
    setError,
    setCardComplete,
    onChange,
}: Omit<PaymentContainerProps, "children"> & {
    setCardBrand: (brand: string) => void
    setError: (error: string | null) => void
    setCardComplete: (complete: boolean) => void
}) {
    const stripeReady = useContext(StripeContext)

    const options: StripeCardElementOptions = useMemo(() => {
        return {
            style: {
                base: {
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    color: "#1F2937", // gray-800
                    "::placeholder": { color: "#9CA3AF" }, // gray-400
                },
            },
            classes: {
                base: "block w-full h-11 px-4 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all",
            },
        }
    }, [])

    const isSelected = selectedPaymentOptionId === paymentProviderId

    return (
        <PaymentContainer
            paymentProviderId={paymentProviderId}
            selectedPaymentOptionId={selectedPaymentOptionId}
            paymentInfoMap={paymentInfoMap}
            disabled={disabled}
            onChange={onChange}
        >
            {isSelected &&
                (stripeReady && (
                    <div className="mt-4">
                        <span className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your card details:
                        </span>
                        <CardElement
                            options={options}
                            onChange={(e) => {
                                setCardBrand(
                                    e.brand
                                        ? e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                                        : ""
                                )
                                setError(e.error?.message || null)
                                setCardComplete(e.complete)
                            }}
                        />
                    </div>
                )
                    // : <SkeletonCardDetails />
                )}
        </PaymentContainer>
    )
}
