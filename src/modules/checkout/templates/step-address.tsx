"use client"

import { useCheckout } from "@libs/context/checkout-context"
import { StoreCart, StoreCustomer } from "@medusajs/types"
import Button from "@modules/common/custom-button"
import { BookUser } from "lucide-react"
import AddressCard from "../components/address-card"
import AddressForm from "../components/address-form"
import StepHeader from "../components/step-header"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddressStep({ cart, customer, }: AddressStepProps) {
    const { currentStep, setCurrentStep } = useCheckout()
    const isOpen = currentStep === "address"

    const handleEdit = () => setCurrentStep("address")

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
                <AddressCard title="Shipping Address" address={cart.shipping_address} email={cart.email} type="Shipping" />
                <AddressCard title="Billing Address" address={cart.billing_address} type="Billing" />
            </div> : <AddressForm cart={cart} />
            }
        </div>
    )
}

type AddressStepProps = {
    cart: StoreCart
    customer: StoreCustomer | null
}