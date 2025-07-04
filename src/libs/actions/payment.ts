"use server"

import { getAuthHeaders, getCacheOptions } from "./cookies"
import { ClientHeaders } from "@medusajs/js-sdk"
import { sdk } from "@libs/sdk"

export const listCartPaymentMethods = async (regionId: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("payment_providers");

    return sdk.store.payment.listPaymentProviders({
        region_id: regionId
    }, {
        ...headers,
        next: nextOptions,
        cache: "force-cache",
    }).then(({ payment_providers }) =>
        payment_providers.sort((a, b) => {
            return a.id > b.id ? 1 : -1
        })
    ).catch(() => { return null })
}