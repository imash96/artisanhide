'use client';

import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import clx from '@libs/util/clx';
import { useRipple } from '@libs/hooks/use-ripple';

const variantStyles = {
    solid: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    },
    outline: {
        primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        secondary: 'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
        danger: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    },
    icon: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
        secondary: 'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600',
        danger: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
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
} & (React.ComponentPropsWithoutRef<typeof Link> | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined }));

export default function Button({ variant = 'solid', color = 'primary', isLoading = false, pill = false, ripple = false, className, children, ...props }: ButtonProps) {
    props.href && (ripple = false)
    const btnClass = clx(
        'flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm transition-colors',
        variantStyles[variant][color],
        baseStyles[variant],
        pill && 'rounded-full',
        ripple && 'relative overflow-hidden',
        className
    );

    const handleRipple = useRipple();

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => ripple && handleRipple(e)

    const content = children ? <>{isLoading && <LoaderCircle className="w-5 h-5 animate-spin mr-1" />} {children}</> : <>{isLoading && <LoaderCircle className="w-5 h-5 animate-spin mr-1" />} Submit</>

    if (typeof props.href === 'undefined') {
        return (
            <button className={btnClass} disabled={isLoading || props.disabled} {...props} onClick={onClickHandler}>
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
