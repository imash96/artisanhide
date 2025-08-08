"use client"

import CustomButton from "@modules/common/custom-button";
import Container from "@modules/common/create-section";
import Input from "@modules/common/custom-input";
import { addToCart } from "libs/actions/cart";
import { startTransition, useActionState } from "react";

export default function TempCart({ countryCode }: { countryCode: string }) {

    const handleAddToCart = () => {
        const quantity = document.getElementById("#cart_qty") as HTMLInputElement
        const selectedVariant = variantArray[Math.floor(Math.random() * variantArray.length)];
        console.log(selectedVariant)
        startTransition(() => addToCart({
            variantId: selectedVariant,
            quantity: quantity.value ? Number(quantity.value) : 1,
            countryCode,
        }));
    }

    const [state, formAction, isPending] = useActionState(handleAddToCart, null)

    return (
        <Container>
            <div className="flex flex-col gap-y-2 mx-auto py-10 max-w-md">
                <form action={formAction} className="w-full">
                    <div className="relative flex mx-auto">
                        <Input label="Quantity" type="number" id="#cart_qty" className="w-full" />

                        <CustomButton type="submit" isLoading={isPending} ripple>
                            Add to Cart
                        </CustomButton>
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
    "variant_01JXQ9RHWXTGFTKR1SGRG01K88",
    "variant_01JXQ9RHVWAM52K60CYW4XAMJM",
    "variant_01JXQ9RHWXTZ5EEKJMDAAMVKBA",
    "variant_01JXQ9RHVZP4AR3TNM3YSBN3F1",
    "variant_01JXQ9RHVZB8WHSG0PD2EA2GDR"
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