import CartEmpty from "@/icons/empty-cart";
import Button from "@modules/common/custom-button";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center space-y-4">
            <CartEmpty className="w-24 opacity-90" />
            <h3 className="text-lg font-semibold tracking-wide">
                YOUR CART IS EMPTY
            </h3>
            <p className="text-sm text-foreground-muted max-w-xs">
                Looks like you haven’t added anything yet.
            </p>
            <Button variant="outline">
                Continue Shopping
            </Button>
        </div>
    )
}
