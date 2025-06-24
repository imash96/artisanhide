"use client"

import Image from "next/image"
import { Heart, ArrowRight } from "lucide-react"
import type { StoreProduct } from "@medusajs/types"

import "@/styles/temp.css"
import { getProductPrice } from "libs/util/get-product-price"
import Link from "next/link"

export default function ProductCard({ product }: ProductCardProps) {

    const getBadgeColor = (type: string) => {
        switch (type) {
            case "sale":
                return "badge-sale"
            case "trending":
                return "badge-trending"
            case "new":
                return "badge-new"
            case "limited":
                return "badge-limited"
            default:
                return "badge-sale"
        }
    }

    const { cheapestPrice } = getProductPrice({
        product,
    })

    return (
        <Link href={`/products/${product.handle}`} className="relative">
            <div className="card-container relative bg-white transition-all duration-300">
                {/* Image Container */}
                <div className="image-container relative w-full aspect-[3/4] bg-gray-50">
                    <div className={`product-badge badge-sale`}>SALE</div>
                    {/* Wishlist Button */}
                    <button className={`wishlist-btn wishlisted`} aria-label="Add to wishlist">
                        <Heart className="heart-icon" />
                    </button>

                    {/* Product Images */}
                    <div className="relative w-full h-full bg-white">
                        <Image
                            src={product?.images ? product?.images[0]?.url : "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="product-image primary-image"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority
                        />
                        <Image
                            src={product?.images ? product?.images[1]?.url : "/placeholder.svg"}
                            alt={`${product.title} alternate view`}
                            fill
                            className="product-image secondary-image"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    </div>

                    {/* Select Options Button */}
                    <button className="select-options-btn" aria-label="Select product options">
                        <span className="btn-text">Select Options</span>
                        <ArrowRight className="btn-arrow" />
                    </button>
                </div>
            </div>
            {/* Product Info */}
            <div className="product-info py-3">
                <h3 className="text-sm leading-snug lg:text-base font-light text-brown line-clamp-2 no-scrollbar mask-ellipse">{product.title}</h3>
                <div className="price-container">
                    {cheapestPrice && cheapestPrice.price_type === "sale" ? (
                        <div className="price-with-discount">
                            <span className="current-price">{cheapestPrice.calculated_price}</span>
                            <span className="original-price">{cheapestPrice.original_price}</span>
                            <span className="discount-badge">-{cheapestPrice.percentage_diff}%</span>
                        </div>
                    ) : (
                        <span className="current-price block font-light tracking-wide">{cheapestPrice?.original_price}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

type ProductCardProps = {
    product: StoreProduct
}
