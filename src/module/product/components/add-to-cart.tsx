import { useProduct } from "@lib/context/product-context"
import Button from "@module/common/custom-button"
import { Loader, ShoppingBag } from "lucide-react"

export default function AddToCartButton() {
    const { selectedVariant, inStock, isValidVariant, isPending, handleAddToCart } = useProduct()
    return (
        <Button onClick={handleAddToCart} variant="solid" className="w-full h-12 gap-x-2" isLoading={isPending} ripple
            disabled={!inStock || !selectedVariant || isPending || !isValidVariant}>
            {!selectedVariant ?
                <><ShoppingBag className="w-5 h-5" /> Select variant</> :
                !inStock || !isValidVariant ? "Out of stock" :
                    <>
                        {isPending ? <Loader className="w-5 h-5 animate-spin" /> : <ShoppingBag className="w-5 h-5" />}
                        Add to Bag
                    </>}
        </Button>
    )
}