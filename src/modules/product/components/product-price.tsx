import { useProduct } from "@libs/context/product-context";

export default function ProductPrice() {
    const { cheapestPrice, variantPrice, selectedVariant } = useProduct()

    const selectedPrice = selectedVariant ? variantPrice : cheapestPrice

    if (!selectedPrice)
        return (
            <div
                className="block w-32 h-9 bg-gray-100 animate-pulse rounded"
                aria-label="Loading price..."
            />
        );

    const isSale = selectedPrice.price_type === "sale";

    return (
        <div className="flex flex-col font-display mt-4 text-[#242424]">
            <div className="flex items-center gap-3">
                <span className={`text-3xl font-bold tracking-tight ${isSale ? "text-blue-600" : "text-gray-900"}`}
                >
                    {selectedPrice.calculated_price}
                </span>

                {isSale && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full"
                        aria-label={`Discount of ${selectedPrice.percentage_diff}%`}
                    >
                        SAVE {selectedPrice.percentage_diff}%
                    </span>
                )}
            </div>

            {isSale && (
                <div className="mt-1 text-sm flex items-center gap-2">
                    <span className="text-gray-500">Original:</span>
                    <span className="line-through text-gray-500">
                        {selectedPrice.original_price}
                    </span>
                </div>
            )}
        </div>
    );
}