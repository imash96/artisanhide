"use client"

import Link from "next/link"
import { StoreProduct } from "@medusajs/types"
import Image from "next/image"
import { Star } from "lucide-react"
import { getProductPrice } from "@libs/util/get-product-price"
import RatingSystem from "./rating-system"

export default function ProductCard({ product }: { product: StoreProduct }) {
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
                            className="h-full w-full object-contain object-center transition-opacity duration-300 ease-in opacity-100 group-hover:opacity-0"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority
                        />
                        <Image
                            src={images[1].url || "/placeholder.svg"}
                            alt={`${product.title} alternate view`}
                            fill
                            className="h-full w-full absolute top-0 left-0 object-contain object-center transition-opacity duration-300 ease-in opacity-0 group-hover:opacity-100"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    </>
                ) : (
                    <Image
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="h-full w-full object-contain object-center"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority
                    />
                )}

                {/* Sale Badge */}
                {cheapestPrice?.price_type === "sale" && (
                    <>
                        <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden z-10">
                            <div className="absolute top-2 -left-11 w-32 bg-destructive text-destructive-foreground text-xs font-bold uppercase text-center rotate-[-45deg] shadow-md py-1">
                                Sale
                            </div>
                        </div>
                        <span className="absolute top-2 right-1 rounded-md bg-secondary px-2 py-1 text-sm font-semibold text-secondary-foreground shadow animate-bounce">
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
                <RatingSystem averageRating={4.4} reviewCount={150} size="sm" type="card" />

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