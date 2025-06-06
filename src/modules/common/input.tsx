"use client"

import clx from "libs/util/clx";
import { Eye, EyeOff } from "lucide-react";
import { useId, useRef, useState } from "react";

type InputProp = {
    label: string;
    status?: "success" | "error" | "default";
    helperText?: string;
    pill?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>

export default function Input({ label, name, type = "text", status = "default", helperText, required, className, pill, ...props }: InputProp) {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null)

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className={`flex flex-col w-full ${className ?? ""}`}>
            <div className="flex relative z-0 w-full text-sm text-gray-800 font-normal">
                <input
                    id={id}
                    type={inputType}
                    name={name}
                    {...props}
                    className={clx("block w-full h-11 pt-4 pb-0.5 px-4 mt-0 bg-slate-100 border appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active hover:bg-slate-200",
                        {
                            "border-gray-300 focus:border-blue-600": status === "default",
                            "border-green-600 focus:border-green-600": status === "success",
                            "border-red-600 focus:border-red-600": status === "error",
                            "rounded-full": pill,
                            "rounded-md": !pill
                        }
                    )}
                    placeholder=" "
                    required={required}
                    ref={inputRef}
                    aria-describedby={helperText ? `${id}-helper-text` : undefined}
                />
                <label
                    htmlFor={id}
                    onClick={() => inputRef.current?.focus()}
                    className={clx("flex pb-1 items-center text-sm justify-center mx-3 px-1 transition-all absolute duration-300 top-3 origin-center text-gray-800",
                        {
                            "text-gray-600": status === "default",
                            "text-green-600": status === "success",
                            "text-red-600": status === "error"
                        }
                    )}>
                    {label}
                    {required && <span className="text-rose-500">*</span>}
                </label>
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-600 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-900 absolute right-0 top-3"
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                )}
            </div>
            {helperText && (
                <p id={`${id}-helper-text`} className={clx(
                    "mt-2 text-xs",
                    {
                        "text-gray-600": status === "default",
                        "text-green-600": status === "success",
                        "text-red-600": status === "error"
                    }
                )}>
                    {helperText}
                </p>
            )}
        </div>
    )
}