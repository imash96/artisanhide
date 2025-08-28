import { notFound } from "next/navigation";
import { SortOptions } from "@/type/common";
import { getCategoryByHandle } from "@lib/action/categories";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Container from "@module/common/create-section";
import PaginatedProducts from "@module/category/templates/paginated-products";
import Breadcrumb from "@module/product/components/product-breadcrumb";
import { StoreProductCategory } from "@medusajs/types";

export default async function Page({ params, searchParams }: CategoryPageProps) {
    const categorySegments = (await params).category;
    const { sortBy, page } = await searchParams

    const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

    const pageNumber = page ? Number(page) : 1
    const sort = sortBy || "created_at"

    const category = await getCategoryByHandle(categorySegments)

    if (!category || !countryCode) notFound();
    const crumbs = getCategoryBreadcrumbs(category);

    return (
        <Container className="py-12 md:py-10 lg:py-16 max-w-7xl mx-auto px-4 md:px-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-wide capitalize">
                    {category.name}
                </h1>
                <Breadcrumb crumbs={crumbs} className="justify-center items-center mt-2" />
                {/* {category.description && (
                    <p className="mt-3 text-lg text-foreground-muted max-w-xl mx-auto">{category.description}</p>
                )} */}
                <p className="mt-3 text-lg text-foreground-muted max-w-4xl mx-auto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates eveniet tempora dignissimos quae in! Nam beatae suscipit amet quis a nesciunt consequuntur asperiores qui corporis ea! Consequatur exercitationem aspernatur voluptates expedita ut! Cupiditate suscipit odio ex aliquam, doloremque aperiam in libero quisquam, excepturi iure illum et explicabo id quam. Id.</p>
            </header>
            <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
            />
        </Container>
    );
}

// export async function generateStaticParams() {
//     const product_categories = await listCategories()

//     if (!product_categories) return []

//     const categoryHandles = product_categories.map((category: StoreProductCategory) => category.handle)


//     return categoryHandles.map((handle) => ({ category: handle.split("/") }))

// }

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

function getCategoryBreadcrumbs(category: StoreProductCategory) {
    const segments = category.handle.split("/");
    return segments.map((segment, idx) => ({
        name: idx === segments.length - 1 ? category.name : segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        href: "/category/" + segments.slice(0, idx + 1).join("/"),
    }))
}

type CategoryPageProps = {
    params: Promise<{ category: string[] }>;
    searchParams: Promise<{
        sortBy?: SortOptions;
        page?: string
    }>;
};
