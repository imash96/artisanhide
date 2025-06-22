"use client"

import type { StoreCart } from "@medusajs/types";
import { LoaderCircle, Minus, Plus, Trash } from "lucide-react";
import { motion } from "motion/react"
import Image from "next/image";
import { convertToLocale } from "libs/util/money";
import CartFooter from "./cart-footer";
import { deleteLineItem, updateLineItem } from "@libs/actions/cart";
import { useTransition } from "react";

export default function CartContent({ cart }: { cart: StoreCart }) {
    const sortedItems = cart?.items?.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());
    return (
        <>
            <div className="flex-1 overflow-y-auto px-4">
                <ul className="divide-y-1 py-2">
                    {sortedItems?.map((item, index) => {
                        const adjustmentsSum = (item.adjustments || []).reduce((acc, adjustment) => adjustment.amount + acc, 0)
                        const currentPrice = item.total - adjustmentsSum
                        return (
                            <motion.li
                                key={item.id}
                                className="flex gap-2 py-2"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index + 1 * 0.1, type: "spring", damping: 25, stiffness: 200, }}
                            >
                                {/* Product Image */}
                                <div className="relative w-16 h-20 overflow-hidden no-scrollbar rounded-sm border flex-shrink-0 bg-white">
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
                                    <h3 className="font-medium text-sm leading-tight line-clamp-2">{item.title}</h3>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {item.variant && <span>Size: {item.variant?.title}</span>}<br />
                                        {item.variant_sku && <span>SKU: {item.variant_sku}</span>}<br />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-center w-20">
                                    <div className="text-sm font-bold">
                                        {convertToLocale({
                                            amount: currentPrice,
                                            currency_code: cart.currency_code,
                                        })}
                                    </div>
                                    <RemoveButton itemId={item.id} />
                                    <div className="flex items-center border rounded-md bg-gray-50">
                                        <QuntityButton itemId={item.id} quantity={item.quantity - 1}>
                                            <Minus className="w-3 h-3" />
                                        </QuntityButton>
                                        <span className="px-2 py-1 text-xs font-medium min-w-[24px] text-center">
                                            {item.quantity}
                                        </span>
                                        <QuntityButton itemId={item.id} quantity={item.quantity + 1}>
                                            <Plus className="w-3 h-3" />
                                        </QuntityButton>
                                    </div>
                                </div>
                            </motion.li>
                        )
                    })}
                </ul>
            </div>
            <hr />
            <CartFooter cart={cart} />
        </>
    )
}

function QuntityButton({ itemId, quantity, children }: { itemId: string, quantity: number } & React.PropsWithChildren) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => updateLineItem(itemId, quantity));

    return (
        <button onClick={handleClick} className="p-1 hover:bg-gray-200 transition-colors rounded-r-md">
            {isPending ? <LoaderCircle className="w-3 h-3 animate-spin" /> : children}
        </button>
    )
}

function RemoveButton({ itemId }: { itemId: string }) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => deleteLineItem(itemId));
    return (
        <button className="text-xs flex items-center gap-1 font-extralight" onClick={handleClick}>
            {isPending ? <LoaderCircle width={12} className="animate-spin" /> : <Trash width={12} />} Remove
        </button>
    )
}