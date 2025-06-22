import { use } from "react";
import Header from "@/layouts/home/templates/header";
import MobileDrawer from "@/layouts/home/templates/mobile-drawer";
import CartDrawer from "@/layouts/home/templates/cart-drawer";
import Footer from "@/layouts/home/templates/footer";
import { retrieveCart } from "libs/actions/cart";
import BottomTabs from "@/layouts/home/templates/bottom-tabs";
import { listCategories } from "libs/actions/categories";
import type { Metadata } from "next";


export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const cart = use(retrieveCart())
    const parent_categories = use(listCategories({ include_descendants_tree: true, limit: 6, parent_category_id: "null", }))
    return (
        <>
            <Header parent_categories={parent_categories} />
            <MobileDrawer parent_categories={parent_categories} />
            <CartDrawer cart={cart} />
            {children}
            <BottomTabs />
            <Footer />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
        description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
        openGraph: {
            siteName: "Artisan Hide Store",
            title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
            description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            type: "website",
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/men2.jpg`,
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
            images: [`${process.env.NEXT_PUBLIC_BASE_URL}/men2.jpg`],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
        icons: '/favicon.ico',
    }
};