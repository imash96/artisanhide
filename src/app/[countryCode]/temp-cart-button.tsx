"use client"

import Container from "@modules/common/create-section";
import { addToCart } from "libs/actions/cart";
import { LoaderCircle } from "lucide-react";
import { startTransition, useActionState } from "react";

export default function TempCart({ countryCode }: { countryCode: string }) {
    const selectedVariant = variantArray[Math.floor(Math.random() * variantArray.length)];
    const handleAddToCart = () => {
        const quantity = document.getElementById("#cart_qty") as HTMLInputElement
        startTransition(() => addToCart({
            variantId: selectedVariant,
            quantity: quantity.value ? Number(quantity.value) : 1,
            countryCode,
        }));
    }

    const [formState, formAction, isPending] = useActionState(handleAddToCart, null)

    return (
        <Container>
            <div className="flex mx-auto py-10">
                <form action={formAction} className="flex">
                    <input type="number" id="#cart_qty" className="w-fit border" />
                    <div className="flex justify-center items-center">
                        {isPending && <LoaderCircle className="animate-spin" />}
                        <button type="submit" className="px-4 py-3 border hover:bg-gray-200">Add to Cart</button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

const variantArray = [
    "variant_01JWJGFXHCE007QC0XJKZZZSW9",
    "variant_01JWJGFXHD9V0WN9RA830K4YR6",
    "variant_01JWJGFXHE88W5A149JBPGCQP9",
    "variant_01JWJGFXHF40GG14TWTBVV6NJY",
    "variant_01JWJGFXHFPGPG9CBX8ARWDQ09",
    "variant_01JWJGFXHG5EMQDQJBGRJQZQGJ",
    "variant_01JWJGFXHGG2HN7PCEKQVYAGZZ",
    "variant_01JWJGFXHHCYVHRXJ56P44RP40",
    "variant_01JWJGFXHHZGEW9N39VNG1ZK4Q",
    "variant_01JWJGFXHZ4KKTS5G495ZQCYVG",
    "variant_01JWJGFXHX7TW34NQ75Z15SR0F",
]