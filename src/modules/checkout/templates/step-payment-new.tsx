/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { CreditCard } from "lucide-react";
import StepHeader from "../components/step-header";
import { useCheckout } from "@libs/context/checkout-context";
import { StoreCart, StorePaymentProvider } from "@medusajs/types";
import { isStripe as isStripeFunc } from "@libs/constant";
import { useState } from "react";
import { initiatePaymentSession } from "@libs/actions/payment";
import PaymentContainer, { StripeCardContainer } from "../components/payment-container";
import { paymentInfoMap } from "../components/payment-map";
import PaymentButton from "../components/payment-button";
import clx from "@libs/util/clx";

export default function PaymentStep({ cart, paymentMethods }: ShippingProps) {
    const { currentStep, setCurrentStep } = useCheckout();
    const isOpen = currentStep === "payment";

    const activeSession = cart.payment_collection?.payment_sessions?.find(
        (paymentSession: any) => paymentSession.status === "pending"
    );
    const [expandedId, setExpandedId] = useState<string | null>(activeSession?.provider_id ?? null);
    const [error, setError] = useState<string | null>(null);
    const [cardBrand, setCardBrand] = useState<string | null>(null);
    const [cardComplete, setCardComplete] = useState(false);

    const handleSelect = async (methodId: string) => {
        if (expandedId === methodId) {
            setExpandedId(null); // Collapse if already open
            return;
        }
        setExpandedId(methodId);
        setError(null); // Clear errors on switch

        const checkActiveSession = activeSession?.provider_id === methodId;
        if (!checkActiveSession) {
            try {
                await initiatePaymentSession(cart, { provider_id: methodId });
            } catch (err: any) {
                setError(err.message || "Failed to initialize payment session.");
            }
        }
    };

    const paymentReady = cart.shipping_methods?.length !== 0 && cart.shipping_address?.address_1 && expandedId && !error && (isStripeFunc(expandedId) ? cardComplete : true);

    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={CreditCard} title="Payment" subtitle="Choose your preferred payment option" />
            <div className={isOpen ? "block" : "hidden"}>
                {paymentMethods?.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mt-6">
                        {paymentMethods.map((paymentMethod) => {
                            const isExpanded = expandedId === paymentMethod.id;
                            const isStripe = isStripeFunc(paymentMethod.id);
                            const { title, icon } = paymentInfoMap[paymentMethod.id] || { name: paymentMethod.id, icon: CreditCard };

                            return (
                                <div
                                    key={paymentMethod.id}
                                    className={clx(
                                        "rounded-lg border transition-shadow duration-200",
                                        isExpanded ? "border-primary shadow-md" : "border-border hover:border-accent hover:shadow-sm"
                                    )}
                                >
                                    <button
                                        onClick={() => handleSelect(paymentMethod.id)}
                                        className={clx(
                                            "flex w-full items-center justify-between p-4 text-left font-semibold",
                                            isExpanded ? "text-primary bg-background-muted" : "text-foreground"
                                        )}
                                        aria-expanded={isExpanded}
                                        aria-controls={`payment-content-${paymentMethod.id}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {icon && <icon.type className="w-5 h-5" />}
                                            <span>{title}</span>
                                        </div>
                                        <span className={clx("transition-transform duration-200", isExpanded ? "rotate-180" : "rotate-0")}>▼</span>
                                    </button>
                                    <div
                                        id={`payment-content-${paymentMethod.id}`}
                                        className={clx(
                                            "overflow-hidden transition-max-height duration-300 ease-in-out",
                                            isExpanded ? "max-h-96" : "max-h-0"
                                        )}
                                    >
                                        <div className="p-4 bg-background-elevated">
                                            {isStripe ? (
                                                <StripeCardContainer
                                                    paymentProviderId={paymentMethod.id}
                                                    selectedPaymentOptionId={expandedId}
                                                    paymentInfoMap={paymentInfoMap}
                                                    setCardBrand={setCardBrand}
                                                    setError={setError}
                                                    setCardComplete={setCardComplete}
                                                />
                                            ) : (
                                                <PaymentContainer
                                                    paymentInfoMap={paymentInfoMap}
                                                    paymentProviderId={paymentMethod.id}
                                                    selectedPaymentOptionId={expandedId}
                                                />
                                            )}
                                            {paymentMethod.id === "paypal" && (
                                                <p className="text-foreground-muted text-sm mt-2">
                                                    After clicking &quot;Pay with PayPal&quot;, you will be redirected to PayPal to complete your purchase securely.
                                                </p>
                                            )}
                                            {error && <p className="text-error text-sm mt-2">{error}</p>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <button
                    // onClick={() => setCurrentStep("review")} // Assume next step; adjust as needed
                    disabled={!paymentReady}
                    className={clx(
                        "mt-6 px-6 py-3 w-full sm:w-auto rounded-md font-medium text-primary-foreground bg-primary hover:bg-primary-hover disabled:opacity-50 flex items-center justify-center transition-colors duration-150"
                    )}
                >
                    {expandedId && isStripeFunc(expandedId) ? "Enter card details to continue" : "Continue to review"}
                </button>
                <PaymentButton cart={cart} />
            </div>
        </div>
    );
}

type ShippingProps = {
    cart: StoreCart;
    paymentMethods: StorePaymentProvider[];
};