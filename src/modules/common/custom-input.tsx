"use client"

import { Eye, EyeOff } from 'lucide-react'
import { useState, useId, useRef } from "react"

type InputProps = {
    label: string
    state?: "default" | "success" | "error" | "disabled"
    helperText?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">

export default function CustomInput({
    label,
    type = "text",
    state = "default",
    helperText,
    className = "",
    disabled,
    required,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)
    const helpId = helperText ? `${id}-helper` : undefined

    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

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
        },
        disabled: {
            border: "border-gray-300",
            label: "text-gray-500",
            helper: "text-gray-500"
        }
    }[state]

    return (
        <div className={className}>
            <div className="relative">
                <input
                    id={id}
                    type={inputType}
                    ref={inputRef}
                    placeholder=" "
                    disabled={disabled}
                    required={required}
                    aria-describedby={helpId}
                    aria-invalid={state === "error"}
                    className={`peer block w-full px-2.5 pb-1 pt-5 text-sm bg-gray-50 border appearance-none focus:outline-none focus:ring-0 rounded-md ${stateClasses.border} ${(disabled || props.readOnly) ? "text-gray-400 cursor-not-allowed bg-gray-100" : "text-gray-900"}`}
                    {...props}
                />

                <label
                    htmlFor={id}
                    onClick={() => inputRef.current?.focus()}
                    className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 transition-all peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 ${stateClasses.label} ${disabled && "text-gray-400"}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        className="absolute right-2.5 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>

            {helperText && (
                <p id={helpId} className={`mt-1 text-xs ${stateClasses.helper}`}>
                    {helperText}
                </p>
            )}
        </div>
    )
}
