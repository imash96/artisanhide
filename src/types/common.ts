import React from "react";

export type IconProp = React.ComponentPropsWithoutRef<'svg'>

export type FeaturesType = {
    [key: string]: {
        id: string,
        name: string;
        handle: string;
        thumbnail: string;
        alt: string;
    }[]
}

export type IconWithTextType = {
    name: string;
    description: string;
    Icon: ({ ...props }: IconProp) => React.JSX.Element;
}

export type FormState = {
    success: boolean
    error: string | null
    message?: string
}

// remove if not used
export type ListingSectionProps = {
    heading?: string;
    subHeading?: string;
    listing?: any[];
    buttonText?: string;
    buttonLink?: string;
}

export type SortOptions = "price_asc" | "price_desc" | "created_at"

export type StepId = "address" | "shipping" | "payment";