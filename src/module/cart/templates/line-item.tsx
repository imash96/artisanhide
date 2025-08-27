"use client"

import { deleteLineItem, updateLineItem } from "@lib/action/cart";
import { convertToLocale } from "@lib/util/money";
import { StoreCartLineItem, StoreProductVariant } from "@medusajs/types";
import ProductThumbnail from "@module/product/components/product-thumbnail";
import { Loader, MinusIcon, PlusIcon, X } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

export default function CartLineitem({ items, currencyCode }: { items: StoreCartLineItem[], currencyCode: string }) {
    return (
        <ul role="list" className="space-y-4">
            {items.map(item => (
                <li key={item.id} className="flex gap-3 md:gap-4 p-4 border border-border">
                    <CartThumbnail thumbnail={item.thumbnail} title={item.title} id={item.id} />
                    <div className="flex gap-2 w-full justify-between flex-1">
                        <div className="flex flex-col justify-between gap-y-1 w-full md:gap-y-2">
                            <h3 className="text-sm">
                                <Link href={`/products/${item.product?.handle}`} className="font-medium text-gray-700 hover:text-gray-800 truncate line-clamp-2 whitespace-normal">
                                    {item.product?.title}
                                </Link>
                            </h3>
                            <LineItemOptions variant={item.variant} quantity={item.quantity} />
                            {/* {customer ? item.variant_title === 'One Size' && <MeasurementSelect customer={customer} /> : item.variant_title === 'One Size' && <span className="text-amber-500">Login to add or select measurements</span>} */}
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <LineItemPrice currencyCode={currencyCode} item={item} />
                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-blue-400 bg-gray-100">
                                <CartEditQuantity lineId={item.id} quantity={item.quantity} type="minus" />
                                <p className="w-6 text-center">
                                    <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                <CartEditQuantity lineId={item.id} quantity={item.quantity} type="plus" />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

type CartThumbnailProps = {
    thumbnail: string | undefined
    title: string
    id: string
}

export function CartThumbnail({ thumbnail, title, id }: CartThumbnailProps) {
    return (
        <div className="relative w-24 xs:w-20">
            <ProductThumbnail src={thumbnail} alt={title} width={300} height={400} />
            <CartRemoveButton
                itemId={id}
                size='default'
                className="absolute -top-2 -right-2"
            />
        </div>
    )
}

type CartRemoveButtonProps = {
    itemId: string,
    className?: string
    size: 'default' | 'cart'
}

export function CartRemoveButton({ itemId, className = '', size = 'default' }: CartRemoveButtonProps) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => deleteLineItem(itemId));
    return (
        <button aria-label="Remove cart item" type="button" onClick={handleClick} disabled={isPending} className={`group flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 transition-colors duration-200 hover:bg-red-100 active:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 ${size === 'default' ? 'h-6 w-6' : 'h-5 w-5'} ${className}`}>
            {isPending ? <Loader className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-gray-600 group-hover:text-red-800" />}
        </button >
    )
}

type LineItemOptionsProps = { variant?: StoreProductVariant, quantity?: number }

const LineItemOptions = ({ variant, quantity }: LineItemOptionsProps) => {
    return (
        <span className="inline-block text-sm text-gray-800 w-full overflow-clip text-ellipsis">
            {variant?.title ?? "No title"}
        </span>
    )
}

type LineItemPriceProps = {
    item: Omit<StoreCartLineItem, "beforeInsert">
    currencyCode: string
    style?: "default" | "cart"
}

const LineItemPrice = ({ item, currencyCode, style = "default" }: LineItemPriceProps) => {
    const { total, original_total } = item

    const adjustmentsSum = (item.adjustments || []).reduce(
        (acc, adjustment) => adjustment.amount + acc,
        0
    )

    const originalPrice = original_total
    const currentPrice = total - adjustmentsSum
    const hasReducedPrice = currentPrice < originalPrice

    return (
        <div className="flex flex-col gap-x-2 text-gray-800 items-end">
            <div className="text-left">
                {hasReducedPrice && (
                    <div className="flex">
                        <span className="line-through text-red-200">
                            {convertToLocale({
                                amount: originalPrice,
                                currency_code: currencyCode,
                            })}
                        </span>
                    </div>
                )}
                <span className={`text-sm leading-6 font-normal ${hasReducedPrice ? 'text-red-800' : ''}`}>
                    {convertToLocale({
                        amount: currentPrice,
                        currency_code: currencyCode,
                    })}
                </span>
            </div>
        </div >
    )
}

type CartEditQuantityProps = {
    lineId: string;
    quantity: number;
    type: 'plus' | 'minus';
};

export function CartEditQuantity({ lineId, quantity, type }: CartEditQuantityProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            updateLineItem(lineId, quantity = type === 'plus' ? quantity + 1 : quantity - 1);
        });
    };

    const label = type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity';
    const Icon = type === 'plus' ? PlusIcon : MinusIcon;

    return (
        <button
            aria-label={label}
            disabled={isPending}
            onClick={handleClick}
            className={`group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 ${type === 'minus' ? 'ml-auto' : ''}`}>
            {isPending ? (
                <Loader className="w-5 h-5 text-gray-600" />
            ) : (
                <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            )}
        </button>
    );
}

