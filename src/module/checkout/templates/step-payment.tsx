"use client"

import { useCheckout } from "@lib/context/checkout-context"
import type { StoreCart, StorePaymentProvider } from "@medusajs/types"
import { useTransition, useLayoutEffect } from "react"
import StepHeader from "../components/step-header"
import { CheckCircle, Circle, CreditCard } from "lucide-react"
import { initiatePaymentSessionCustom } from "@lib/action/payment"
import { paymentInfoMap } from "../../../JSON/payment-info-map"
import { AnimatePresence } from "motion/react"
import PaymentButton from "../components/payment-button-1"

export default function PaymentStep({ cart, paymentMethods }: PaymentStepProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "payment"
    const activeSession = cart.payment_collection?.payment_sessions?.find((paymentSession) => paymentSession.status === "pending");
    const selectedPaymentMethod = activeSession?.provider_id

    useLayoutEffect(() => {
        if (isOpen && !cart.shipping_methods?.length && currentStep !== "payment")
            setCurrentStep("delivery")
    }, [isOpen, cart.shipping_methods?.length, currentStep])

    const [isPending, startTransition] = useTransition()

    function setPaymentMethod(cart_id: string, provider_id: string, collection_id?: string) {
        if (provider_id == selectedPaymentMethod) return
        startTransition(async () => {
            await initiatePaymentSessionCustom(cart_id, collection_id, {
                provider_id,
                data: { payment_description: "Men Leather Jacket" },
            }, {})
        });
    }

    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={CreditCard} title="Payment" subtitle="Choose your preferred payment option" name="payment" showEdit={false} />
            {isOpen && <div className="grid mt-6">
                {paymentMethods.map((paymentMethod) => {
                    const isSelected = selectedPaymentMethod === paymentMethod.id
                    const Info = paymentInfoMap[paymentMethod.id]
                    const { Icon, Preview } = Info
                    return (
                        <div
                            key={paymentMethod.id}
                            onClick={() => !isPending && setPaymentMethod(cart.id, paymentMethod.id, cart.payment_collection?.id)}
                            className={`relative flex flex-col border transition cursor-pointer ${isSelected ? "border-accent ring-1 ring-accent" : "border-border"}`}
                        >
                            {/* Header row */}
                            <div className="flex items-center gap-3 p-4">
                                <div className="text-accent">
                                    {isSelected ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <h3 className="font-semibold">{Info?.title ?? paymentMethod.id}</h3>
                                    <p className="text-sm text-muted-foreground">{Info?.desc}</p>
                                </div>
                                <Icon className="w-7 h-7 text-foreground" />
                            </div>

                            {/* Extra info / Preview */}
                            <AnimatePresence mode="wait">
                                {isSelected && <Preview />}
                            </AnimatePresence>
                        </div>
                    )
                })}
                <PaymentButton cart={cart} />
            </div>}
        </div>
    )
}

type PaymentStepProps = {
    cart: StoreCart
    paymentMethods: StorePaymentProvider[]
}

type SetPaymentMethodProps = {
    cart_id: string
    collection_id?: string
}