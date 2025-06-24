import { notFound } from "next/navigation"
import { SortOptions } from "@/types/common";
import { getCategoryByHandle, listCategories } from "@libs/actions/categories";
import type { Metadata } from "next";
import { StoreProductCategory } from "@medusajs/types";
import { cookies } from "next/headers";
import Container from "@modules/common/create-section";
import Breadcrumb from "@modules/category/templates/breadcrumb";
import { toTitleCase } from "@libs/util/get-title-case";
import PaginatedProducts from "@modules/category/templates/paginated-products";

export default async function Page({ params, searchParams }: CategoryPageProps) {
    const categorySegments = (await params).category;
    const { sortBy, page } = await searchParams

    const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

    const pageNumber = page ? parseInt(page) : 1
    const sort = sortBy || "created_at"

    const category = await getCategoryByHandle(categorySegments)

    if (!category || !countryCode) notFound();
    const breadCrumb = categorySegments.map(toTitleCase)
    const lastCategory = breadCrumb[breadCrumb.length - 1];

    return (
        <Container className="">
            <Breadcrumb heading={lastCategory.replace(/-/g, " ")} breadCrumb={[...breadCrumb]} />
            <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
            />
            {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {productCategory.products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div> */}
        </Container>
    )
}

export async function generateStaticParams() {
    const product_categories = await listCategories()

    if (!product_categories) return []

    const categoryHandles = product_categories.map((category: StoreProductCategory) => category.handle)


    return categoryHandles.map((handle) => ({ category: handle.split("/") }))

}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const categorySegments = (await params).category;
    try {
        const productCategory = await getCategoryByHandle(categorySegments)

        const title = productCategory.name + " | Artisan Hide Store"

        const description = productCategory.description ?? `${title} category.`

        return {
            title: `${title} | Artisan Hide Store`,
            description,
            alternates: {
                canonical: `${categorySegments.join("/")}`,
            },
        }
    } catch (error) {
        notFound()
    }
}

type CategoryPageProps = {
    params: Promise<{ category: string[] }>
    searchParams: Promise<{
        sortBy?: SortOptions
        page?: string
    }>
}