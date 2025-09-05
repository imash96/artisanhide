"use client"

import { Truck } from "lucide-react";
import StepHeader from "../components/step-header";
import { useCheckout } from "@lib/context/checkout-context";
import Button from "@module/common/custom-button";
import { StoreCart, StoreCartShippingOption } from "@medusajs/types";
import { useActionState, useEffect, useLayoutEffect } from "react";
import { handleSetShippingMethod } from "@lib/action/cart";
import ShippingCardList from "../components/list-shipping-card";
import ShippingCardShow from "../components/show-shipping-card";

export default function ShippingStep({ cart, availableShippingMethods }: ShippingProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "delivery"

    const [formState, formAction, isPending] = useActionState(handleSetShippingMethod, {
        cartId: cart.id,
        success: false,
        error: null
    })

    const handleEdit = () => setCurrentStep("delivery")

    useLayoutEffect(() => {
        if (!cart.shipping_address?.address_1 && currentStep === "delivery") setCurrentStep("address")
    }, [currentStep, setCurrentStep, cart.shipping_address?.address_1]);

    useEffect(() => {
        const handleNext = () => setCurrentStep("payment")
        if (formState.success) {
            handleNext()
            formState.success = false;
            formState.error = null;
            formState.cartId = cart.id
        }
    }, [formState, cart.id, setCurrentStep]);


    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={Truck} title="Shipping Method" subtitle="Choose your preferred delivery option">
                {!isOpen &&
                    <Button variant="outline" color="secondary" onClick={handleEdit}>
                        Change
                    </Button>
                }
            </StepHeader>
            {isOpen ?
                <form action={formAction} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 w-fit">
                    {availableShippingMethods.map((availableMethod, idx) => (
                        <ShippingCardList key={availableMethod.id} availableMethod={availableMethod} currencyCode={cart.currency_code} selectedMethod={cart.shipping_methods?.[0]} />
                    ))}
                    {/* Footer */}
                    <div>
                        <Button isLoading={isPending} className="w-[100px] h-10" type="submit" disabled={isPending}>
                            Save
                        </Button>
                        {formState.error && (
                            <div className="text-destructive-foreground text-sm pt-2" role="alert" aria-live="polite">
                                {formState.error}
                            </div>
                        )}
                    </div>
                </form>
                : <>
                    {cart.shipping_methods?.map((method) => (
                        <ShippingCardShow key={method.id} method={method} currencyCode={cart.currency_code} />
                    ))}

                </>
            }
        </div>
    )
}

type ShippingProps = {
    cart: StoreCart
    availableShippingMethods: StoreCartShippingOption[]
}