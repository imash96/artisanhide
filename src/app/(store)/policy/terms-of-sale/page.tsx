import buildJsonLd from "@lib/util/jsonld"
import TermsOfSale from "@module/policy/templates/term-of-sale"
import type { Metadata } from "next"

export default function Page() {
    return (
        <TermsOfSale />
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const canonical = "https://artisanhide.com/policy/terms-and-conditions"
    const policyLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms and Conditions | ArtisanHide",
        "url": canonical,
        "description": "ArtisanHide's Terms and Conditions for cross-border e-commerce retail exports from India. Covers orders, payments, shipping, returns, intellectual property, liability, and governing laws.",
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
                    "name": "Terms and Conditions"
                }
            ]
        }
    }

    return {
        title: "Terms and Conditions | ArtisanHide",
        description:
            "Review ArtisanHide's Terms and Conditions for using our e-commerce site specializing in cross-border retail exports from India. Includes details on orders, payments, intellectual property, liability, and dispute resolution under Indian law.",
        alternates: { canonical },
        openGraph: {
            type: "website",
            title: "Terms and Conditions | ArtisanHide",
            description:
                "Review ArtisanHide's Terms and Conditions for using our e-commerce site specializing in cross-border retail exports from India. Includes details on orders, payments, intellectual property, liability, and dispute resolution under Indian law.",
            url: canonical,
            siteName: "ArtisanHide",
        },
        twitter: {
            card: "summary",
            title: "Terms and Conditions | ArtisanHide",
            description:
                "Review ArtisanHide's Terms and Conditions for using our e-commerce site specializing in cross-border retail exports from India. Includes details on orders, payments, intellectual property, liability, and dispute resolution under Indian law.",
        },
        robots: { index: true, follow: true },
        other: buildJsonLd(policyLd),
    }
}