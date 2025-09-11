export const dynamic = 'force-static'

import buildJsonLd from "@lib/util/jsonld"
import PaymentPolicy from "@module/policy/templates/payment-policy"
import type { Metadata } from "next"

export default function Page() {
    return (
        <PaymentPolicy />
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const canonical = "https://artisanhide.com/policy/payment-policy"
    const policyLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Payment Policy | ArtisanHide",
        "url": canonical,
        "description": "ArtisanHide's Payment Policy for secure cross-border transactions from India. Accepted methods include cards, UPI, wallets, and international gateways like Stripe. Details on security, currencies, refunds, and more.",
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
                    "name": "Payment Policy"
                }
            ]
        }
    }

    return {
        title: "Payment Policy | ArtisanHide",
        description:
            "Explore ArtisanHide's Payment Policy for e-commerce exports from India: Secure methods like credit cards, UPI, Stripe; currency details, security, refund processes, and support for international buyers.",
        alternates: { canonical },
        openGraph: {
            type: "website",
            title: "Payment Policy | ArtisanHide",
            description:
                "Explore ArtisanHide's Payment Policy for e-commerce exports from India: Secure methods like credit cards, UPI, Stripe; currency details, security, refund processes, and support for international buyers.",
            url: canonical,
            siteName: "ArtisanHide",
        },
        twitter: {
            card: "summary",
            title: "Payment Policy | ArtisanHide",
            description:
                "Explore ArtisanHide's Payment Policy for e-commerce exports from India: Secure methods like credit cards, UPI, Stripe; currency details, security, refund processes, and support for international buyers.",
        },
        robots: { index: true, follow: true },
        other: buildJsonLd(policyLd),
    }
}