"use client"

import clx from "@libs/util/clx";
import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";

type InputProp = {
    label: string;
    state?: "default" | "success" | "error";
    helperText?: string;
    pill?: boolean;
} & React.ComponentPropsWithoutRef<'input'>

export default function Input({ label, type = "text", state = "default", helperText, className, pill, ...props }: InputProp) {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type
    const id = props.id ? props.id : `input-${props.name}`;
    const helpId = `${id}-helper-text`;

    const borderClass = {
        default: 'border-gray-300 focus:border-blue-600',
        success: 'border-green-600 focus:border-green-600',
        error: 'border-red-600 focus:border-red-600',
    }[state];

    const labelColor = {
        default: 'text-gray-500 peer-focus:text-blue-600',
        success: 'text-green-600',
        error: 'text-red-600',
    }[state];

    const helperColor = {
        default: 'text-gray-500',
        success: 'text-green-600',
        error: 'text-red-600',
    }[state];

    const rounded = pill ? "rounded-full" : "rounded-md"
    return (
        <div className={className}>
            <div className="relative">
                <input
                    id={id}
                    ref={inputRef}
                    type={inputType}
                    placeholder=" "
                    aria-describedby={helperText ? helpId : undefined}
                    aria-invalid={state === 'error'}
                    aria-required={props.required}
                    className={clx(
                        'peer block w-full appearance-none bg-white px-2 transition-transform duration-150 ease-in-out translate-y-1',
                        'border focus:outline-none focus:ring-0 hover:bg-slate-50 pt-4 pb-1 text-sm',
                        borderClass,
                        rounded,
                        props.disabled ? 'text-gray-400 cursor-not-allowed bg-gray-100 opacity-60' : 'text-gray-900',
                    )}
                    {...props}
                />
                <label
                    htmlFor={id}
                    onClick={() => inputRef.current?.focus()}
                    className={clx(
                        'absolute origin-[0] scale-75 transform px-2 text-sm transition-all duration-300 ease-in-out pointer-events-none start-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/4 peer-focus:scale-75 top-2 -translate-y-1 peer-focus:top-2 peer-focus:-translate-y-1',
                        labelColor,
                        props.disabled && 'text-gray-400'
                    )}>
                    {label}
                    {props.required && <span className="text-rose-500 ml-0.5">*</span>}
                </label>
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={props.disabled}
                        className="absolute right-2.5 top-2.5 p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-1"
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {helperText && <p id={helpId} className={`mt-1 text-xs ${helperColor}`}>{helperText}</p>}
        </div>
    )
}
