import { deleteLineItem } from "libs/actions/cart";
import { LoaderCircle, X } from "lucide-react";
import { useTransition } from 'react'

type CartRemoveButtonProps = {
    itemId: string,
    className?: string
    size: 'default' | 'cart'
}

export default function CartRemoveButton({ itemId, className = '', size = 'default' }: CartRemoveButtonProps) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => deleteLineItem(itemId));
    return (
        <button aria-label="Remove cart item" type="button" onClick={handleClick} disabled={isPending} className={`group flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 transition-colors duration-200 hover:bg-red-100 active:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 ${size === 'default' ? 'h-6 w-6' : 'h-5 w-5'} ${className}`}>
            {isPending ? <LoaderCircle className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-gray-600 group-hover:text-red-800" />}
        </button >
    )
}