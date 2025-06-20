import { sdk } from "../sdk"
import type { FindParams, StoreProductCategoryListParams } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listParentCategories = async (query?: FindParams & StoreProductCategoryListParams) => {
    const nextOptions = await getCacheOptions("category")

    const limit = query?.limit || 100

    return sdk.store.category.list({
        ...query,
        parent_category_id: "null",
        limit,
    }, {
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
    const handle = `${categoryHandle.join("/")}`

    const nextOptions = await getCacheOptions("category");

    return sdk.store.category.list({
        fields: "*category_children, *products",
        handle
    }, {
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ product_categories }) => product_categories[0])
}