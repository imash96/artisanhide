"use client"

import Link from "next/link"
import { StoreProduct, StoreProductImage } from "@medusajs/types"
import RatingSystem from "./rating-system"
import { getProductPrice } from "@lib/util/get-product-price"
import ProductThumbnail from "@module/product/components/product-thumbnail"

export default function ProductCard({ product }: { product: StoreProduct }) {
    const { cheapestPrice } = getProductPrice({ product });
    const isSale = cheapestPrice?.price_type === "sale";

    return (
        <Link href={`/product/${product.handle}`} className="group relative w-full block text-left">
            <ProductThumbnail
                src={product.images?.length ? product.images : product.thumbnail}
                alt={product.title || 'Product image'}
            />
            {isSale && (
                <>
                    {/* <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden z-10"> */}
                    {/* <div className="absolute top-2 -left-11 w-32 bg-destructive text-destructive-foreground text-xs font-bold uppercase text-center rotate-[-45deg] shadow-md py-1"> */}
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold uppercase px-2 py-1 rounded-full shadow-lg">
                        Sale
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                    <span className="absolute top-2 right-2 rounded-full bg-badge-sale text-same-white px-2 py-1 text-xs font-semibold shadow-lg animate-bounce">
                        -{cheapestPrice.percentage_diff}%
                    </span>
                </>
            )}
            <div className="space-y-1 py-2">
                <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {product.title}
                </h3>
                <RatingSystem averageRating={4.4} reviewCount={150} size="sm" type="card" />
                <div className="flex items-baseline gap-2">
                    {isSale ? (
                        <>
                            <span className="font-semibold text-lg text-primary">
                                {cheapestPrice.calculated_price}
                            </span>
                            <span className="text-sm text-muted line-through">
                                {cheapestPrice.original_price}
                            </span>
                        </>
                    ) : (
                        <span className="font-medium text-lg text-foreground">
                            {cheapestPrice?.original_price}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}