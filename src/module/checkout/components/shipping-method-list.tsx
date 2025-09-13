import { convertToLocale } from "@lib/util/money"
import { StoreCartShippingOption } from "@medusajs/types"
import { CheckCircle, Clock, Truck, TruckElectric } from "lucide-react"

export default function ListShippingMethods({ availableMethod, currencyCode, selectedMethodId, isDisable }: ShippingCardProps) {
    return (
        <label
            htmlFor={availableMethod.id}
            className={`relative flex cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md hover:border-card-foreground-hover peer-checked:border-accent`}
        >
            <input
                type="radio"
                name="shippingMethod"
                id={availableMethod.id}
                value={availableMethod.id}
                defaultChecked={selectedMethodId === availableMethod.id}
                className="peer sr-only"
                onClick={(e) => e.currentTarget.form?.requestSubmit()}
                disabled={isDisable}
            />
            <span className="flex flex-1">
                <span className="flex flex-col">
                    <h3 className="flex items-center font-semibold">
                        {availableMethod.type?.code === "expedite" ? <TruckElectric className="w-4 h-4 mr-1" /> : <Truck className="w-4 h-4 mr-1" />}
                        {availableMethod.name}
                    </h3>
                    <p className="text-sm text-card-foreground-hover flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1 text-warning" />
                        {availableMethod.type?.description}
                    </p>
                    <span className="mt-8 text-sm font-medium">{availableMethod.amount === 0 ? "Free Shipping" : convertToLocale({ amount: availableMethod.amount, currency_code: currencyCode })}</span>
                </span>
            </span>
            <CheckCircle
                className="h-5 w-5 text-accent hidden peer-checked:block"
                aria-hidden="true"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-accent peer-focus-visible:border-accent"
            />
        </label>
    )
}

type ShippingCardProps = {
    availableMethod: StoreCartShippingOption,
    selectedMethodId?: string
    currencyCode: string,
    isDisable: boolean
}