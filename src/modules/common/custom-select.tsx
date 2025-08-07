"use client"

import { useId } from "react"

type SelectOption = {
    label: string
    value: string | number
    disabled?: boolean
}

type SelectProps = {
    label: string
    options: SelectOption[]
    state?: "default" | "success" | "error"
    helperText?: string
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">

export default function CustomSelect({
    label,
    options,
    state = "default",
    helperText,
    className = "",
    disabled,
    required,
    ...props
}: SelectProps) {
    const id = useId()
    const helpId = helperText ? `${id}-helper` : undefined

    const stateClasses = {
        default: {
            border: "border-gray-300 focus:border-blue-600",
            label: "text-gray-500 peer-focus:text-blue-600",
            helper: "text-gray-500"
        },
        success: {
            border: "border-green-600 focus:border-green-600",
            label: "text-green-600",
            helper: "text-green-600"
        },
        error: {
            border: "border-red-600 focus:border-red-600",
            label: "text-red-600",
            helper: "text-red-600"
        }
    }[state]

    return (
        <div className={className}>
            <div className="relative">
                <select
                    id={id}
                    disabled={disabled}
                    required={required}
                    aria-describedby={helpId}
                    aria-invalid={state === "error"}
                    className={`peer block w-full px-2.5 pb-1 pt-5 text-sm bg-gray-50 border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 rounded-md ${stateClasses.border} ${disabled ? "text-gray-400 cursor-not-allowed bg-gray-100" : "text-gray-900"}`}
                    {...props}
                >
                    <option value="" disabled hidden></option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor={id}
                    className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 transition-all peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 ${stateClasses.label} ${disabled && "text-gray-400"}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {helperText && (
                <p id={helpId} className={`mt-1 text-xs ${stateClasses.helper}`}>
                    {helperText}
                </p>
            )}
        </div>
    )
}
