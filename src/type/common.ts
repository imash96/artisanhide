import { BaseProductCategory } from "@medusajs/types/dist/http/product-category/common";
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

export type StepType = "address" | "delivery" | "payment"

export type RatingType = {
    average_rating: number;
    review_count: number;
    rating_count_1: number;
    rating_count_2: number;
    rating_count_3: number;
    rating_count_4: number;
    rating_count_5: number;
} | undefined

export type BreadcrumbItem = {
    name: string;
    href: string;
};


export interface ProductCategory extends Omit<BaseProductCategory, "is_internal" | "products" | "parent_category" | "category_children" | "created_at" | "updated_at" | "parent_category_id" | "deleted_at"> {
    mpath: string,
    category_children?: ProductCategory[];
}

export type ProductCollection = {
    id: string;
    handle: string;
    title: string;
    metadata: {
        thumbnail: string;
        alt: string;
        description: string;
        is_active: boolean;
    };
}