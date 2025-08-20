"use client"

import React, { createContext, useContext, useState, useMemo, useTransition, ReactNode } from "react"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { addToCart } from "@libs/actions/cart"
import { getProductPrice } from "@libs/util/get-product-price"

const ProductContext = createContext<ProductContextType | undefined>(undefined)

// helper: convert variant options into key-value map
const optionsAsKeymap = (variantOptions: StoreProductVariant["options"]) => variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
}, {})

const areOptionsEqual = (options1: VariantOptions, options2: VariantOptions) => {
    if (!options1 || !options2) return false
    const keys1 = Object.keys(options1)
    if (keys1.length !== Object.keys(options2).length) return false
    return keys1.every((k) => options1[k] === options2[k])
}

export const ProductProvider = ({ product, countryCode, children, }: ProductProviderProps) => {
    const [options, setOptions] = useState<Record<string, string | undefined>>({})
    const [isPending, startTransition] = useTransition()

    const selectedVariant = useMemo(() => product.variants?.find((v) => areOptionsEqual(optionsAsKeymap(v.options), options)), [product.variants, options])

    const isValidVariant = useMemo(() => product.variants?.some((v) => areOptionsEqual(optionsAsKeymap(v.options), options)) ?? false,
        [product.variants, options])


    const { cheapestPrice, variantPrice } = getProductPrice({ product, variantId: selectedVariant?.id })

    const inStock = useMemo(() => {
        if (!selectedVariant) return false
        if (!selectedVariant.manage_inventory) return true
        if (selectedVariant.allow_backorder) return true
        return (selectedVariant.inventory_quantity || 0) > 0
    }, [selectedVariant])

    const handleAddToCart = () => {
        if (!selectedVariant?.id) return
        startTransition(() => addToCart({
            variantId: selectedVariant.id,
            quantity: 1,
            countryCode,
        }))
    }

    const setOption = (id: string, value: string) => setOptions((prev) => ({ ...prev, [id]: value }))

    return (
        <ProductContext.Provider value={{ options, setOption, selectedVariant, inStock, isValidVariant, isPending, cheapestPrice, variantPrice, handleAddToCart }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const ctx = useContext(ProductContext)
    if (!ctx) throw new Error("useProduct must be used within ProductProvider")
    return ctx
}

type VariantOptions = Record<string, string | undefined> | undefined

type ProductContextType = {
    options: Record<string, string | undefined>
    setOption: (id: string, value: string) => void
    selectedVariant?: StoreProductVariant
    inStock: boolean
    isValidVariant: boolean
    isPending: boolean
    handleAddToCart: () => void
    cheapestPrice: ProductCalculatedPrice
    variantPrice: ProductCalculatedPrice
}

type ProductProviderProps = {
    product: StoreProduct
    countryCode: string
    children: ReactNode
}

type ProductCalculatedPrice = {
    calculated_price_number: any;
    calculated_price: string;
    original_price_number: any;
    original_price: string;
    currency_code: any;
    price_type: any;
    percentage_diff: string;
} | null