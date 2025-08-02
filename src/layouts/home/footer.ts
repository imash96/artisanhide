import Facebook from "@/icons/icon-facebok";
import Instagram from "@/icons/icon-instagram";
import Pinterest from "@/icons/icon-pinterest";
import TikTok from "@/icons/icon-tiktok";
import Twitter from "@/icons/icon-twitter";
import YouTube from "@/icons/icon-youtube";

export const footer = {
    "LEGAL": [
        { name: 'About us', href: '/about-us' },
        { name: "Contact Us", href: "/contact-us" },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Privacy policy', href: '/policy/privacy-policy' },
        { name: 'Payment policy', href: '/policy/payment-policy' },
        { name: 'Shipping policy', href: '/policy/shipping-policy' },
        { name: 'Return Policy', href: '/policy/return-and-refund-policy' },
        { name: "Terms of service", href: "/policy/terms-of-sale" },
    ],
    "SHOP": [
        { name: "Sign up", href: "/account" },
        { name: "Login", href: "/account" },
        { name: 'Wish List', href: '/account/wishlist' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Profile', href: '/account/profile' },
        { name: 'Orders', href: '/account/orders' },
        { name: 'Returns', href: '/account/returns' },
        { name: 'Guides', href: '/guides' },
    ],
    "SOCIAL": [
        { name: 'Facebook', href: '#', icon: Facebook },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'Twitter', href: '#', icon: Twitter },
        { name: 'Tiktok', href: '#', icon: TikTok },
        { name: 'Pinterest', href: '#', icon: Pinterest },
        { name: 'YouTube', href: '#', icon: YouTube }
    ]
}