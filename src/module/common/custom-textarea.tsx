"use client"

import { useId, useRef } from "react"

type TextareaProps = {
    label: string
    state?: "default" | "success" | "error" | "disabled"
    helperText?: string
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">

export default function CustomTextarea({
    label,
    state = "default",
    helperText,
    className = "",
    disabled,
    required,
    ...props
}: TextareaProps) {
    const id = useId()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
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
                <textarea
                    id={id}
                    ref={textareaRef}
                    placeholder=" "
                    disabled={disabled}
                    required={required}
                    aria-describedby={helpId}
                    aria-invalid={state === "error"}
                    className={`peer block w-full px-2.5 pb-1 pt-5 text-sm bg-card border appearance-none focus:outline-none focus:ring-0 rounded-md min-h-[100px] resize-y ${stateClasses.border} ${disabled ? "text-foreground-muted cursor-not-allowed bg-background-muted" : ""
                        }`}
                    {...props}
                />

                <label
                    htmlFor={id}
                    onClick={() => textareaRef.current?.focus()}
                    className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3.5 z-9 origin-[0] start-2.5 transition-all 
            peer-focus:scale-75 peer-focus:-translate-y-3 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            ${stateClasses.label} ${disabled ? "text-foreground-muted" : ""}`}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            </div>

            {helperText && (
                <p id={helpId} className={`mt-1 text-xs ${stateClasses.helper}`}>
                    {helperText}
                </p>
            )}
        </div>
    )
}
