"use server"

import { revalidateTag } from "next/cache"
import { getAuthHeaders, getCacheTag, getCartId } from "./cookies"
import { getRegion } from "./region"
import { redirect } from "next/navigation"
import { StoreUpdateCart } from "@medusajs/types"
import { sdk } from "libs/sdk"
import medusaError from "libs/util/medusa-error"


export async function updateRegion(countryCode: string, currentPath: string) {
    const cartId = await getCartId()
    const region = await getRegion(countryCode)

    if (!region) {
        throw new Error(`Region not found for country code: ${countryCode}`)
    }

    if (cartId) {
        await updateCart({ region_id: region.id })
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)
    }

    const regionCacheTag = await getCacheTag("regions")
    revalidateTag(regionCacheTag)

    const productsCacheTag = await getCacheTag("products")
    revalidateTag(productsCacheTag)

    redirect(`/${countryCode}${currentPath}`)
}

export async function updateCart(data: StoreUpdateCart) {
    const cartId = await getCartId()

    if (!cartId) {
        throw new Error("No existing cart found, please create one before updating")
    }

    const headers = {
        ...(await getAuthHeaders()),
    }

    return sdk.store.cart
        .update(cartId, data, {}, headers)
        .then(async ({ cart }) => {
            const cartCacheTag = await getCacheTag("carts")
            revalidateTag(cartCacheTag)
            return cart
        })
        .catch(medusaError)
}