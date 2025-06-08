import { sdk } from "../sdk"
import { FindParams, SelectParams, StoreProductCategoryListParams } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCollection = async (query?: FindParams & StoreProductCategoryListParams) => {
    const next = await getCacheOptions("collection")

    const limit = query?.limit || 100

    return sdk.store.collection.list({
        ...query,
        limit,
    }, { next }).then(({ collections }) => collections)
}

export const fetchCollection = async (id: string, query?: SelectParams, cacheTag?: string) => {
    const next = await getCacheOptions(cacheTag ?? "collection")
    return sdk.store.collection.retrieve(id, query, { next }).then(({ collection }) => collection)
} 