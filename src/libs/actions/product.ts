import type { StoreProductListParams } from "@medusajs/types"
import { sdk } from "libs/sdk"
import { getCacheOptions } from "./cookies"


export const fetchProductByCollection = async (query?: StoreProductListParams, cacheTag?: string) => {
    const next = await getCacheOptions(cacheTag ?? "prod_collection")
    return sdk.store.product.list(query, { next }).then(({ products }) => products)
}