import { listProducts } from "@libs/actions/product"
import { StoreProduct, StoreProductListParams, StoreRegion } from "@medusajs/types"
import ProductCard from "@modules/common/product-card"


export default async function RelatedProducts({ product, region }: RelatedProductsProps) {
    const queryParams: StoreProductListParams = {}
    queryParams.region_id = region.id
    queryParams.limit = 7
    if (product.collection_id) {
        queryParams.collection_id = [product.collection_id]
    }
    if (product.tags) {
        queryParams.tag_id = product.tags.map((t) => t.id).filter(Boolean) as string[]
    }

    const products = await listProducts({ queryParams, regionId: region.id, }).then(({ response }) => {
        return response.products.filter(
            (responseProduct) => responseProduct.id !== product.id
        )
    })

    if (!products.length) return null

    return (
        <section aria-labelledby="related-product" className="space-y-8 py-6 md:py-10 lg:py-14">
            <div className="space-y-0.5">
                <h2 className="text-center text-[24px] lg:text-[30px] tracking-tight font-normal text-templateBrown">
                    Related products
                </h2>
                <p className="max-w-xl mx-auto text-center text-[12px] lg:text-[14px] tracking-wide font-light text-gray-500">
                    You might also want to check out these products.
                </p>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-5 lg:gap-y-6">
                {products.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

type RelatedProductsProps = {
    product: StoreProduct
    region: StoreRegion
}