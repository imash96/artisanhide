import { sdk } from "../sdk"
import { FindParams, StoreProductCategoryListParams } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCollection = async (query?: FindParams & StoreProductCategoryListParams) => {
    const next = await getCacheOptions("collection")

    const limit = query?.limit || 100

    return sdk.store.collection.list({
        ...query,
        limit,
    }, { next }).then(({ collections }) => collections)
}