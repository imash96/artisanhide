"use client"

import Link from "next/link"
import { StoreProduct } from "@medusajs/types"
import Image from "next/image"
import { Star } from "lucide-react"
import { getProductPrice } from "@libs/util/get-product-price"

export default function ProductCard({ product, showCol }: ProductCardProps) {
    const { cheapestPrice } = getProductPrice({ product })
    const images = product.images ?? []

    return (
        <Link href={`/product/${product.handle}`} className="group relative w-full">
            {/* Image Wrapper */}
            <div className="relative aspect-[3/4] w-full bg-white border border-border">
                {/* Product Image Hover Swap */}
                {images.length > 1 ? (
                    <>
                        <Image
                            src={images[0].url || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="h-full w-full object-contain object-center p-0.5 transition-opacity duration-300 ease-in opacity-100 group-hover:opacity-0"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority
                        />
                        <Image
                            src={images[1].url || "/placeholder.svg"}
                            alt={`${product.title} alternate view`}
                            fill
                            className="h-full w-full absolute top-0 left-0 object-contain object-center p-0.5 transition-opacity duration-300 ease-in opacity-0 group-hover:opacity-100"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    </>
                ) : (
                    <Image
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="h-full w-full object-contain object-center p-0.5"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority
                    />
                )}

                {/* Sale Badge */}
                {cheapestPrice?.price_type === "sale" && (
                    <>
                        <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden z-10">
                            <div className="absolute top-1 -left-12 w-32 bg-destructive text-destructive-foreground text-xs font-bold uppercase text-center rotate-[-45deg] shadow-md py-1">
                                Sale
                            </div>
                        </div>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground shadow animate-bounce">
                            -{cheapestPrice.percentage_diff}%
                        </span>
                    </>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-1 py-2">
                {/* Title */}
                <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(4.4) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                        />
                    ))}
                    <span className="ml-1 text-xs text-muted">{115} Reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    {cheapestPrice && cheapestPrice.price_type === "sale" ? (
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

type ProductCardProps = {
    product: StoreProduct
    showCol?: boolean
}
