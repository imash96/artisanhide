import { StoreProductOption } from "@medusajs/types"

type OptionSelectProps = {
    option: StoreProductOption
    current: string | undefined
    updateOption: (title: string, value: string) => void
    title: string
    disabled: boolean
}

export default function OptionSelect({ option, current, updateOption, title, disabled }: OptionSelectProps) {
    const filteredOptions = option.values?.map((v) => v.value) ?? [];

    return (
        <div className="flex flex-col gap-y-3">
            <span className="text-sm font-semibold text-gray-800">{title}: {current}</span>
            <div className="flex flex-wrap gap-2">
                {filteredOptions.map((value) => {
                    return (
                        <button
                            key={value}
                            onClick={() => updateOption(option.id, value)}
                            className={`flex items-center justify-center rounded-md px-4 py-3 text-sm font-normal uppercase transition-colors duration-150 flex-grow basis-1/5 ${value === current ? "bg-indigo-600 text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" : " hover:bg-indigo-700 hover:text-gray-50 bg-gray-50 text-gray-900 border border-gray-300"}`}
                            disabled={disabled}
                            aria-pressed={value === current}
                            aria-label={`${title}: ${value}`}
                        >
                            {value}
                        </button>
                    )
                })}
            </div>
            <span className="text-xs text-amber-800 font-medium">
                {current === "One Size" ? "Measurements can be added during checkout." : "Refer to our size chart for the best fit."}
            </span>
        </div>
    )
}