import Logo from "@/icons/logo";
import ThemeButton from "@/layouts/home/components/button-theme";
import { getInitialTheme } from "@libs/util/get-initial-theme";
import Container from "@modules/common/create-section";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default async function CheckoutHeader() {
    const initialTheme = await getInitialTheme()
    return (
        <header className="sticky top-0 z-40 bg-gray-100 border-b border-border shadow-sm shadow-shadow">
            <Container as="nav" aria-label="nav" className="flex justify-between items-center h-[4.5rem] text-gray-900">
                <Link href="/cart" className="flex items-center py-3">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Cart
                </Link>
                <Link href={"/"} aria-label="logo">
                    <Logo className="my-auto font-bold text-3xl w-26" />
                </Link>
                <ThemeButton initialTheme={initialTheme} className="rounded-md button-sec" />
            </Container>
        </header>
    )
}