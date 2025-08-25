"use server"

import { ClientHeaders } from "@medusajs/js-sdk";
import { getAuthHeaders } from "./cookies";
import { sdk } from "@lib/sdk";

export const addToWishlist = async (id: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    return await sdk.client.fetch(`/store/customers/wishlists`, {
        method: "POST",
        body: { product_id: id },
        headers,
    }).then(async () => {
        return { success: true, error: null, id }
    }).catch((err) => {
        return { success: false, error: err.toString(), id }
    })
}

export const deleteItemWishlist = async (id: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    return await sdk.client.fetch(`/store/customers/wishlists`, {
        method: "DELETE",
        body: { product_id: id },
        headers,
    }).then(async () => {
        return { success: true, error: null, id }
    }).catch((err) => {
        return { success: false, error: err.toString(), id }
    })
}