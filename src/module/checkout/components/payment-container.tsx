"use client"

import React, { useContext, useMemo } from "react"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { isManual } from "@lib/constant"
import { StripeContext } from "@lib/context/stripe-context"
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
            className={`flex flex-col gap-y-3 cursor-pointer p-5 rounded-xl border transition-all duration-200
        ${isSelected ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm"}
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
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
                        className={`h-5 w-5 rounded-full border flex items-center justify-center transition
              ${isSelected ? "border-indigo-500" : "border-gray-400"}
            `}
                    >
                        {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
                    </span>

                    <span className="text-base font-semibold text-gray-900">
                        {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
                    </span>

                    {isManual(paymentProviderId) && isDevelopment && (
                        <TestPayment className="hidden sm:block" />
                    )}
                </div>

                <span className="text-gray-500">
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
    const isSelected = selectedPaymentOptionId === paymentProviderId

    const options: StripeCardElementOptions = useMemo(() => {
        return {
            style: {
                base: {
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "16px",
                    fontSmoothing: "antialiased",
                    color: "#111827", // gray-900
                    "::placeholder": {
                        color: "#9CA3AF", // gray-400
                    },
                    iconColor: "#6366F1", // indigo-500
                },
                invalid: {
                    color: "#DC2626", // red-600
                    iconColor: "#DC2626",
                },
            },
            classes: {
                base: "StripeElement block w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition",
            },
        }
    }, [])

    return (
        <PaymentContainer
            paymentProviderId={paymentProviderId}
            selectedPaymentOptionId={selectedPaymentOptionId}
            paymentInfoMap={paymentInfoMap}
            disabled={disabled}
            onChange={onChange}
        >
            {isSelected && stripeReady && (
                <div className="mt-3 space-y-2">
                    <span className="block text-sm font-medium text-gray-700">
                        Enter your card details
                    </span>
                    <CardElement
                        options={options}
                        onChange={(e) => {
                            setCardBrand(
                                e.brand ? e.brand.charAt(0).toUpperCase() + e.brand.slice(1) : ""
                            )
                            setError(e.error?.message || null)
                            setCardComplete(e.complete)
                        }}
                    />
                    {/* Error message space */}
                    <p className="text-sm text-red-600 min-h-[1.25rem]">
                        {/* error will be injected dynamically */}
                    </p>
                </div>
            )}
        </PaymentContainer>
    )
}
