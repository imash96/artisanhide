'use client';

import Link from 'next/link';
import clx from '@libs/util/clx';
import { useRipple } from '@libs/hooks/use-ripple';

const variantStyles = {
    solid: {
        primary: 'bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover focus:ring-btn-primary',
        secondary: 'bg-btn-secondary text-btn-secondary-foreground hover:bg-btn-secondary-hover focus:ring-btn-secondary',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    },
    outline: {
        primary: 'border border-btn-primary text-foreground hover:bg-btn-primary-hover focus:ring-btn-primary',
        secondary: 'border border-btn-secondary text-foreground hover:btn-secondary-hover focus:ring-btn-secondary',
        danger: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    },
    icon: {
        primary: 'bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover focus:ring-btn-primary',
        secondary: 'bg-btn-secondary text-btn-secondary-foreground hover:bg-btn-secondary-hover focus:ring-btn-secondary',
        danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500',
    },
};

const baseStyles = {
    solid: 'px-4 py-2 font-semibold',
    outline: 'px-4 py-2 font-medium',
    icon: 'p-2 w-fit',
};

export type ButtonProps = {
    variant?: keyof typeof variantStyles;
    color?: keyof typeof variantStyles['solid'];
    isLoading?: boolean;
    pill?: boolean;
    ripple?: boolean,
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
} & (React.ComponentPropsWithoutRef<typeof Link> | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined }));

export default function Button({ variant = 'solid', color = 'primary', isLoading = false, pill = false, ripple = false, className, children, onClick, ...props }: ButtonProps) {
    props.href && (ripple = false)
    const btnClass = clx(
        'flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-sm shadow-sm transition-colors',
        variantStyles[variant][color],
        baseStyles[variant],
        pill && 'rounded-full',
        ripple && 'relative overflow-hidden',
        className
    );

    const handleRipple = useRipple();

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => ripple && handleRipple(e)

    const content = children ? children : "Submit"

    if (typeof props.href === 'undefined') {
        return (
            <button className={btnClass} disabled={isLoading || props.disabled} {...props} onClick={(e) => { onClickHandler(e); onClick?.(e) }}>
                {content}
            </button>
        );
    }

    return (
        <Link className={btnClass} {...props}>
            {content}
        </Link>
    );
}
