"use server"

import type { FindParams, StoreProduct, StoreProductParams } from "@medusajs/types"
import type { SortOptions } from "@/type/common"
import { sortProducts } from "@lib/util/sort-products"
import { sdk } from "@lib/sdk"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./region"

export async function listProducts({ pageParam = 1, queryParams, countryCode, regionId, }: ListProductsProps): Promise<ListProductsResp> {
    if (!countryCode && !regionId) throw new Error("Country code or region ID is required");

    const region = countryCode ? getRegion(countryCode) : retrieveRegion(regionId!);

    if (!region) return {
        response: { products: [], count: 0 },
        nextPage: null,
    };

    const limit = queryParams?.limit ?? 12;
    const offset = (Math.max(pageParam, 1) - 1) * limit;

    try {
        const headers = await getAuthHeaders();
        const nextOptions = await getCacheOptions("products");

        const { products, count, } = await sdk.store.product.list({
            limit, offset, region_id: region.id,
            fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
            ...queryParams,
        }, {
            ...headers,
            next: nextOptions,
            cache: "force-cache",
        })

        const hasMore = count > offset + limit;

        return {
            response: { products, count },
            nextPage: hasMore ? pageParam + 1 : null,
            queryParams,
        };
    } catch (err) {
        console.error("listProducts error:", err);
        throw err;
    }
}


export async function listProductsWithSort({ page = 1, queryParams, sortBy = "created_at", countryCode }: ListProductsWithSortProps): Promise<ListProductsWithSortResp> {
    const limit = queryParams?.limit ?? 12;

    const { response: { products, count }, nextPage } = await listProducts({
        pageParam: 1,
        queryParams: {
            ...queryParams,
            limit: 100,
            fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
        },
        countryCode,
    });

    const sortedProducts = sortProducts(products, sortBy);

    const offset = (page - 1) * limit;
    const paginatedProducts = sortedProducts.slice(offset, offset + limit);
    const hasMore = count > offset + limit;

    return {
        response: { products: paginatedProducts, count },
        nextPage,
        hasMore,
        queryParams,
    };
}

export type ListProductsProps = {
    pageParam?: number;
    queryParams?: FindParams & StoreProductParams;
    countryCode?: string;
    regionId?: string;
}

type ListProductsResp = {
    response: { products: StoreProduct[]; count: number };
    nextPage: number | null;
    queryParams?: FindParams & StoreProductParams;
}

type ListProductsWithSortProps = {
    page?: number;
    queryParams?: FindParams & StoreProductParams;
    sortBy?: SortOptions;
    countryCode: string;
}

type ListProductsWithSortResp = {
    response: { products: StoreProduct[]; count: number };
    nextPage: number | null;
    hasMore: boolean;
    queryParams?: FindParams & StoreProductParams;
}