import Announcement from "@/layouts/home/templates/announcement";
import Footer from "@/layouts/home/templates/footer";
import Header from "@/layouts/home/templates/header";
import { listRegions } from "libs/actions/region";
import type { Metadata } from "next";

export default async function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const regions = await listRegions()
    return (
        <>
            <Announcement />
            <Header />
            {children}
            <Footer regions={regions} />
        </>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ countryCode: string }> }): Promise<Metadata> {
    const countryCode = (await params).countryCode
    return {
        title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
        description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
        openGraph: {
            siteName: "Artisan Hide Store",
            title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
            description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${countryCode}`,
            type: "website",
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${countryCode}/men2.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
            description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
            images: [`${process.env.NEXT_PUBLIC_BASE_URL}/${countryCode}/men2.jpg`],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${countryCode}`,
        },
    }
};