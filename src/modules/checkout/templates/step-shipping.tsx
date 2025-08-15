"use client"

import { Check, Clock, Truck } from "lucide-react";
import StepHeader from "../components/step-header";
import { useCheckout } from "@libs/context/checkout-context";
import Button from "@modules/common/custom-button";
import { StoreCart, StoreCartShippingOption } from "@medusajs/types";
import { convertToLocale } from "@libs/util/money";


export default function ShippingStep({ cart, availableShippingMethods }: ShippingProps) {
    const { currentStep, setStep } = useCheckout()
    const isOpen = currentStep === "shipping"

    const handleEdit = () => setStep("shipping")
    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={Truck} title="Shipping Method" subtitle="Choose your preferred delivery option">
                {!isOpen &&
                    <Button variant="outline" color="secondary" onClick={handleEdit}>
                        Change
                    </Button>
                }
            </StepHeader>
            {isOpen && cart.shipping_methods ? <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{cart.shipping_methods?.at(0)?.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {cart.shipping_methods?.at(0)?.description}
                        </p>
                    </div>
                </div>
                <p className="font-bold text-lg text-gray-900">
                    {/* {cart.shipping_methods?.at(0)?.total === 0 ? "Free" : `${convertToLocale({ amount: cart.shipping_methods.at(0)?.total, currency_code: cart.region?.currency_code })}`} */}
                </p>
            </div> :
                <></>}
        </div>
    )
}

type ShippingProps = {
    cart: StoreCart
    availableShippingMethods: StoreCartShippingOption[]
}