"use client"

import { createContext, useContext, useReducer, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { StoreCart } from "@medusajs/types"
import compareAddresses from "@libs/util/compare-addresses"

type CheckoutProviderProps = {
    cart: StoreCart
} & React.PropsWithChildren

export interface ShippingMethod {
    id: string
    name: string
    price: number
    deliveryTime: string
    description: string
}

export type PaymentMethod = {
    id: string
    name: string
    type: "card" | "paypal" | "apple_pay" | "google_pay"
    icon?: string
}

export type CheckoutState = {
    sameAsShipping: boolean
    selectedShipping: ShippingMethod | null
    selectedPayment: PaymentMethod | null
}

export type StepType = "address" | "shipping" | "payment"

const initialState: CheckoutState = {
    sameAsShipping: false,
    selectedShipping: null,
    selectedPayment: null,
}

type CheckoutAction = { type: "SET_STEP"; payload: StepType } | { type: "TOGGLE_SAME_AS_SHIPPING" } | { type: "SET_SHIPPING_METHOD"; payload: ShippingMethod } | { type: "SET_PAYMENT_METHOD"; payload: PaymentMethod }

// ----------------------
// Reducer
// ----------------------
function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
    switch (action.type) {
        case "TOGGLE_SAME_AS_SHIPPING":
            return { ...state, sameAsShipping: !state.sameAsShipping }
        case "SET_SHIPPING_METHOD":
            return { ...state, selectedShipping: action.payload }
        case "SET_PAYMENT_METHOD":
            return { ...state, selectedPayment: action.payload }
        default:
            return state
    }
}

// ----------------------
// Context
// ----------------------
interface CheckoutContextValue {
    state: CheckoutState
    currentStep: StepType
    setStep: (step: StepType) => void
    dispatch: React.Dispatch<CheckoutAction>
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

// ----------------------
// Provider
// ----------------------
export function CheckoutProvider({ children, cart }: CheckoutProviderProps) {
    const [state, dispatch] = useReducer(checkoutReducer, initialState)
    const router = useRouter()
    const searchParams = useSearchParams()

    const stepFromURL = searchParams.get("step") as StepType | null
    const [currentStep, setCurrentStep] = useState<StepType>(stepFromURL ?? "address")

    if (cart?.shipping_address && cart?.billing_address && compareAddresses(cart.shipping_address, cart.billing_address)) state.sameAsShipping = true

    // Sync step from URL
    useEffect(() => {
        if (stepFromURL) setCurrentStep(stepFromURL)
    }, [searchParams])

    // Step setter with URL update
    const setStep = (step: StepType) => {
        setCurrentStep(step)
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href)
            url.searchParams.set("step", step)
            router.push(url.pathname + url.search, { scroll: false })
        }
    }

    return (
        <CheckoutContext.Provider value={{ state, currentStep, setStep, dispatch }
        }>
            {children}
        </CheckoutContext.Provider>
    )
}

// ----------------------
// Hooks
// ----------------------
export function useCheckout() {
    const context = useContext(CheckoutContext)
    if (!context) throw new Error("useCheckout must be used within a CheckoutProvider")
    return context
}

export function useCheckoutActions() {
    const { dispatch } = useCheckout()

    return {
        toggleSameAsShipping: () => dispatch({ type: "TOGGLE_SAME_AS_SHIPPING" }),
        setShippingMethod: (method: ShippingMethod) => dispatch({ type: "SET_SHIPPING_METHOD", payload: method }),
        setPaymentMethod: (method: PaymentMethod) => dispatch({ type: "SET_PAYMENT_METHOD", payload: method }),
    }
}
