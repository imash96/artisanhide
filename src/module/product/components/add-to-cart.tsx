import { useProduct } from "@lib/context/product-context"
import Button from "@module/common/custom-button"
import { ShoppingBag } from "lucide-react"

export default function AddToCartButton() {
    const { selectedVariant, inStock, isValidVariant, isPending, handleAddToCart } = useProduct()
    return (
        <Button onClick={handleAddToCart} Icon={ShoppingBag} iconClassName="w-5 h-5" variant="solid" className="w-full h-12 gap-x-2" isLoading={isPending} ripple disabled={!inStock || !selectedVariant || isPending || !isValidVariant}>
            {!selectedVariant ? "Select variant " : !inStock || !isValidVariant ? "Out of stock" : "Add to Bag"}
        </Button>
    )
}