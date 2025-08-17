"use client"
import { useCheckout } from "@libs/context/checkout-context"
import { Check, MapPin, Truck, CreditCard } from "lucide-react"

const steps = [
    { id: "address" as const, name: "Address", subtitle: "Shipping & billing", icon: MapPin },
    { id: "delivery" as const, name: "Shipping", subtitle: "Delivery method", icon: Truck },
    { id: "payment" as const, name: "Payment", subtitle: "Payment details", icon: CreditCard },
]

export default function CheckoutProgress() {
    const { currentStep, setCurrentStep } = useCheckout()
    const currentIndex = steps.findIndex((s) => s.id === currentStep)

    return (
        <nav aria-label="Checkout progress" className="w-full max-w-5xl mx-auto">
            <ol className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentIndex
                    const isCurrent = index === currentIndex
                    return (
                        <li key={step.id} className={index === steps.length - 1 ? undefined : "flex items-center flex-1"}>
                            <div className="flex flex-col sm:flex-row items-center cursor-pointer" onClick={() => setCurrentStep(step.id)}>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors duration-200 ${isCompleted && 'border-blue-600 bg-blue-600 text-white'} ${isCurrent && !isCompleted && 'border-blue-600 bg-white text-blue-600'} ${!isCompleted && !isCurrent && 'border-gray-400 bg-white text-gray-400'}`}>
                                    {isCompleted ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                                </div>
                                <div className="hidden sm:block sm:ml-4">
                                    <p className={`text-sm font-semibold leading-tight ${isCurrent ? "text-blue-600" : isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                                        {step.name}
                                    </p>
                                    <p className={`text-xs leading-tight ${isCurrent ? "text-blue-500" : isCompleted ? "text-gray-600" : "text-gray-400"}`} >
                                        {step.subtitle}
                                    </p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`ml-4 h-0.5 flex-1 transition-colors duration-200 ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}`} />
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
