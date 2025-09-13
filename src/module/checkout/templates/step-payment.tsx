"use client"

import { useCheckout } from "@lib/context/checkout-context";
import type { StoreCart, StorePaymentProvider } from "@medusajs/types";
import { isStripe as isStripeFunc } from "@lib/constant";
import { useTransition, useLayoutEffect } from "react";
import StepHeader from "../components/step-header";
import { AppWindow, CheckCircle, Circle, CreditCard } from "lucide-react";
import { initiatePaymentSessionCustom } from "@lib/action/payment";
import { paymentInfoMap } from "../../../JSON/payment-info-map";
import PaymentContainer from "../components/payment-container";
import BrowserWireframe from "@/icon/browser-wireframe";

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
            <div className={isOpen ? `flex flex-col border divide-y-1` : "hidden"}>
                {paymentMethods.map(paymentMethod => {
                    const Icon = paymentInfoMap[paymentMethod.id].Icon
                    return (
                        <label
                            key={paymentMethod.id}
                            htmlFor={paymentMethod.id}
                            className="py-3 cursor-pointer"
                        >
                            <input
                                type="radio"
                                id={paymentMethod.id}
                                name="provider_id"
                                value={paymentMethod.id}
                                defaultChecked={selectedPaymentMethod === paymentMethod.id}
                                onClick={() => setPaymentMethod(cart.id, paymentMethod.id, cart.payment_collection?.id)}
                                className="peer sr-only"
                            />
                            <div className="flex items-center pr-4">
                                <div className="p-2">
                                    {selectedPaymentMethod === paymentMethod.id ? <CheckCircle className="w-8" /> : <Circle className="w-8" />}
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h3 className="font-semibold">{paymentInfoMap[paymentMethod.id].title}</h3>
                                    <p className="text-sm text-foreground-muted mt-1">
                                        {paymentInfoMap[paymentMethod.id].desc}
                                    </p>
                                </div>
                                <Icon className="w-8" />
                            </div>
                        </label>
                    )
                })}
                <div className="p-8 flex flex-col items-center justify-center gap-y-8 min-h-24">
                    <BrowserWireframe className="w-72" />
                    <div className="max-w-140 text-center text-sm">After clicking "Pay with PayPal", you will be redirected to PayPal to complete your purchase securely.</div>
                </div>
            </div>
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