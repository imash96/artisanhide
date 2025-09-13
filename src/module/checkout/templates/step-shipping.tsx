"use client"

import { StoreCart, StoreCartShippingOption } from "@medusajs/types"
import StepHeader from "../components/step-header"
import { Truck } from "lucide-react"
import { useCheckout } from "@lib/context/checkout-context"
import { useActionState, useEffect, useLayoutEffect } from "react"
import { setShippingMethod } from "@lib/action/cart"
import ListShippingMethods from "../components/shipping-method-list"
import ShippingCardShow from "../components/shipping-method-show"

export default function ShippingStep({ cart, availableMethods }: ShippingProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "delivery"

    useLayoutEffect(() => {
        if (!cart.shipping_address?.address_1 && currentStep === "delivery") setCurrentStep("address")
    }, [isOpen]);

    const [formState, formAction, isPending] = useActionState(handleSetShippingMethod, {
        cartId: cart.id,
        success: false,
        error: null
    })

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
            <StepHeader Icon={Truck} title="Shipping Method" subtitle="Choose your preferred delivery option" showEdit={(!isOpen && currentStep != "address")} name="delivery" />
            {isOpen ?
                <form action={formAction} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {availableMethods.map((availableMethod) => (
                        <ListShippingMethods
                            key={availableMethod.id}
                            availableMethod={availableMethod}
                            currencyCode={cart.currency_code}
                            selectedMethodId={cart.shipping_methods?.[0].shipping_option_id}
                            isDisable={isPending}
                        />
                    ))}
                </form> : <>
                    {cart.shipping_methods?.map((method) => (
                        <ShippingCardShow key={method.id} method={method} currencyCode={cart.currency_code} />
                    ))}
                </>}
        </div>
    )
}

type ShippingProps = {
    cart: StoreCart
    availableMethods: StoreCartShippingOption[]
}

async function handleSetShippingMethod(_: Record<string, any>, formData: FormData) {
    const selectedOption = String(formData.get("shippingMethod"))
    if (!selectedOption) return {
        cartId: _.cartId,
        error: "selectedOption id not found",
        success: false,
    }
    try {
        await setShippingMethod({ cartId: _.cartId, shippingMethodId: selectedOption })
        return { success: true, error: null }
    } catch (e: any) {
        return {
            cartId: _.cartId,
            error: e.message,
            success: false,
        }
    }
}