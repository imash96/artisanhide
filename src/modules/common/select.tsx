
import clx from '@libs/util/clx';

export default function Select({ label, options, state = 'default', helperText, pill = false, className, disabled, ...props }: SelectProps) {
    const id = `select-${props.name}`;
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

    const rounded = pill ? 'rounded-full' : 'rounded-md';
    return (
        <div>
            <div className="relative">
                <select
                    id={id}
                    disabled={disabled}
                    aria-describedby={helperText ? helpId : undefined}
                    aria-invalid={state === 'error'}
                    aria-required={props.required}
                    className={clx(
                        'peer block w-full bg-white appearance-none px-2 border focus:outline-none focus:ring-0 hover:bg-slate-50',
                        borderClass,
                        "pt-4 pb-2 text-sm",
                        rounded,
                        disabled ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'text-gray-900',
                        className
                    )}
                    {...props}
                >
                    <option value="" disabled hidden></option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor={id}
                    className={clx(
                        'absolute origin-[0] scale-75 transform px-2 text-sm transition-all duration-300 start-1',
                        'peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75',
                        "top-2 -translate-y-2 peer-focus:top-2 peer-focus:-translate-y-2",
                        labelColor,
                        disabled && 'text-gray-400'
                    )}
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            </div>

            {helperText && (
                <p id={helpId} className={clx('mt-1 text-xs', helperColor)}>
                    {helperText}
                </p>
            )}
        </div>
    )
}

type SelectOption = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

type SelectProps = {
    label: string;
    options: SelectOption[];
    state?: 'success' | 'error' | 'default';
    helperText?: string;
    pill?: boolean;
} & React.ComponentPropsWithoutRef<'select'>;