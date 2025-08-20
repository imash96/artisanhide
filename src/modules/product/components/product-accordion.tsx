import { StoreProduct } from "@medusajs/types";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@modules/common/custom-accordion";
import { RefreshCw, Ruler, TruckElectric, Undo } from "lucide-react";
import Link from "next/link";

export default function ProductAccordion({ product }: ProductTabsProps) {
    const accordionDetails = [
        {
            label: "Product Information",
            content: <ProductInfo product={product} />
        },
        {
            label: "Size & Fit",
            content: <SizeAndFit />
        },
        {
            label: "Product Care",
            content: <ProductCare />
        },
        {
            label: "Shipping & Returns",
            content: <ShippingInfoTab />
        }
    ]
    return (
        <Accordion type="multiple" defaultValue={[accordionDetails[0].label]} className="my-8">
            {accordionDetails.map((item, index) => (
                <AccordionItem value={item.label} key={index}>
                    <AccordionTrigger className="text-gray-800 font-medium hover:text-blue-600 transition">
                        <h4 className="font-light text-base text-[#242424]">{item.label}</h4>
                    </AccordionTrigger>
                    <AccordionContent asChild className="text-sm font-light bg-white text-gray-900 leading-relaxed">
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

    )
}

function ShippingInfoTab() {
    const shippingInfo = [
        {
            icon: <TruckElectric className="h-5 w-5 text-blue-500" />,
            title: "Fast delivery",
            description: "Your package will arrive in 4-6 business days at your address - Free on orders over $100"
        },
        {
            icon: <RefreshCw className="h-5 w-5 text-blue-500" />,
            title: "Simple exchanges",
            description: "Is the fit not quite right? No worries - we'll exchange your product for a new one."
        },
        {
            icon: <Undo className="h-5 w-5 text-blue-500" />,
            title: "Easy returns",
            description: "Free returns within 30 days. Items must be in original condition with tags attached."
        }
    ]

    return (
        <div className="space-y-5">
            {shippingInfo.map((info) => (
                <div key={info.title} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">{info.icon}</div>
                    <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ProductInfo({ product }: ProductTabsProps) {
    const productDetails = [
        { label: "Material", value: product.material ?? "-" },
        { label: "Country of origin", value: product.origin_country ?? "-" },
        { label: "Type", value: product.type ? product.type.value : "-" },
        { label: "Weight", value: product.weight ? `${product.weight} g` : "-" },
        { label: "Dimensions", value: product.length && product.width && product.height ? `${product.length}L × ${product.width}W × ${product.height}H` : "-" }
    ]

    return (
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {productDetails.map((detail) => (
                <dl key={detail.label}>
                    <dt className="font-medium text-gray-900">{detail.label}</dt>
                    <dd className="text-gray-600">{detail.value}</dd>
                </dl>
            ))}
        </div>
    )
}

function ProductCare() {
    const careInstructions = [
        "Professional leather cleaning recommended",
        "Store in a cool, dry place away from direct sunlight",
        "Avoid exposure to water and harsh chemicals",
        "Handle with care to maintain quality",
        "Use leather conditioner every 6 months",
        "Hang on padded hangers to maintain shape"
    ]
    return (
        <ul className="text-sm text-gray-600 font-normal space-y-2 list-disc list-outside ml-5">
            {careInstructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
        </ul>
    )
}

function SizeAndFit() {
    const fitDetails = [
        { label: "Fit: ", value: "Regular – true to size" },
        { label: "Fit Guide: ", value: "This jacket has a regular fit. For a more relaxed fit, consider sizing up" }
    ]

    return (
        <div className="space-y-3">
            {fitDetails.map((fit) => (
                <dl key={fit.label}>
                    <dt className="font-medium text-gray-900">{fit.label}</dt>
                    <dd className="text-gray-600">{fit.value}</dd>
                </dl>
            ))}
            <Link href="/" className="flex items-center gap-2 text-blue-500 text-sm mt-2">
                <Ruler className="h-4 w-4" />
                <span>Check our detailed size guide for more info</span>
            </Link>
        </div>
    )
}

type ProductTabsProps = {
    product: StoreProduct
}
