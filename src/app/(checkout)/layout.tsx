import CheckoutFooter from "@/layouts/checkout/templates/footer";
import CheckoutHeader from "@/layouts/checkout/templates/header";
import type { Metadata } from "next";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <CheckoutHeader />
            {children}
            <CheckoutFooter />
        </>
    )
}

export const metadata: Metadata = {
    title: "Checkout",
    description: 'Checkout Page for Leather Lifestyle Store',
}