"use server"

import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { sdk } from "@lib/sdk"
import { StoreOrder, StoreOrderListResponse, StoreOrderResponse } from "@medusajs/types"
import { ClientHeaders } from "@medusajs/js-sdk"

export const retrieveOrder = async (id: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("orders")

    return sdk.store.order.retrieve(id, {
        fields: "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product,*fulfillments.shipping_option",
    }, {
        ...headers,
        next: nextOptions,
        cache: "force-cache",
    }).then(({ order }) => order).catch((err) => medusaError(err))
}

export const listOrders = async (
    limit: number = 10,
    offset: number = 0,
    filters?: Record<string, any>
) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    const nextOptions = await getCacheOptions("orders")

    return sdk.store.order.list({
        limit,
        offset,
        order: "-created_at",
        fields: "*items,+items.metadata,*items.variant,*items.product",
        ...filters,
    }, {
        ...headers,
        next: nextOptions,
        cache: "force-cache",
    }).then(({ orders }) => orders).catch((err) => medusaError(err))
}

export const createTransferRequest = async (
    state: {
        success: boolean
        error: string | null
        order: StoreOrder | null
    },
    formData: FormData
): Promise<{
    success: boolean
    error: string | null
    order: StoreOrder | null
}> => {
    const id = formData.get("order_id") as string

    if (!id) {
        return { success: false, error: "Order ID is required", order: null }
    }

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return await sdk.store.order
        .requestTransfer(
            id,
            {},
            {
                fields: "id, email",
            },
            headers
        )
        .then(({ order }) => ({ success: true, error: null, order }))
        .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const acceptTransferRequest = async (id: string, token: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return await sdk.store.order
        .acceptTransfer(id, { token }, {}, headers)
        .then(({ order }) => ({ success: true, error: null, order }))
        .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const declineTransferRequest = async (id: string, token: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return await sdk.store.order
        .declineTransfer(id, { token }, {}, headers)
        .then(({ order }) => ({ success: true, error: null, order }))
        .catch((err) => ({ success: false, error: err.message, order: null }))
}