import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { useState } from "react";
import PaymentContainer from "./payment-container";

export default function StripeContainer() {
    const [cardBrand, setCardBrand] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [cardComplete, setCardComplete] = useState(false)
    return (
        <PaymentContainer>
            <div className="p-6 flex flex-col items-center justify-center gap-4 bg-muted/50 text-center mt-3 space-y-2">
                <span className="block text-sm font-medium">
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
        </PaymentContainer>
    )
}

const options: StripeCardElementOptions = {
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