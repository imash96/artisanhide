'use client';

import Link from 'next/link';
import { useRipple } from '@lib/hook/use-ripple';
import { Loader } from 'lucide-react';

const variantStyles = {
    solid: {
        primary: 'bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover focus:ring-btn-primary/50',
        secondary: 'bg-btn-secondary text-btn-secondary-foreground hover:bg-btn-secondary-hover focus:ring-btn-secondary/50',
        destructive: 'bg-btn-destructive text-btn-destructive-foreground hover:bg-btn-destructive-hover focus:ring-btn-destructive/50',
    },
    outline: {
        primary: 'border border-btn-primary text-foreground hover:bg-btn-primary-hover hover:text-btn-primary-foreground focus:ring-btn-primary/50',
        secondary: 'border border-btn-secondary text-foreground hover:bg-btn-secondary-hover hover:text-btn-secondary-foreground focus:ring-btn-secondary/50',
        destructive: 'border border-btn-destructive text-btn-destructive hover:bg-btn-destructive-hover/20 focus:ring-btn-destructive/50',
    },
    icon: {
        primary: 'bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover focus:ring-btn-primary/50',
        secondary: 'bg-btn-secondary text-btn-secondary-foreground hover:bg-btn-secondary-hover focus:ring-btn-secondary/50',
        destructive: 'bg-btn-destructive text-btn-destructive-foreground hover:bg-btn-destructive-hover focus:ring-btn-destructive/50',
    },
};

const baseStyles = {
    solid: 'px-4 py-2 font-semibold',
    outline: 'px-4 py-2 font-medium',
    icon: 'p-2 w-fit',
};

export type ButtonProps = {
    variant?: keyof typeof variantStyles;
    color?: keyof typeof variantStyles['solid']
    isLoading?: boolean;
    withIcon?: boolean;
    pill?: boolean;
    ripple?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & (React.ComponentPropsWithoutRef<typeof Link> | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined }));

export default function Button({
    variant = 'solid',
    color = 'primary',
    isLoading = false,
    pill = false,
    ripple = false,
    className = "",
    children,
    onClick,
    withIcon = true,
    ...props
}: ButtonProps) {
    const btnClass = `flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-sm shadow-sm transition-colors duration-150  ${variantStyles[variant][color]} ${baseStyles[variant]} ${pill && 'rounded-full'} ${ripple && 'relative overflow-hidden'} ${className}`

    const handleRipple = useRipple();

    const handleClick = (e: any) => {
        if (ripple && !props.href) handleRipple(e);
        onClick?.(e);
    };

    let content = children ? children : "Submit"

    if (typeof props.href === 'undefined') {
        if (withIcon && isLoading) content = <><Loader className="animate-spin mr-2" /> {content}</>
        return (
            <button className={btnClass} disabled={isLoading || props.disabled} {...props} onClick={handleClick} aria-busy={isLoading}>
                {content}
            </button>
        );
    }

    return (
        <Link className={btnClass} {...props} onClick={handleClick} aria-busy={isLoading}>
            {content}
        </Link>
    );
};