"use client"

import { User, MapPin, Package, Heart, Ruler } from "lucide-react"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import Container from "@modules/common/create-section"
import InteractiveLink from "@modules/common/interactive-link"
import { PropsWithChildren } from "react"

const menuItems = [
    { title: "Profile", href: "/account/profile", icon: User },
    { title: "Addresses", href: "/account/addresses", icon: MapPin },
    { title: "Orders", href: "/account/orders", icon: Package },
    { title: "Wishlist", href: "/account/wishlist", icon: Heart },
    { title: "Measure", href: "/account/measurements", icon: Ruler },
]

export default function ClientLayout({ children }: PropsWithChildren) {
    const pathname = usePathname()

    return (
        <Container width={7}>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 py-6 md:py-10 lg:py-12">
                <div className="lg:col-span-3 lg:sticky top-5 h-full">
                    <nav className="p-1 lg:px-4">
                        <div className="flex gap-1 bg-gray-100 rounded-md lg:bg-transparent lg:flex-col lg:space-y-2 lg:gap-0 lg:rounded-none">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link href={item.href} key={item.href}
                                        className={`flex items-center gap-1 py-2 px-1 rounded-md transition-all duration-200 font-medium flex-1 flex-col text-xs lg:flex-none lg:flex-row lg:gap-3 lg:px-4 lg:py-3 lg:text-base lg:text-left lg:w-full lg:justify-start ${isActive ? "bg-white text-brown shadow-sm lg:bg-brown/10 lg:border lg:border-brown" : "text-gray-600 hover:text-gray-900 hover:bg-white/50 lg:hover:bg-gray-100"}`}
                                    >
                                        <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                                        <span className="lg:text-gray-900">
                                            <span>{item.title}</span>
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </nav>
                </div>
                <div className="lg:col-span-7">{children}</div>
            </div>
            <hr />
            <div className="py-12">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Got questions?</h3>
                    <span className="text-base">
                        You can find frequently asked questions and answers on our
                        customer service page.
                    </span>
                </div>
                <div className="float-right">
                    <InteractiveLink href="/customer-service">
                        Customer Service
                    </InteractiveLink>
                </div>
            </div>
        </Container>
    )
}
