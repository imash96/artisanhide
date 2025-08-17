"use client"

import { addToCart } from "@libs/actions/cart"
import { useIntersection } from "@libs/hooks/use-in-view"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import Button from "@modules/common/custom-button"
import CustomSelect from "@modules/common/custom-select"
import { Pencil, ShoppingBag } from "lucide-react"
import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import MobileActions from "../components/mobile-action"
import OptionSelect from "../components/option-select"
import ProductPrice from "../components/product-price"
import { repeat } from "@libs/util/repeat"

export default function ProductActions({ product, disabled = false, countryCode }: ProductActionsProps) {
    const [options, setOptions] = useState<Record<string, string | undefined>>({})
    const [isPending, startTransition] = useTransition()

    const actionsRef = useRef<HTMLDivElement>(null)
    const inView = useIntersection(actionsRef, "0px")

    useEffect(() => {
        if (product.variants?.length === 1) setOptions(optionsAsKeymap(product.variants[0].options) ?? {})
    }, [product.variants])

    const selectedVariant = useMemo(() => product.variants?.find(v => areOptionsEqual(optionsAsKeymap(v.options), options)), [product.variants, options])

    const isValidVariant = !!selectedVariant

    const inStock = useMemo(() => {
        if (!selectedVariant) return false
        if (!selectedVariant.manage_inventory) return true
        if (selectedVariant.allow_backorder) return true
        return (selectedVariant.inventory_quantity || 0) > 0
    }, [selectedVariant])

    const handleAddToCart = async () => {
        if (!selectedVariant?.id) return
        startTransition(() => addToCart({
            variantId: selectedVariant.id,
            quantity: 1,
            countryCode,
        }));
    }

    const setOptionValue = (optionId: string, value: string) => setOptions((prev) => ({ ...prev, [optionId]: value }))

    return (
        <>
            <div className="flex flex-col gap-y-4" ref={actionsRef}>
                <ProductPrice product={product} variant={selectedVariant} />
                {(product.variants?.length ?? 0) > 1 && (
                    <div className="flex flex-col gap-y-4">
                        {(product.options || []).map((option) => (
                            <OptionSelect
                                key={option.id}
                                option={option}
                                current={options[option.id]}
                                updateOption={setOptionValue}
                                title={option.title ?? ""}
                                disabled={!!disabled || isPending}
                            />
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleAddToCart}
                        variant="solid"
                        className="w-full h-10 flex-1"
                        isLoading={isPending}
                        disabled={!inStock || !selectedVariant || disabled || isPending || !isValidVariant}
                    >
                        {!selectedVariant ? "Select variant" : !inStock || !isValidVariant ? "Out of stock" : isPending ? "Adding to cart..." : <span className='flex items-center justify-center gap-x-2'>{<ShoppingBag className="w-5 h-5" />}Add to Cart</span>}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full h-10 flex-1"
                    >
                        {!isValidVariant ? "Select variant" : !inStock ? "Out of stock" : isPending ? "Adding..." : (
                            <span className="flex items-center justify-center gap-x-2">
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </span>
                        )}
                    </Button>
                </div>
                <MobileActions
                    product={product}
                    variant={selectedVariant}
                    options={options}
                    updateOptions={setOptionValue}
                    inStock={inStock}
                    handleAddToCart={handleAddToCart}
                    isAdding={isPending}
                    show={inView}
                    optionsDisabled={disabled || isPending}
                />
            </div>
        </>
    )
}

const optionsAsKeymap = (variantOptions: StoreProductVariant["options"]) => {
    return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
        acc[varopt.option_id] = varopt.value
        return acc
    }, {})
}

const areOptionsEqual = (options1: VariantOptions, options2: VariantOptions): boolean => {
    if (options1 === options2) return true
    if (!options1 || !options2) return false

    const keys1 = Object.keys(options1)
    const keys2 = Object.keys(options2)

    if (keys1.length !== keys2.length) return false

    return keys1.every(key => options1[key] === options2[key])
}

type VariantOptions = Record<string, string | undefined> | undefined

type ProductActionsProps = {
    product: StoreProduct
    disabled?: boolean
    countryCode: string
}