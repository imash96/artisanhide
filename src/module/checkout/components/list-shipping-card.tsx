import { convertToLocale } from "@lib/util/money"
import { StoreCartShippingOption } from "@medusajs/types"
import { CheckCircle, Clock, Truck, TruckElectric } from "lucide-react"

export default function ShippingCardList({ method, currencyCode, idx }: ShippingCardProps) {
    const isExpress = method.name.toLowerCase().includes("expedite")
    return (
        <label
            htmlFor={method.id}
            className={`relative flex cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md hover:border-card-foreground-hover peer-checked:border-accent`}
        >
            {/* Hidden native radio */}
            <input
                type="radio"
                name="shippingMethod"
                id={method.id}
                value={method.id}
                defaultChecked={idx === 0}
                className="peer sr-only"
            />

            {/* Card Content */}
            <span className="flex flex-1">
                <span className="flex flex-col">
                    <h3 className="flex items-center font-semibold">
                        {isExpress ? <TruckElectric className="w-4 h-4 mr-1" /> : <Truck className="w-4 h-4 mr-1" />}
                        {method.name}
                    </h3>
                    <p className="text-sm text-card-foreground-hover flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1 text-warning" />
                        {method.type.description}
                    </p>
                    <span className="mt-8 text-sm font-medium">{method.amount === 0 ? "Free Shipping" : convertToLocale({ amount: method.amount, currency_code: currencyCode })}</span>
                </span>
            </span>

            {/* Check Icon only when selected */}
            <CheckCircle
                className="h-5 w-5 text-accent hidden peer-checked:block"
                aria-hidden="true"
            />

            {/* Border highlight on selection */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-accent peer-focus-visible:border-accent"
            />
        </label>
    )
}

type ShippingCardProps = {
    method: StoreCartShippingOption,
    currencyCode: string,
    idx?: number
}