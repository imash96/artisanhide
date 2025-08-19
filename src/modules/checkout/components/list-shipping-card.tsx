import { convertToLocale } from "@libs/util/money"
import { StoreCartShippingOption } from "@medusajs/types"
import { CheckCircle, Clock, Truck, TruckElectric } from "lucide-react"

export default function ShippingCardList({ method, currencyCode, idx }: ShippingCardProps) {
    const isExpress = method.name.toLowerCase().includes("expedite")
    return (
        <label
            htmlFor={method.id}
            className={`relative flex cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md hover:border-blue-300 peer-checked:border-blue-500`}
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
                    <h3 className="flex items-center font-semibold text-gray-900">
                        {isExpress ? <TruckElectric className="w-4 h-4 mr-1" /> : <Truck className="w-4 h-4 mr-1" />}
                        {method.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {method.type.description}
                    </p>
                    <span className="mt-8 text-sm font-medium text-gray-900">{method.amount === 0 ? "Free Shipping" : convertToLocale({ amount: method.amount, currency_code: currencyCode })}</span>
                </span>
            </span>

            {/* Check Icon only when selected */}
            <CheckCircle
                className="h-5 w-5 text-blue-600 hidden peer-checked:block"
                aria-hidden="true"
            />

            {/* Border highlight on selection */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-blue-500 peer-focus-visible:border-blue-500"
            />
        </label>
    )
}

type ShippingCardProps = {
    method: StoreCartShippingOption,
    currencyCode: string,
    idx?: number
}