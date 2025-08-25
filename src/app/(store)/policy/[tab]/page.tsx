import PrivacyPolicy from "@module/policy/templates/privacy-policy"
import ReturnRefundPolicy from "@module/policy/templates/return-refund-policy"
import ShippingPolicy from "@module/policy/templates/shipping-policy"
import TermOfSale from "@module/policy/templates/term-of-sale"
import { notFound } from "next/navigation"


export default function Page({ params }: { params: Promise<{ tab: string }> }) {
    const renderContent = async () => {
        switch ((await params).tab) {
            case "privacy-policy":
                return <PrivacyPolicy />
            case "return-and-refund-policy":
                return <ReturnRefundPolicy />
            case "shipping-policy":
                return <ShippingPolicy />
            case "payment-policy":
                return <ShippingPolicy />
            case "terms-of-sale":
                return <TermOfSale />
            default:
                return notFound()
        }
    }
    return renderContent()
}