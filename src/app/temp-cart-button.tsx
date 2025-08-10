"use client";

import { startTransition, useActionState } from "react";
import CustomButton from "@modules/common/custom-button";
import Container from "@modules/common/create-section";
import { addToCart } from "libs/actions/cart";
import { addToWishlist, deleteItemWishlist } from "@libs/actions/wishlist";
import CustomInput from "@modules/common/custom-input";

export default function TempCart({ countryCode }: { countryCode: string }) {

    const handleAddToCart = () => {
        const selectedVariant =
            variantArray[Math.floor(Math.random() * variantArray.length)];
        startTransition(() =>
            addToCart({
                variantId: selectedVariant,
                quantity: 1,
                countryCode,
            })
        );
    };

    async function addWishlistItem(formData: FormData) {
        const selectedProd = prodArray[Math.floor(Math.random() * prodArray.length)];
        await addToWishlist(selectedProd)
    }

    async function deleteWishlistItem(_: any, formData: FormData) {
        const product_id = formData.get("product_id") as string
        if (!product_id) return console.error("Product id not found")
        await deleteItemWishlist(product_id)
    }

    const [state, formAction, isPending] = useActionState(deleteWishlistItem, null);

    return (
        <Container>
            <div className="flex flex-col gap-y-4 mx-auto py-10 max-w-md">
                <form action={handleAddToCart} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <CustomButton
                            type="submit"
                            isLoading={isPending}
                            ripple
                            className="shrink-0"
                        >
                            Add to Cart
                        </CustomButton>
                    </div>
                </form>
                <form action={addWishlistItem} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <CustomButton
                            type="submit"
                            isLoading={isPending}
                            ripple
                            className="shrink-0"
                        >
                            Add to Wishlist
                        </CustomButton>
                    </div>
                </form>

                <form action={formAction} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <CustomInput label="Product Id" type="text" name="product_id" />
                        <CustomButton
                            type="submit"
                            isLoading={isPending}
                            ripple
                            className="shrink-0"
                        >
                            Add to Wishlist
                        </CustomButton>
                    </div>
                </form>
            </div>
        </Container>
    );
}

const prodArray = [
    "prod_01J2PJ7EBKPV209PS1S72ZRFEP",
    "prod_01J2PJ7P351054PTMD8MMYTT09",
    "prod_01J2V1QFR4BFAEJYPSDRQR273V",
    "prod_01J2V1QFRVBD5QJ933E4T4XK3Q",
    "prod_01J2V1QFSEG6C45E0T411Q3PFM",
    "prod_01J2V1QFT1SYQ15T7SNMDF57EF",
    "prod_01J2V1QFTSN0ARWQQZCDFGRCKY",
    "prod_01J2V1QFV59421BP8EDN17HCNK",
    "prod_01J2V1QFVAV812B10WET654E9K"
]

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
    "variant_01JXQ9RHVZB8WHSG0PD2EA2GDR",
];
