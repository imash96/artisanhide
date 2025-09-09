import { sdk } from "@lib/sdk"
import type { FindParams, SelectParams, StoreCollectionFilters } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCollection = async (query?: FindParams & StoreCollectionFilters) => {
    const nextOptions = await getCacheOptions("collection");

    const limit = query?.limit || 100

    return sdk.store.collection.list({
        ...query,
        limit,
    }, {
        next: nextOptions,
        caches: "force-cache"
    }).then(({ collections }) => collections)
}

export const fetchCollection = async (id: string, query?: SelectParams, cacheTag?: string) => {
    const next = await getCacheOptions(cacheTag ?? "collection")
    return sdk.store.collection.retrieve(id, query, { next }).then(({ collection }) => collection)
} 