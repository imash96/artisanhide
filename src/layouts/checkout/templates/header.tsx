import Logo from "@/icons/logo";
import ThemeButton from "@/layouts/home/components/button-theme";
import { getInitialTheme } from "@libs/util/get-initial-theme";
import Container from "@modules/common/create-section";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CheckoutHeader() {
    const initialTheme = await getInitialTheme()
    return (
        <>
            <header className="sticky top-0 z-40 bg-gray-100 border-b border-gray-200 shadow-sm">
                <Container as="nav" aria-label="Checkout navigation" className="flex items-center justify-between h-[4.5rem] px-4 sm:px-6 lg:px-8">
                    <Link href="/cart" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="hidden sm:inline">Back to Cart</span>
                    </Link>
                    <Link href={"/"} aria-label="Go to homepage">
                        <Logo className="h-8 w-auto" />
                    </Link>
                    <ThemeButton initialTheme={initialTheme} className="rounded-md border p-2 border-gray-300 hover:bg-gray-200 transition-colors" />
                </Container>
            </header>
        </>
    )
}