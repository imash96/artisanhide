import { listProducts } from "@libs/actions/product"
import { getRegion } from "@libs/actions/region"
import Container from "@modules/common/create-section"
import ProductActions from "@modules/product/templates/product-action"
import ProductGallery from "@modules/product/templates/product-gallery"
import ProductInfo from "@modules/product/templates/product-info"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params
    const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

    const region = await getRegion(countryCode)

    if (!region) notFound()

    const product = await listProducts({
        countryCode: countryCode,
        queryParams: { handle },
    }).then(({ response }) => response.products[0])

    if (!product || !product.id) notFound()

    const pages = product.categories?.map((c) => ({ name: c.name, href: `/category/${c.handle}` }))

    return (
        <Container className="py-8 md:py-10 lg:py-14 text-brown">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <ProductGallery images={product.images} title={product.title} className="col-span-full lg:col-span-7" />
                <div className="col-span-full lg:col-span-5">
                    <ProductInfo pages={pages} title={product.title} hs_code={product.hs_code} />
                    <ProductActions product={product} countryCode={countryCode} />
                </div>
            </div>
        </Container >
    )
}