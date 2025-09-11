import { listCollection } from "@lib/action/collection";
import { fetchProductByCollection } from "@lib/action/product";
import ProductCard from "@module/common/product-card";
import SectionHeader from "@module/home/components/section-header";
import { notFound } from "next/navigation";
import SortnFilter from "@module/common/sort-filter";

export default async function Page(props: PageProps<"/collection/[handle]">) {
    const { handle } = await props.params
    const [collection] = await listCollection({ handle, fields: "+metadata" })

    if (!collection) return notFound()

    const products = await fetchProductByCollection({
        collection_id: collection.id,
        fields: "id,handle,title,*images,*variants.calculated_price"
    }, `col-${collection.id}`)

    return (
        <SectionHeader title={collection.title} desc={collection.metadata?.description as string} sectionName="collection">
            <SortnFilter totalProduct={products.length} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {products?.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </SectionHeader>
    )
}

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

//     return posts.map((post) => ({
//         slug: post.slug,
//     }))
// }