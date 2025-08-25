"use server"

import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { ClientHeaders } from "@medusajs/js-sdk"
import { sdk } from "@libs/sdk"
import { SelectParams, StoreCart, StoreInitializePaymentSession, StorePaymentCollectionResponse } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import medusaError from "@libs/util/medusa-error"

export const listCartPaymentMethods = async (regionId: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("payment_providers");

    return sdk.store.payment.listPaymentProviders({ region_id: regionId }, {
        ...headers,
        next: nextOptions,
        cache: "force-cache",
    }).then(({ payment_providers }) =>
        payment_providers.sort((a, b) => {
            return a.id > b.id ? 1 : -1
        })
    ).catch(() => { return null })
}

export async function initiatePaymentSession(cart: StoreCart, data: StoreInitializePaymentSession) {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return sdk.store.payment.initiatePaymentSession(cart, data, {}, headers).then(async (resp) => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)
        return resp
    }).catch(medusaError)
}


export async function initiatePaymentSessionCustom(cartId: string, paymentCollectionId: string | undefined, body: StoreInitializePaymentSession, query: SelectParams) {
    if (!paymentCollectionId) paymentCollectionId = await createPaymentCollection(cartId)
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    return sdk.client.fetch(`/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
        method: "POST",
        headers,
        body,
        query,
    });
}

export async function createPaymentCollection(cartId: string) {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    const { payment_collection } = await sdk.client.fetch<{ payment_collection: { id: string } }>(
        `/store/payment-collections`,
        {
            method: "POST",
            headers,
            body: { cart_id: cartId },
        }
    )
    return payment_collection.id
}