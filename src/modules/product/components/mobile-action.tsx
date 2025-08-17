import { useMemo } from 'react'
import { StoreProduct, StoreProductVariant } from '@medusajs/types'
import { createPortal } from 'react-dom'
import { useToggleState } from '@libs/hooks/use-toggle-state'
import { getProductPrice } from '@libs/util/get-product-price'
import Button from '@modules/common/custom-button'
import { ChevronDown, ShoppingBag, X } from 'lucide-react'
import OptionSelect from './option-select'

export default function MobileActions({ product, variant, options, updateOptions, inStock, handleAddToCart, isAdding, show, optionsDisabled }: MobileActionsProps) {
    const { state, toggle } = useToggleState()

    const price = getProductPrice({
        product,
        variantId: variant?.id,
    })

    const selectedPrice = useMemo(() => {
        if (!price) return null
        return price.variantPrice || price.cheapestPrice || null
    }, [price])

    return (
        <>
            <div className={`lg:hidden inset-x-0 bottom-0 fixed z-40 transition-opacity duration-300 ease-in-out ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="bg-gray-50 flex flex-col gap-y-3 justify-center text-base font-normal p-4 border-t border-gray-200">
                    <div>
                        <span className="text-gray-900 font-medium">{product.title}</span>
                        {selectedPrice ? (
                            <div className="flex items-end gap-x-2 text-gray-900 font-display mt-2">
                                {selectedPrice.price_type === "sale" && (
                                    <p>
                                        <span className="line-through text-sm text-gray-500">
                                            {selectedPrice.original_price}
                                        </span>
                                    </p>
                                )}
                                <span
                                    className={`text-lg font-semibold ${selectedPrice.price_type === "sale" ? "text-blue-500" : ""
                                        }`}
                                >
                                    {selectedPrice.calculated_price}
                                </span>
                            </div>
                        ) : (
                            <span className="text-gray-500 text-sm">Price unavailable</span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 w-full gap-x-4">
                        <Button
                            onClick={toggle}
                            variant="outline"
                            className="w-full"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>
                                    {variant ? Object.values(options).join(" / ") : "Select Options"}
                                </span>
                                <ChevronDown className="h-5 w-5" />
                            </div>
                        </Button>
                        <Button
                            onClick={handleAddToCart}
                            disabled={!inStock || !variant}
                            className="w-full"
                            isLoading={isAdding}
                        >
                            {!variant ? (
                                "Select variant"
                            ) : !inStock ? (
                                "Out of stock"
                            ) : (
                                <span className="flex items-center justify-center gap-x-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {state && <MobileModal product={product} toggle={toggle} options={options} updateOptions={updateOptions} optionsDisabled={optionsDisabled} />}
        </>
    )
}

const MobileModal = ({ product, toggle, options, updateOptions, optionsDisabled }: MobileModalProps) => {
    return createPortal(
        <div
            className="lg:hidden fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-800/60 backdrop-blur-sm" aria-hidden="true" onClick={toggle} />

            {/* Bottom sheet */}
            <div className="fixed bottom-0 inset-x-0">
                <div className="w-full bg-white rounded-t-xl shadow-lg overflow-hidden">
                    <div className="flex justify-end p-4">
                        <button
                            onClick={toggle}
                            className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center"
                            aria-label="Close options modal"
                        >
                            <X className="h-6 w-6 text-gray-600" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="px-6 py-6">
                        {(product.variants?.length ?? 0) > 1 && (
                            <div className="flex flex-col gap-y-6">
                                {product.options?.map((option) => (
                                    <OptionSelect
                                        key={option.id}
                                        option={option}
                                        current={options[option.id]}
                                        updateOption={updateOptions}
                                        title={option.title ?? ""}
                                        disabled={optionsDisabled}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

type MobileModalProps = {
    toggle: () => void
} & Pick<MobileActionsProps, "product" | "options" | "updateOptions" | "optionsDisabled">


type MobileActionsProps = {
    product: StoreProduct
    variant?: StoreProductVariant
    options: Record<string, string | undefined>
    updateOptions: (title: string, value: string) => void
    inStock?: boolean
    handleAddToCart: () => void
    isAdding?: boolean
    show: boolean
    optionsDisabled: boolean
}