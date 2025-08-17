"use server"

import { FindParams, StoreProduct, StoreProductParams, StoreRegion } from "@medusajs/types"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { sdk } from "@libs/sdk"
import { SortOptions } from "@/types/common"
import { getRegion, retrieveRegion } from "./region"
import { ClientHeaders } from "@medusajs/js-sdk"
import { sortProducts } from "@libs/util/sort-products"
import type { StoreProductListParams } from "@medusajs/types"

export const listProducts = async ({ pageParam = 1, queryParams, countryCode, regionId }: ListProductsProps): Promise<ListProductsResp> => {
    if (!countryCode && !regionId) throw new Error("Country code or region ID is required")

    const limit = queryParams?.limit || 12
    const _pageParam = Math.max(pageParam, 1)
    const offset = (_pageParam === 1) ? 0 : (_pageParam - 1) * limit;

    let region: StoreRegion | undefined | null

    if (countryCode) {
        region = await getRegion(countryCode)
    } else {
        region = await retrieveRegion(regionId!)
    }

    if (!region) {
        return {
            response: { products: [], count: 0 },
            nextPage: null,
        }
    }

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    const nextOptions = await getCacheOptions("products");

    return sdk.store.product.list({
        limit,
        offset,
        region_id: region?.id,
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags,+categories.*",
        ...queryParams,
    }, {
        ...headers,
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ products, count }) => {
        const nextPage = count > offset + limit ? pageParam + 1 : null

        return {
            response: {
                products,
                count,
            },
            nextPage: nextPage,
            queryParams,
        }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({ page = 0, queryParams, sortBy = "created_at", countryCode }: ListProductsWithSortProps): Promise<ListProductsWithSortResp> => {
    const limit = queryParams?.limit || 12

    const { response: { products, count } } = await listProducts({
        pageParam: 0,
        queryParams: {
            ...queryParams,
            limit: 100,
        },
        countryCode,
    })

    const sortedProducts = sortProducts(products, sortBy)

    const pageParam = (page - 1) * limit

    const nextPage = count > pageParam + limit ? pageParam + limit : null

    const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

    return {
        response: {
            products: paginatedProducts,
            count,
        },
        nextPage,
        queryParams,
    }
}

export const fetchProductByCollection = async (query?: StoreProductListParams, cacheTag?: string) => {
    const next = await getCacheOptions(cacheTag ?? "prod_collection")
    return sdk.store.product.list(query, { next }).then(({ products }) => products)
}

type ListProductsProps = {
    pageParam?: number
    queryParams?: FindParams & StoreProductListParams
    countryCode?: string
    regionId?: string
}

type ListProductsResp = {
    response: { products: StoreProduct[]; count: number }
    nextPage: number | null
    queryParams?: FindParams & StoreProductParams
}

type ListProductsWithSortProps = {
    page?: number
    queryParams?: FindParams & StoreProductParams
    sortBy?: SortOptions
    countryCode: string
}

type ListProductsWithSortResp = {
    response: { products: StoreProduct[]; count: number }
    nextPage: number | null
    queryParams?: FindParams & StoreProductParams
}