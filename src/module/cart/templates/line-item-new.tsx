import { StoreCartLineItem } from "@medusajs/types";
import ProductThumbnail from "@module/product/components/product-thumbnail";
import Link from "next/link";
import LineItemPrice from "../components/lineitem-price";
import CartEditQuantity from "../components/quantity-button";

export default function CartLineitem({ items, currencyCode }: { items: StoreCartLineItem[], currencyCode: string }) {
    return (
        <ul role="list" className="space-y-4">
            {items.map(item => (
                <li key={item.id} className="flex gap-2 bg-background-muted p-4 border border-border rounded-lg">
                    <div className="relative w-24 flex-shrink-0">
                        <ProductThumbnail src={item.thumbnail} alt={item.title} width={300} height={400} />
                    </div>
                    <div className="space-y-1 md:space-y-1.5 w-full">
                        <div className="flex flex-col gap-x-2 md:flex-row md:justify-between">
                            <h2 className="text-sm leading-snug font-medium">
                                <Link href={`/products/${item.product?.handle || ''}`} className="hover:text-link transition-colors line-clamp-2 max-w-[35ch]">
                                    {item.product?.title}
                                </Link>
                            </h2>

                            <LineItemPrice item={item} currencyCode={currencyCode} />
                        </div>
                        <div className="flex flex-col gap-x-2 md:flex-row md:justify-between">
                            <div className="text-sm text-foreground-muted truncate">
                                <p><strong>Variant: </strong>{item.variant?.title ?? "Standard"}</p>
                                <p><strong>Type: </strong>{item.product_type ?? "Standard"}</p>
                            </div>
                            <CartEditQuantity lineId={item.id} quantity={item.quantity} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}