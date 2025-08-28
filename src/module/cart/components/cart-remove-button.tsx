"use client"

import { deleteLineItem } from "@lib/action/cart";
import { Loader, X } from "lucide-react";
import { useTransition } from "react";

export function CartRemoveButton({ itemId, className = '' }: CartRemoveButtonProps) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => deleteLineItem(itemId));

    return (
        <button
            aria-label="Remove cart item"
            type="button"
            onClick={handleClick}
            disabled={isPending}
            className={`group flex items-center justify-center rounded-full bg-background-muted border border-border transition-all duration-200 hover:bg-destructive hover:border-destructive active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 h-7 w-7 ${className}`}
        >
            {isPending ? <Loader className="w-4 h-4 text-foreground-muted animate-spin" /> : <X className="w-4 h-4 text-foreground-muted group-hover:text-destructive-foreground" />}
        </button>
    );
}

type CartRemoveButtonProps = {
    itemId: string,
    className?: string
}