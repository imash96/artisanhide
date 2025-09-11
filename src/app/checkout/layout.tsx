import CheckoutFooter from "@/layout/checkout/templates/footer";
import CheckoutHeader from "@/layout/checkout/templates/header";
import Container from "@module/common/create-section";
import type { Metadata } from "next";

export default function Layout({ children }: LayoutProps<"/checkout">) {
    return (
        <>
            <CheckoutHeader />
            <Container as="main" width={7} className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-10 py-8 md:py-10 lg:py-14">
                {children}
            </Container>
            <CheckoutFooter />
        </>
    )
}

export const metadata: Metadata = {
    title: "Checkout",
    description: 'Checkout Page for Artisan Hide Store',
}