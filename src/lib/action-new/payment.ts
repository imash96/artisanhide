"use server"

import { sdk } from "@lib/sdk"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import medusaError from "@lib/util/medusa-error"
import { SelectParams, StoreInitializePaymentSession, HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"


export const listCartPaymentMethods = async (region_id: string) => {
    try {
        const headers = await getAuthHeaders()
        const nextOptions = await getCacheOptions("payment_providers")

        const { payment_providers } = await sdk.store.payment.listPaymentProviders({ region_id }, {
            ...headers,
            next: nextOptions,
            cache: "force-cache",
        })

        return payment_providers.sort((a, b) => a.id.localeCompare(b.id))
    } catch (err) {
        return medusaError(err)
    }
}

/**
 * Initialize a custom payment session for a cart
 */
export async function initiatePaymentSessionCustom(cartId: string, paymentCollectionId: string | undefined, body: StoreInitializePaymentSession, query: SelectParams) {
    try {
        if (!paymentCollectionId) paymentCollectionId = await createPaymentCollection(cartId)

        const headers = await getAuthHeaders()

        const resp = await sdk.client.fetch(`/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
            method: "POST",
            headers,
            body,
            query,
        })

        revalidateTag(await getCacheTag("carts"))
        return resp
    } catch (err) {
        return medusaError(err)
    }
}

/**
 * Create a payment collection for a cart
 */
export async function createPaymentCollection(cartId: string) {
    const headers = await getAuthHeaders()

    const { payment_collection } = await sdk.client.fetch<{ payment_collection: { id: string } }>(`/store/payment-collections`, {
        method: "POST",
        headers,
        body: { cart_id: cartId },
    })

    return payment_collection.id
}
