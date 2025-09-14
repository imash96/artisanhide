"use client"

import { useCheckout } from "@lib/context/checkout-context"
import type { StoreCart, StorePaymentProvider } from "@medusajs/types"
import { isStripe as isStripeFunc } from "@lib/constant"
import { useTransition, useLayoutEffect } from "react"
import StepHeader from "../components/step-header"
import { CheckCircle, Circle, CreditCard } from "lucide-react"
import { initiatePaymentSessionCustom } from "@lib/action/payment"
import { paymentInfoMap } from "../../../JSON/payment-info-map"
import BrowserWireframe from "@/icon/browser-wireframe"
import { AnimatePresence } from "motion/react"
import { div as Div } from "motion/react-client"
import FinalPaymentButton from "../components/payment-button-new"
import PaymentButton from "../components/payment-button-1"

export default function PaymentStep({ cart, paymentMethods }: PaymentStepProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "payment"
    const activeSession = cart.payment_collection?.payment_sessions?.find((paymentSession) => paymentSession.status === "pending");
    const selectedPaymentMethod = activeSession?.provider_id

    const isStripe = isStripeFunc(selectedPaymentMethod);

    useLayoutEffect(() => {
        if (!cart.shipping_methods?.length && isOpen) setCurrentStep("delivery")
    }, [isOpen]);

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
                    const { Icon } = Info
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

                                {Icon && <Icon className="w-7 h-7 text-foreground" />}
                            </div>

                            {/* Extra info / Preview */}
                            <AnimatePresence>
                                {isSelected && (
                                    <Div
                                        key="extra-info"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="border-t"
                                    >
                                        <div className="p-6 flex flex-col items-center justify-center gap-4 bg-muted/50 text-center">
                                            <BrowserWireframe className="w-64" />
                                            <p className="text-sm text-muted-foreground max-w-sm">
                                                After clicking "Pay with PayPal", you will be redirected to PayPal to complete your
                                                purchase securely.
                                            </p>
                                        </div>
                                    </Div>
                                )}
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