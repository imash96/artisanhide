import { getProductPrice } from "@libs/util/get-product-price";
import { StoreProduct, StoreProductVariant } from "@medusajs/types"

export default function ProductPrice({ product, variant }: { product: StoreProduct; variant?: StoreProductVariant }) {
    const { cheapestPrice, variantPrice } = getProductPrice({ product, variantId: variant?.id })

    const selectedPrice = variant ? variantPrice : cheapestPrice

    if (!selectedPrice) {
        return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded" aria-label="Loading price..." />
    }

    const isSale = selectedPrice.price_type === "sale";

    return (
        <div className={`flex flex-col text-gray-900 font-display`}>
            <span className={`text-3xl font-semibold tracking-tight ${isSale ? "text-blue-500" : ""}`}>
                {selectedPrice.calculated_price}
            </span>
            {isSale && (
                <div className="mt-1 text-sm space-y-1">
                    <p>
                        <span className="text-gray-500">Original: </span>
                        <span className="line-through text-gray-600">
                            {selectedPrice.original_price}
                        </span>
                    </p>
                    <span className="text-blue-500 font-medium" aria-label={`Discount of ${selectedPrice.percentage_diff}%`}>
                        -{selectedPrice.percentage_diff}%
                    </span>
                </div>
            )}
        </div>
    )
}