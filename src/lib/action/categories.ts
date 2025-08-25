import { sdk } from "@lib/sdk"
import type { FindParams, StoreProductCategoryListParams } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (query?: FindParams & StoreProductCategoryListParams) => {
    const nextOptions = await getCacheOptions("category")

    const limit = query?.limit || 100

    return sdk.store.category.list({
        fields: "*category_children, *products, *parent_category, *parent_category.parent_category",
        limit,
        ...query,
    }, {
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
    const handle = `${categoryHandle.join("/")}`

    const nextOptions = await getCacheOptions("category");

    return sdk.store.category.list({
        fields: "*parent_category.parent_category.id",
        handle
    }, {
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ product_categories }) => product_categories[0])
}