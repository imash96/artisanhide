import buildJsonLd from "@lib/util/jsonld"
import ShippingPolicy from "@module/policy/templates/shipping-policy"
import type { Metadata } from "next"

export default function Page() {
    return (
        <ShippingPolicy />
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const canonical = "https://artisanhide.com/policy/shipping-policy"
    const policyLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Shipping Policy | ArtisanHide",
        "url": canonical,
        "description": "ArtisanHide's Shipping Policy details delivery times, costs, and options for India. Free shipping on orders over ₹999, reliable carriers like Delhivery, and international options available.",
        "isPartOf": {
            "@type": "WebSite",
            "name": "ArtisanHide",
            "url": "https://artisanhide.com"
        },
        "datePublished": "2025-08-28",
        "dateModified": "2025-08-28",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://artisanhide.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Shipping Policy"
                }
            ]
        },
        "potentialAction": {
            "@type": "ReadAction",
            "target": canonical
        }
    }

    return {
        title: "Shipping Policy | ArtisanHide",
        description:
            "Learn about ArtisanHide's shipping policy for India: Free shipping on prepaid orders over ₹999, delivery in 2-14 days, trusted carriers like Delhivery and BlueDart, tracking, and handling of issues. International shipping available upon request.",
        alternates: { canonical },
        openGraph: {
            type: "website",
            title: "Shipping Policy | ArtisanHide",
            description:
                "Learn about ArtisanHide's shipping policy for India: Free shipping on prepaid orders over ₹999, delivery in 2-14 days, trusted carriers like Delhivery and BlueDart, tracking, and handling of issues. International shipping available upon request.",
            url: canonical,
            siteName: "ArtisanHide",
        },
        twitter: {
            card: "summary",
            title: "Shipping Policy | ArtisanHide",
            description:
                "Learn about ArtisanHide's shipping policy for India: Free shipping on prepaid orders over ₹999, delivery in 2-14 days, trusted carriers like Delhivery and BlueDart, tracking, and handling of issues. International shipping available upon request.",
        },
        robots: { index: true, follow: true },
        other: buildJsonLd(policyLd),
    }
}