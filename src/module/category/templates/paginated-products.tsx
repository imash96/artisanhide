import { SortOptions } from "@/type/common"
import { listProductsWithSort } from "@lib/action/product"
import { getRegion } from "@lib/action/region"
import { Pagination } from "../components/pagination"
import ProductCard from "@module/common/product-card"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
    limit: number
    collection_id?: string[]
    category_id?: string[]
    id?: string[]
    order?: string
    fields: string
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
        fields: "id,handle,title,*images,*variants.calculated_price",
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

    if (!region) return null

    const { response: { products, count } } = await listProductsWithSort({
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