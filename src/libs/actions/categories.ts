import { sdk } from "../sdk"
import type { FindParams, StoreProductCategoryListParams } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listParentCategories = async (query?: FindParams & StoreProductCategoryListParams) => {
    const next = await getCacheOptions("category")

    const limit = query?.limit || 100

    return sdk.store.category.list({
        ...query,
        parent_category_id: "null",
        limit,
    }, { next }).then(({ product_categories }) => product_categories)
}