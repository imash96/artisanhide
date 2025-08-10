"use client";

import { startTransition, useActionState } from "react";
import CustomButton from "@modules/common/custom-button";
import Container from "@modules/common/create-section";
import { addToCart } from "libs/actions/cart";
import { addToWishlist, deleteItemWishlist } from "@libs/actions/wishlist";
import CustomInput from "@modules/common/custom-input";
import { LoaderCircle } from "lucide-react";

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
    const [stateCart, formActionCart, isPendingCart] = useActionState(handleAddToCart, null);

    return (
        <Container>
            <div className="flex flex-col gap-y-4 mx-auto py-10 max-w-md">
                <form action={formActionCart} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <CustomButton
                            type="submit"
                            isLoading={isPending}
                            ripple
                            className="shrink-0"
                        >
                            {isPendingCart && <LoaderCircle className="w-4 h-4 text-gray-600" />} Add to Cart
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
    "variant_01K29Z84V08P2W2SCZ06VG9495",
    "variant_01K29Z84V2SHMSKSSSKRFZMNQN",
    "variant_01K29Z84V4HJ7X8393FBSQY9RA",
    "variant_01K29Z84V6PD5PH927KPHSVRY9",
    "variant_01K29Z84V8M48CPEDR40THX6WZ",
    "variant_01K29Z84VAEJEJS4F138K1T5QG",
    "variant_01K29Z84VCAZZ6B94GTM15RE3G",
    "variant_01K29Z84VD4BKEQSHR2BT3WFJ1",
    "variant_01K29Z84VFQ064P8BQTF715WX6",
    "variant_01K29Z84VHGTAK6JZZHQ09H870",
    "variant_01K29Z84VJ9BX1JY4GHXXZT9SN",
    "variant_01K29Z84VKANY1G8RBE0DTN0KA",
    "variant_01K29Z84VMDF24TXXH8ZJ4BYSM",
    "variant_01K29Z84VNJYR6EJ543D49X6D2",
    "variant_01K29Z84VR0RR26CRQ47MEVFEF",
    "variant_01K29Z84WWVZ3VM4M7Q9HV8S95"
];