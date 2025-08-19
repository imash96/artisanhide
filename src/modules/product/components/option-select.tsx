import { useProduct } from "@libs/context/product-context"
import { StoreProductOption } from "@medusajs/types"
import { Info } from "lucide-react"

type OptionSelectProps = {
    option: StoreProductOption
    title: string
    disabled: boolean
}

export default function OptionSelect({ option, title, disabled }: OptionSelectProps) {
    const { options, setOption } = useProduct()
    const current = options?.[option.id]
    const values = option.values?.map((v) => v.value)
    const isSize = title === "Size"

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                    {title}: <span className="font-normal">{current}</span>
                </span>
                {isSize &&
                    <span
                        // onClick={() => setShowSizeGuide(true)}
                        className="text-xs cursor-pointer underline flex items-center gap-1 underline-offset-4"
                    >
                        Size guide <Info size={12} strokeWidth={1.5} />
                    </span>
                }
            </div>

            <div className="flex flex-wrap gap-2 text-sm uppercase text-brown">
                {values?.map((value) => {
                    const isSelected = value === current
                    if (!isSize) return (
                        <span
                            key={value}
                            onClick={() => setOption(option.id, value)}
                            style={{
                                backgroundColor: value, outline: current === value ? "2px solid black" : "none",
                            }}
                            className="inline-block h-8 w-8 border-2 border-white rounded-full cursor-pointer"
                        ></span>
                    )
                    return (
                        <button
                            key={value}
                            onClick={() => setOption(option.id, value)}
                            className={`flex-1 basis-1/6 rounded-md px-3 py-3 transition-colors duration-150 border cursor-pointer ${isSelected ? "bg-brown text-white  font-medium border-brown ring-2 ring-brown ring-offset-1" : "bg-gray-50 border-gray-300 hover:bg-brown hover:text-white hover:border-brown"}`}
                            disabled={disabled}
                            aria-pressed={isSelected}
                            aria-label={`${title}: ${value}`}
                        >
                            {value}
                        </button>
                    )
                })}
            </div>

            {isSize ? <p className="text-xs text-amber-700 font-medium">
                {(current === "One Size") ? "Measurements can be added during checkout." : "Refer to our size chart for the best fit."}
            </p> : <span className="text-xs text-amber-700 font-medium">
                Check product images or color chart for actual color
            </span>}
        </div>
    )
}