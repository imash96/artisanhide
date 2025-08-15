import CheckoutFooter from "@/layouts/checkout/templates/footer";
import CheckoutHeader from "@/layouts/checkout/templates/header";
import Container from "@modules/common/create-section";
import type { Metadata } from "next";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <CheckoutHeader />
            <Container as="main" width={7} className="grid grid-cols-1 gap-x-14 lg:grid-cols-10 py-8 md:py-10 lg:py-14 w-full">
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