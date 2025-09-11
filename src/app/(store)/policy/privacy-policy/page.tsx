export const dynamic = 'force-static'

import buildJsonLd from "@lib/util/jsonld"
import PrivacyPolicy from "@module/policy/templates/privacy-policy"
import type { Metadata } from "next"

export default function Page() {
    return (
        <PrivacyPolicy />
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const canonical = "https://artisanhide.com/policy/privacy-policy"
    const policyLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy | ArtisanHide",
        "url": canonical,
        "description": "ArtisanHide's Privacy Policy explains how we collect, use, and protect your personal data in compliance with Indian laws like the DPDP Act. Learn about your rights, data security, and more.",
        "isPartOf": {
            "@type": "WebSite",
            "name": "ArtisanHide",
            "url": "https://artisanhide.com"
        },
        "datePublished": "2025-08-28",
        "dateModified": "2025-08-28"
    }

    return {
        title: "Privacy Policy | ArtisanHide",
        description:
            "Discover how ArtisanHide handles your personal information with transparency and security. Compliant with DPDP Act, IT Act, and best practices for e-commerce data protection in India. Learn about data collection, usage, sharing, and your rights.",
        alternates: { canonical },
        openGraph: {
            type: "website",
            title: "Privacy Policy | ArtisanHide",
            description:
                "Discover how ArtisanHide handles your personal information with transparency and security. Compliant with DPDP Act, IT Act, and best practices for e-commerce data protection in India. Learn about data collection, usage, sharing, and your rights.",
            url: canonical,
            siteName: "ArtisanHide",
        },
        twitter: {
            card: "summary",
            title: "Privacy Policy | ArtisanHide",
            description:
                "Discover how ArtisanHide handles your personal information with transparency and security. Compliant with DPDP Act, IT Act, and best practices for e-commerce data protection in India. Learn about data collection, usage, sharing, and your rights.",
        },
        robots: { index: true, follow: true },
        other: buildJsonLd(policyLd),
    }
}