"use server"

import { sdk } from "@libs/sdk"
import { revalidateTag } from "next/cache"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { ClientHeaders } from "@medusajs/js-sdk"
import { Gender, StoreUpdateMeasurementDTO } from "@/types/measurement"

export const retrieveMeasurement = async (id: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("measurement")

    return await sdk.store.measurement.retrive(id, {
        ...headers,
        next: nextOptions,
    }).then(({ measurements }) => measurements)
        .catch(() => null)

    // return await sdk.client
    //     .fetch<{ measurement: StoreMeasurement }>(`/store/customers/measurements`, {
    //         method: "GET",
    //         headers,
    //         next: nextOptions ? nextOptions : undefined,
    //         cache: "force-cache",
    //     })
    //     .then(({ measurement }) => measurement)
    //     .catch(() => null)
}

export const createMeasurement = async (currentState: Record<string, unknown>, formData: FormData): Promise<any> => {

    const data = {
        type: formData.get("type") as string,
        name: formData.get("name") as string,
        gender: formData.get("gender") as Gender,
    }

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return await sdk.store.measurement.create(data, {
        ...headers,
    }).then(async () => {
        const customerCacheTag = await getCacheTag("customers")
        revalidateTag(customerCacheTag)
        return { success: true, error: null }
    }).catch((err) => {
        return { success: false, error: err.toString() }
    })
}

export const updateMeasurement = async (id: string, data: StoreUpdateMeasurementDTO): Promise<any> => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };


    return await sdk.store.measurement.update(id, data, {
        ...headers,
    }).then(async () => {
        const customerCacheTag = await getCacheTag("customers")
        revalidateTag(customerCacheTag)
        return { success: true, error: null, id }
    }).catch((err) => {
        return { success: false, error: err.toString(), id }
    })
}

export const deleteCustomerMeasurement = async (id: string) => {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return await sdk.store.measurement.delete(id, {
        ...headers,
    }).then(async () => {
        const customerCacheTag = await getCacheTag("customers")
        revalidateTag(customerCacheTag)
    }).catch((err) => {
        console.log(err)
    })
}