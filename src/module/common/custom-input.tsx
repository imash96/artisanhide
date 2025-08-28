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
        },
        disabled: {
            border: "border-border",
            label: "text-card-foreground",
            helper: "text-card-foreground"
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
                    className={`peer block w-full px-2.5 pb-1 pt-5 text-sm bg-card border appearance-none focus:outline-none focus:ring-0 rounded-md ${stateClasses.border} ${(disabled || props.readOnly) ? "text-foreground-muted cursor-not-allowed bg-background-muted" : ""}`}
                    {...props}
                />

                <label
                    htmlFor={id}
                    onClick={() => inputRef.current?.focus()}
                    className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] start-2.5 transition-all peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 ${stateClasses.label} ${disabled ? "text-foreground-muted" : undefined}`}
                >
                    {label}
                    {required && <span className="text-destructive-foreground ml-1">*</span>}
                </label>

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        className="absolute right-2.5 top-4 text-card-foreground hover:text-card-foreground-hover focus:outline-none"
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
