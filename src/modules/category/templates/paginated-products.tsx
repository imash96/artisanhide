import { SortOptions } from "@/types/common"
import { listProductsWithSort } from "@libs/actions/products"
import { getRegion } from "@libs/actions/region"
import ProductCard from "@modules/home/components/product-card"
import { Pagination } from "../components/pagination"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
    limit: number
    collection_id?: string[]
    category_id?: string[]
    id?: string[]
    order?: string
}

type PaginatedProductsProps = {
    sortBy?: SortOptions
    page: number
    collectionId?: string
    categoryId?: string
    productsIds?: string[]
    countryCode: string
}

export default async function PaginatedProducts({ sortBy, page, collectionId, categoryId, productsIds, countryCode, }: PaginatedProductsProps) {
    const queryParams: PaginatedProductsParams = {
        limit: 24,
    }

    if (collectionId) {
        queryParams["collection_id"] = [collectionId]
    }

    if (categoryId) {
        queryParams["category_id"] = [categoryId]
    }

    if (productsIds) {
        queryParams["id"] = productsIds
    }

    if (sortBy === "created_at") {
        queryParams["order"] = "created_at"
    }

    const region = await getRegion(countryCode)

    console.log(queryParams, region, countryCode)
    if (!region) return null


    let { response: { products, count } } = await listProductsWithSort({
        page,
        queryParams,
        sortBy,
        countryCode,
    })

    const totalPages = Math.ceil(count / PRODUCT_LIMIT)

    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {products.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    data-testid="product-pagination"
                    page={page}
                    totalPages={totalPages}
                />
            )}
        </>
    )
}