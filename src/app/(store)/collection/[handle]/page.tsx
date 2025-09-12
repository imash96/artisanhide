import { listCollection } from "@lib/action/collection";
import { fetchProductByCollection, listProductsWithSort } from "@lib/action/product";
import ProductCard from "@module/common/product-card";
import SectionHeader from "@module/home/components/section-header";
import { notFound } from "next/navigation";
import SortnFilter from "@module/common/sort-filter";
import { sdk } from "@lib/sdk";
import Pagination from "@module/common/pagination";
import usePagination from "@lib/hook/use-pagination";
import { cookies } from "next/headers";
import { SortOptions } from "@/type/common";

export default async function Page(props: PageProps<"/collection/[handle]">) {
    const { handle } = await props.params
    const query = await props.searchParams
    const page = Number(query.page) || 1;
    const sort = (query.sort || "created_at") as SortOptions
    const [collection] = await listCollection({ handle, fields: "+metadata" })
    const limit = 24;
    if (!collection) return notFound()
    const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
    const { response, nextPage } = await listProductsWithSort({ page, countryCode, sortBy: sort, queryParams: { limit } })
    const { start, end, totalPages, getPageNumbers } = usePagination(page, response.count, limit)
    console.log(response)
    console.log(nextPage)
    return (
        <SectionHeader title={collection.title} desc={collection.metadata?.description as string} sectionName="collection">
            <SortnFilter totalProduct={response.count} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {response.products?.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
            <Pagination totalPages={totalPages} currentPage={page} getPageNumbers={getPageNumbers} href={`/collection/${handle}`} />
        </SectionHeader>
    )
}

export async function generateStaticParams() {
    const collections = await sdk.store.collection.list({ fields: "handle" }).then(({ collections }) => collections);
    return collections.map(c => ({ handle: c.handle }))
}