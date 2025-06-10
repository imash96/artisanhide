import type { StoreCart } from "@medusajs/types";
import { Minus, Plus, Trash } from "lucide-react";
import { useToggleStore } from "libs/store/use-toggle-drawer";
import Image from "next/image";
import { convertToLocale } from "libs/util/money";
import CartFooter from "./cart-footer";

export default function CartContent({ cart }: { cart: StoreCart }) {
    const { toggleCartDrawer } = useToggleStore()
    const sortedItems = cart?.items?.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());
    return (
        <>
            <ul className="flex-1 overflow-y-auto">
                {sortedItems?.map((item) => (
                    <li key={item.id} className="flex gap-2 group">
                        {/* Product Image */}
                        <div className="h-[70px] w-[65px] overflow-hidden">
                            <Image
                                src={item.thumbnail || "/svg/placeholder.svg"}
                                alt={"product image"}
                                sizes="70px"
                                className="h-full w-full object-cover"
                                height={65}
                                width={55}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-full my-auto space-y-2">
                            <button
                                // onClick={() => removeItem(item)}
                                className="text-[10px] underline underline-offset-1 pl-2 font-extralight float-right"
                            >
                                Remove
                            </button>
                            <h2 className="tracking-wide font-light text-[12px] leading-tight text-templateBrown">
                                {item.title}
                            </h2>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center border w-auto  px-2 py-0.5 bg-white">
                                    <div
                                        // onClick={() => updateQuantity(item, "decrement")}
                                        className="flex items-center cursor-pointer justify-center hover:text-templatePrimary"
                                    >
                                        {item.quantity <= 1 ? (
                                            <Trash size={14} strokeWidth={1.5} />
                                        ) : (
                                            <Minus size={14} strokeWidth={1.5} />
                                        )}
                                    </div>

                                    {/* Quantity Display */}
                                    <span className="w-10 text-center text-sm font-extralight h-full text-templateText">
                                        {item.quantity}
                                    </span>

                                    {/* Increment Button */}
                                    <div
                                        // onClick={() => updateQuantity(item, "increment")}
                                        className="flex cursor-pointer items-center justify-center"
                                    >
                                        <Plus size={14} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Product Prices */}
                                <div className="">
                                    <h2 className="text-templateBrown text-sm">
                                        {convertToLocale({
                                            amount: item.total,
                                            currency_code: cart.currency_code,
                                        })}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            <CartFooter cart={cart} />
        </>
    )
}