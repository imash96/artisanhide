import { convertToLocale } from "@libs/util/money";
import { StoreCartLineItem } from "@medusajs/types";
import Image from "next/image";
import Link from "next/link";

export default function SummaryCartCard({ item, currency_code }: SummaryCartCardProps) {
    const adjustmentsSum = (item.adjustments || []).reduce((acc, adjustment) => adjustment.amount + acc, 0)
    const currentPrice = item.total - adjustmentsSum
    return (
        <div className="flex gap-2 py-2 text-brown">
            {/* Product Image */}
            <div className="relative w-16 h-20 overflow-hidden no-scrollbar rounded-xs border flex-shrink-0 bg-white">
                <Image
                    src={item.thumbnail || "/svg/placeholder.svg"}
                    alt={"product image"}
                    sizes="70px"
                    className="h-full w-full object-contain object-center"
                    height={65}
                    width={55}
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <Link href={`/product/${item.product_handle}`}>
                    <h3 className="text-sm leading-tight line-clamp-2">{item.title}</h3>
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                    {item.variant && <span>Size: {item.variant?.title}</span>}<br />
                    {item.variant_sku && <span>SKU: {item.variant_sku}</span>}<br />
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

type SummaryCartCardProps = {
    item: StoreCartLineItem,
    currency_code: string
}