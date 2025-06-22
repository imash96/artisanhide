import { notFound } from "next/navigation"
import { SortOptions } from "@/types/common";
import { getCategoryByHandle, listCategories } from "@libs/actions/categories";
import type { Metadata } from "next";
import { StoreProductCategory } from "@medusajs/types";
import { cookies } from "next/headers";

export default async function Page({ params, searchParams }: CategoryPageProps) {
    const categorySegments = (await params).category;
    const { sortBy, page } = await searchParams

    const countryCode = (await cookies()).get("__country_code")

    const pageNumber = page ? parseInt(page) : 1
    const sort = sortBy || "created_at"

    const productCategory = await getCategoryByHandle(categorySegments)

    if (!productCategory || !countryCode) notFound()

    return (
        <div className="">Category : {JSON.stringify(productCategory)}</div>
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