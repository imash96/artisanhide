"use client"

import { useCheckout } from "@libs/context/checkout-context"
import { StoreCart, StoreCustomer } from "@medusajs/types"
import Button from "@modules/common/custom-button"
import { BookUser } from "lucide-react"
import { useMemo } from "react"
import AddressCard from "../components/address-card"
import AddressForm from "../components/address-form"
import StepHeader from "../components/step-header"

export default function AddressStep({ cart, customer, }: AddressStepProps) {
    const { currentStep, setStep } = useCheckout()
    const isOpen = currentStep === "address"

    const handleEdit = () => setStep("address")

    const shippingDetails = useMemo(() => ({
        name: `${cart.shipping_address?.first_name ?? ""} ${cart.shipping_address?.last_name ?? ""}`,
        address1: cart.shipping_address?.address_1 ?? "",
        address2: cart.shipping_address?.address_2 ?? "",
        cityLine: `${cart.shipping_address?.city ?? ""}, ${cart.shipping_address?.province ?? ""} ${cart.shipping_address?.postal_code ?? ""}`,
        countryCode: `${cart.shipping_address?.country_code?.toUpperCase() ?? ""}`,
        phone: cart.shipping_address?.phone ?? "",
    }), [cart.shipping_address])

    const billingDetails = useMemo(() => ({
        name: `${cart.billing_address?.first_name ?? ""} ${cart.billing_address?.last_name ?? ""}`,
        address1: cart.billing_address?.address_1 ?? "",
        address2: cart.billing_address?.address_2 ?? "",
        cityLine: `${cart.billing_address?.city ?? ""}, ${cart.billing_address?.province ?? ""} ${cart.billing_address?.postal_code ?? ""}`,
        countryCode: `${cart.billing_address?.country_code?.toUpperCase() ?? ""}`,
        phone: cart.billing_address?.phone ?? "",
    }), [cart.billing_address])

    return (
        <div className="pb-4 border-b">
            <StepHeader Icon={BookUser} title="Address Information" subtitle="Shipping and billing addresses">
                {!isOpen ?
                    <Button variant="outline" color="secondary" onClick={handleEdit}>
                        Edit
                    </Button> :
                    <Button variant="outline" color="secondary" onClick={handleEdit}>
                        Save Address
                    </Button>
                }
            </StepHeader>
            {!isOpen ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <AddressCard title="Shipping Address" address={shippingDetails} email={cart.email} />
                {billingDetails.address1 && <AddressCard title="Billing Address" address={billingDetails} />}
            </div> : <AddressForm cart={cart} />
            }
        </div>
    )
}

type AddressStepProps = {
    cart: StoreCart
    customer: StoreCustomer | null
}