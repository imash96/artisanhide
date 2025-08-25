import { convertToLocale } from "@lib/util/money"
import { StoreCartShippingMethod } from "@medusajs/types"
import { CheckCircle, Truck, TruckElectric } from "lucide-react"

export default function ShippingCardShow({ method, currencyCode }: ShippingCardProps) {
    if (!method) return null
    const isExpress = method.name.toLowerCase().includes("expedite")
    return (
        <div className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm transition border-accent bg-background-elevated max-w-xs`}>
            {/* Card Content */}
            <span className="flex flex-1">
                <span className="flex flex-col">
                    <h3 className="flex items-center font-semibold">
                        {isExpress ? <TruckElectric className="w-4 h-4 mr-1" /> : <Truck className="w-4 h-4 mr-1" />}
                        {method.name}
                    </h3>
                    <span className="mt-8 text-sm font-medium">{method.amount === 0 ? "Free Shipping" : convertToLocale({ amount: method.amount, currency_code: currencyCode })}</span>
                </span>
            </span>

            {/* Check Icon only when selected */}
            <CheckCircle
                className="h-5 w-5 text-accent"
                aria-hidden="true"
            />
        </div>
    )
}

type ShippingCardProps = {
    method?: StoreCartShippingMethod,
    currencyCode: string,
    idx?: number
}