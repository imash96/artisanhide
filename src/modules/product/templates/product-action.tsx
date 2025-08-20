"use client"

import { StoreProduct } from "@medusajs/types"
import { Heart, HeartPlus, Loader, Pencil, ShoppingBag, Shrink, Snowflake, Spool, Volleyball } from "lucide-react"
import Button from "@modules/common/custom-button"
import { useIntersection } from "@libs/hooks/use-in-view"
import OptionSelect from "../components/option-select"
import ProductPrice from "../components/product-price"
import { useProduct } from "@libs/context/product-context"
import MobileActions from "../components/mobile-action"
import { useRef } from "react"
import AddToCartButton from "../components/add-to-cart"

export default function ProductActions({ product }: ProductActionsProps) {
    const { selectedVariant, isPending } = useProduct()
    const actionsRef = useRef<HTMLDivElement>(null)
    const inView = useIntersection(actionsRef, "0px")

    return (
        <>
            <div className="flex flex-col gap-y-4" >
                <ProductPrice />
                <div className="flex flex-col gap-2.5 text-sm">
                    <div className="flex items-center gap-x-2">
                        <Spool />
                        Hand crafted, made to order. Each jacket is a work of art.
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Shrink />
                        Fitted design to suit your style.
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Volleyball />
                        Available in premium real leather.
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Snowflake />
                        Real leather naturally stretches and adapts to your body.
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    {(product.options || []).map((option) => (
                        <OptionSelect
                            key={option.id}
                            option={option}
                            title={option.title}
                            disabled={isPending}
                        />
                    ))}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2" ref={actionsRef}>
                    <AddToCartButton />
                    <div className="flex items-center gap-2 w-full">
                        <Button variant="outline" className="w-full h-12" ripple>
                            <span className="flex items-center justify-center gap-x-2">
                                {<Pencil className="w-5 h-5" />}
                                Customize
                            </span>
                        </Button>
                        <Button variant="icon" className="h-12 px-4">
                            {!selectedVariant ? <Heart className="w-5 h-5 fill-red-500 stroke-red-500" /> : <HeartPlus className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
                <MobileActions
                    pOption={product.options}
                    show={inView}
                />
            </div>
        </>
    )
}

type ProductActionsProps = {
    product: StoreProduct
}


{/* <div className="flex items-center gap-4">
    <Button
        onClick={handleAddToCart}
        variant="solid"
        className="w-full h-12 flex-1"
        isLoading={isPending}
        disabled={!inStock || !selectedVariant || disabled || isPending || !isValidVariant}
    >
        {!selectedVariant ? "Select variant" : !inStock || !isValidVariant ? "Out of stock" :
            <span className="flex items-center justify-center gap-x-2">
                {isPending ? <Loader className="w-5 h-5 animate-spin" /> : <ShoppingBag className="w-5 h-5" />}
                Add to Bag
            </span>}
    </Button>
    <Button
        variant="outline"
        className="w-full h-12 flex-1"
    >
        {!isValidVariant ? "Select variant" : !inStock ? "Out of stock" : (
            <span className="flex items-center justify-center gap-x-2">
                {!isValidVariant ? <Loader className="w-5 h-5 animate-spin" /> : <Pencil className="w-5 h-5" />}
                Customize
            </span>
        )}
    </Button>
</div> */}