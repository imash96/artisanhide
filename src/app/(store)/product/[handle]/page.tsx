import { listProducts } from "@lib/action/product"
import { getRegion } from "@lib/action/region"
import { ProductProvider } from "@lib/context/product-context"
import Container from "@module/common/create-section"
import ProductAccordion from "@module/product/components/product-accordion"
import ProductActions from "@module/product/templates/product-action"
import ProductDesc from "@module/product/templates/product-desc"
import ProductGallery from "@module/product/templates/product-gallery"
import ProductInfo from "@module/product/templates/product-info"
import RelatedProducts from "@module/product/templates/product-related"
import ProductReview from "@module/product/templates/product-review"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import Script from "next/script"

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params
    const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

    const region = await getRegion(countryCode)

    if (!region) notFound()

    const product = await listProducts({
        regionId: region.id,
        queryParams: { handle },
    }).then(({ response }) => response.products[0])

    if (!product || !product.id) notFound()

    const pages = product.categories?.map((c) => ({ name: c.name, href: `/category/${c.handle}` }))

    return (
        <Container className="py-8 md:py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className={`flex flex-col-reverse self-start md:flex-row lg:sticky top-20 gap-2 col-span-full lg:col-span-7 xl:col-span-8`}>
                    <ProductGallery images={product.images} title={product.title} />
                </div>
                <div className="col-span-full lg:col-span-5 xl:col-span-4">
                    <ProductInfo crumbs={pages} title={product.title} hs_code={product.hs_code} />
                    <ProductProvider product={product} countryCode={countryCode}>
                        <ProductActions product={product} />
                    </ProductProvider>
                    <ProductAccordion product={product} />
                </div>
            </div>
            <ProductDesc />
            <RelatedProducts product={product} region={region} />
            <ProductReview />
            {/* TODO move this to order section page */}
            {/* {process.env.NEXT_PUBLIC_TRUST_PILOT_ID &&
                <Script
                    id="trustpilot-script"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `document.addEventListener('DOMContentLoaded', function() { const trustpilot_invitation = { recipientEmail: 'arshad.ans7006@gmail.com', recipientName: 'Arshad', referenceId: 'Order_D654SE65XF46D', source: 'InvitationScript', productSkus: ['MJBI84'], products: [{ sku: 'MJBI84', productUrl: 'https://artisanhide.com/product/racer-leather-jacket-men-original-nappa-lambskin-outwear-mjbi84', imageUrl: 'https://backend-file-service.s3.us-east-2.amazonaws.com/Men/Leather/Jacket/Biker%20Racer/MJBI_84%20(1).webp', name: 'Racer Leather Jacket Men Original Nappa Lambskin Outwear MJBI84', }], }; tp('createInvitation', trustpilot_invitation); });`,
                    }}
                />
            } */}
        </Container >
    )
}