import { convertToLocale } from "@lib/util/money"
import { StoreCartShippingOption } from "@medusajs/types"
import { CheckCircle, Clock, Truck, TruckElectric } from "lucide-react"

export default function ListShippingMethods({ availableMethod, currencyCode, selectedMethodId, isDisable, onSelect }: ShippingCardProps) {
    const isSelected = selectedMethodId === availableMethod.id
    const isExpress = availableMethod.type?.code === "expedite"
    return (
        <button
            type="button"
            disabled={isDisable}
            onClick={() => onSelect(availableMethod.id)}
            role="radio"
            aria-checked={isSelected}
            className={`relative flex w-full items-start rounded-xl border p-4 text-left shadow-sm transition ${isSelected ? "bg-accent/5 ring-2 ring-offset-0 ring-accent" : "border-border hover:border-accent"} ${isDisable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
            <span className="flex-1 text-left">
                <h3 className="flex items-center font-semibold">
                    {isExpress ? <TruckElectric className="w-4 h-4 mr-1" /> : <Truck className="w-4 h-4 mr-1" />}
                    {availableMethod.name}
                </h3>
                <p className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1 text-warning" />
                    {availableMethod.type?.description}
                </p>
                <span className="mt-8 inline-block text-sm font-medium">
                    {availableMethod.amount === 0
                        ? "Free Shipping"
                        : convertToLocale({ amount: availableMethod.amount, currency_code: currencyCode })}
                </span>
            </span>
            {isSelected && <CheckCircle className="h-5 w-5 text-accent" aria-hidden="true" />}
        </button>
    )
}

type ShippingCardProps = {
    availableMethod: StoreCartShippingOption
    selectedMethodId?: string
    currencyCode: string
    isDisable: boolean
    onSelect: (id: string) => void
}