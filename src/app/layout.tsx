import type { Metadata } from "next";
import { cookies } from "next/headers";
import { use } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import "@/styles/globals.css";

const BricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = use(cookies())
  const theme = cookieStore.get('__theme')
  return (
    <html lang="en" data-theme={theme?.value ? theme.value : "light"}>
      <body className={`${BricolageGrotesque.className} antialiased pb-14 lg:pb-0`}>
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
  description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
  openGraph: {
    siteName: "Artisan Hide Store",
    title: "Shop Premium Leather Goods Online | Jackets, Wallets & Shoes at Artisan Hide",
    description: "Discover high-quality leather goods from top brands at bmtraders.com. Explore our collection of stylish leather jackets, wallets, shoes, and more. Shop now for premium craftsmanship and timeless designs at Artisan Hide. Free shipping available!",
    url: `${process.env.FRONTEND_URL}`,
    type: "website",
    images: [
      {
        url: `${process.env.FRONTEND_URL}/men2.jpg`,
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
    images: [`${process.env.FRONTEND_URL}/men2.jpg`],
  },
  alternates: {
    canonical: `${process.env.FRONTEND_URL}`,
  },
};