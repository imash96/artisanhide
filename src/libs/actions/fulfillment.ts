"use server"

import { getAuthHeaders, getCacheOptions } from "./cookies"
import { sdk } from "@libs/sdk"
import { ClientHeaders } from "@medusajs/js-sdk"

export const listCartShippingMethods = async (cartId: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("fulfillment");

    return sdk.store.fulfillment.listCartOptions({
        cart_id: cartId,
        fields: "+service_zone.fulfllment_set.type,*service_zone.fulfillment_set.location.address",
    }, {
        ...headers,
        next: nextOptions,
        cache: "force-cache",
    }).then(({ shipping_options }) => shipping_options).catch(() => { return null })
}

export const calculatePriceForShippingOption = async (optionId: string, cartId: string, data?: Record<string, unknown>) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("fulfillment");

    const body = {
        cart_id: cartId,
        data: data ? data : undefined
    }

    return sdk.store.fulfillment.calculate(optionId, body, {}, {
        ...headers,
        next: nextOptions
    }).then(({ shipping_option }) => shipping_option).catch((e) => { return null })

}