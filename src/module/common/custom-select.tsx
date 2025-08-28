"use client"

import { useId } from "react"

type SelectOption = {
    label: string
    value: string | number
    disabled?: boolean
}

type SelectProps = {
    label: string
    options: SelectOption[] | undefined
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
            border: "border-border focus:border-card-foreground",
            label: "text-card-foreground peer-focus:text-card-foreground",
            helper: "text-card-foreground"
        },
        success: {
            border: "border-success focus:border-success",
            label: "text-success-foreground",
            helper: "text-success-foreground"
        },
        error: {
            border: "border-destructive focus:border-destructive",
            label: "text-destructive",
            helper: "text-destructive"
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
                    className={`peer block w-full px-2.5 pb-1 pt-5 text-sm bg-card border appearance-none focus:outline-none focus:ring-0 rounded-md ${stateClasses.border} ${disabled ? "text-foreground-muted cursor-not-allowed bg-background-muted" : ""}`}
                    {...props}
                >
                    <option value="" disabled hidden></option>
                    {options?.map((option) => (
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
                    className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] start-2.5 transition-all peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 ${stateClasses.label} ${disabled && "text-foreground-muted"}`}
                >
                    {label}
                    {required && <span className="text-destructive-foreground ml-1">*</span>}
                </label>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-foreground-muted"
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
