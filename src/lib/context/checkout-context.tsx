"use client"

import { createContext, useContext, useState } from "react"
import { StepType } from "@/type/common"

type CheckoutContextValue = {
    currentStep: StepType
    setCurrentStep: (step: StepType) => void
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function CheckoutProvider({ children }: React.PropsWithChildren) {

    const [currentStep, setCurrentStep] = useState<StepType>("address")

    return (
        <CheckoutContext.Provider value={{ currentStep, setCurrentStep }}>
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckout() {
    const context = useContext(CheckoutContext)
    if (!context) throw new Error("useCheckout must be used within a CheckoutProvider")
    return context
}