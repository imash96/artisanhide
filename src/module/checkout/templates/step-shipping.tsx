"use client"

import { StoreCart, StoreCartShippingOption } from "@medusajs/types"
import StepHeader from "../components/step-header"
import { Truck } from "lucide-react"
import { useCheckout } from "@lib/context/checkout-context"
import { useLayoutEffect, useTransition } from "react"
import { setShippingMethod } from "@lib/action/cart"
import ListShippingMethods from "../components/shipping-method-list"
import ShippingCardShow from "../components/shipping-method-show"

export default function ShippingStep({ cart, availableMethods }: ShippingProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "delivery"

    useLayoutEffect(() => {
        if (!cart.shipping_address?.address_1 && currentStep === "delivery") setCurrentStep("address")
    }, [isOpen]);

    const [isPending, startTransition] = useTransition()

    function handleShippingMethod(optionId: string) {
        startTransition(async () => {
            await setShippingMethod({ cartId: cart.id, shippingMethodId: optionId })
            setCurrentStep("payment")
        })
    }

    console.log(cart.shipping_methods)

    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={Truck} title="Shipping Method" subtitle="Choose your preferred delivery option" showEdit={!isOpen && currentStep !== "address"} name="delivery" />
            {isOpen ?
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {availableMethods.map((m) => (
                        <ListShippingMethods
                            key={m.id}
                            availableMethod={m}
                            currencyCode={cart.currency_code}
                            selectedMethodId={cart.shipping_methods?.length ? cart.shipping_methods?.[0].shipping_option_id : undefined}
                            isDisable={isPending}
                            onSelect={handleShippingMethod}
                        />
                    ))}
                </div> :
                <div className="space-y-4">
                    {cart.shipping_methods?.map((method) => (
                        <ShippingCardShow key={method.id} method={method} currencyCode={cart.currency_code} />
                    ))}
                </div>}
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