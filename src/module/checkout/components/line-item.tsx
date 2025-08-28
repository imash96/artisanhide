import { convertToLocale } from "@lib/util/money";
import { StoreCartLineItem } from "@medusajs/types";
import ProductThumbnail from "@module/product/components/product-thumbnail";
import Link from "next/link";

export default function CheckoutLineItem({ item, currency_code }: CheckoutLineItemProps) {
    const adjustmentsSum = (item.adjustments || []).reduce((acc, adjustment) => adjustment.amount + acc, 0)
    const currentPrice = item.total - adjustmentsSum
    return (
        <div className="flex gap-x-2">
            {/* Product Image */}
            <div className="relative w-15 flex-shrink-0">
                <ProductThumbnail src={item.thumbnail} alt={item.title} width={300} height={400} />
            </div>

            {/* Product Details */}
            <div className="flex flex-col min-w-0 gap-y-1">
                <Link href={`/product/${item.product_handle}`}>
                    <h3 className="text-sm leading-tight line-clamp-2">{item.title}</h3>
                </Link>
                <div className="text-xs text-foreground-muted">
                    {item.variant && <span>Variant: {item.variant?.title}</span>}<br />
                    {/* {item.variant_sku && <span>SKU: {item.variant_sku}</span>}<br /> */}
                    <span>Qty: {item.quantity}</span>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center w-20">
                <div className="text-sm">
                    {convertToLocale({
                        amount: currentPrice,
                        currency_code: currency_code,
                    })}
                </div>
            </div>
        </div>
    )
}

type CheckoutLineItemProps = {
    item: StoreCartLineItem,
    currency_code: string
}