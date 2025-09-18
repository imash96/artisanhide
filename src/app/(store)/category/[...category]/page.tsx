import { notFound } from "next/navigation";
import { SortOptions } from "@/type/common";
import { getCategoryByHandle } from "@lib/action/categories";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Container from "@module/common/create-section";
import PaginatedProducts from "@module/category/templates/paginated-products";
import { StoreProductCategory } from "@medusajs/types";
import { Breadcrumb } from "@module/product/components/product-breadcrumb";

export default async function Page(
  props: PageProps<"/category/[...category]">
) {
  const categorySegments = (await props.params).category;
  const { sortBy, page } = (await props.searchParams) as {
    sortBy?: SortOptions;
    page?: string;
  };

  const countryCode =
    (await cookies()).get("__country_code")?.value ||
    process.env.NEXT_PUBLIC_DEFAULT_REGION ||
    "us";

  const pageNumber = page ? Number(page) : 1;
  const sort = sortBy || "created_at";

  const category = await getCategoryByHandle(categorySegments);

  if (!category || !countryCode) notFound();
  const crumbs = getCategoryBreadcrumbs(category);

  return (
    <Container className="py-12 md:py-10 lg:py-16 max-w-7xl mx-auto px-4 md:px-8">
      <header className=" mb-10 space-y-2">
        <h1 className="text-3xl lg:text-5xl tracking-tight font-light">
          {category.name}
        </h1>
        <Breadcrumb crumbs={crumbs} className=" mt-2" />
        {category.description && (
          <p className="hidden mt-3 text-lg text-foreground-muted max-w-xl mx-auto">
            {category.description}
          </p>
        )}
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

export async function generateMetadata(
  props: PageProps<"/category/[...category]">
): Promise<Metadata> {
  const categorySegments = (await props.params).category;
  try {
    const productCategory = await getCategoryByHandle(categorySegments);

    const title = productCategory.name + " | Artisan Hide Store";

    const description = productCategory.description ?? `${title} category.`;

    return {
      title: `${title} | Artisan Hide Store`,
      description,
      alternates: {
        canonical: `${categorySegments.join("/")}`,
      },
    };
  } catch (error) {
    notFound();
  }
}

function getCategoryBreadcrumbs(category: StoreProductCategory) {
  const segments = category.handle.split("/");
  return segments.map((segment, idx) => ({
    name:
      idx === segments.length - 1
        ? category.name
        : segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/category/" + segments.slice(0, idx + 1).join("/"),
  }));
}
