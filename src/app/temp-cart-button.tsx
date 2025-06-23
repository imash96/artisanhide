"use client"

import { Button } from "@modules/common/button";
import Container from "@modules/common/create-section";
import Input from "@modules/common/input";
import Select from "@modules/common/select";
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
                <form action={formAction} className="w-full">
                    <div className="relative max-w-md mx-auto">
                        <Input label="Quantity" type="number" id="#cart_qty" className="w-full" />

                        <Button type="submit" className="absolute top-0 right-0">
                            {isPending && <LoaderCircle className="animate-spin" />} Add to Cart
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

const variantArray = [
    "variant_01JXQ9RHVNDAE88EE7562KB5RF",
    "variant_01JXQ9RHVP0AHC2N91502Q2889",
    "variant_01JXQ9RHVP3Q4EEPNF1J31G4D5",
    "variant_01JXQ9RHVQ11JFAGMMT43GWFNX",
    "variant_01JWJGFXHFPGPG9CBX8ARWDQ09",
    "variant_01JXQ9RHVSJM3XSBNKA205EKTG",
    "variant_01JWJGFXHGG2HN7PCEKQVYAGZZ",
    "variant_01JXQ9RHVSWMWV4PPZXG6F6P9P",
    "variant_01JXQ9RHVTHKYKCECEFC7SB3VJ",
    "variant_01JXQ9RHVVV4YTFWKFGQ79TN62",
    "variant_01JXQ9RHVWAM52K60CYW4XAMJM",
]

const options = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "voiled", label: "Voilet" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "brown", label: "Brown" },
]