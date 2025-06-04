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

// remove if not used
export type ListingSectionProps = {
    heading?: string;
    subHeading?: string;
    listing?: any[];
    buttonText?: string;
    buttonLink?: string;
}