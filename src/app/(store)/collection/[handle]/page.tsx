import { listCollection } from "@lib/action/collection";
import { fetchProductByCollection } from "@lib/action/product";
import Container from "@module/common/create-section";
import ProductCard from "@module/common/product-card";

export default async function Page(props: PageProps<"/collection/[handle]">) {
    const { handle } = await props.params
    const [collection] = await listCollection({ handle, fields: "+metadata" })
    const products = await fetchProductByCollection({
        collection_id: collection.id,
        fields: "id,handle,title,*images,*variants.calculated_price"
    }, `col-${collection.id}`)
    console.log(products)
    return (
        <Container>
            <div className="border-b border-border pb-10 pt-12">
                <h1 className="text-4xl font-bold tracking-tight">{collection.title}</h1>
                <p className="mt-4 text-base text-foreground-muted">
                    {collection.metadata?.description as string}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 my-8">
                {products?.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </Container>
    )
}

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

//     return posts.map((post) => ({
//         slug: post.slug,
//     }))
// }