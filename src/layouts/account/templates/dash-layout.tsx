"use client"

import { UserRound, BookUser, Package, Heart, PencilRuler } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { StoreCustomer } from "@medusajs/types"
import SignoutButton from "../components/logout"

export default function DashLayout({ customer, children }: DashLayoutProp) {
    const pathname = usePathname()

    const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer';

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="lg:mx-4 lg:sticky top-16 h-fit space-y-4 divide-y border-b border-border lg:border-b-0 lg:pr-0">
                {/* Customer Info */}
                <div className="flex items-center gap-4 py-4 px-4">
                    <div className="min-w-[60px] h-[60px] flex items-center justify-center rounded-full border border-accent">
                        <UserRound size={26} className="text-accent" strokeWidth={1.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold truncate">{fullName}</h3>
                        <p className="text-sm text-foreground-muted truncate">{customer.email}</p>
                        <SignoutButton />
                    </div>
                </div>

                {/* Navigation */}
                <nav aria-label="Account navigation" className="px-2 py-2 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex items-center m-1 gap-3 border-b-4 lg:border-b-0 lg:border-l-4 px-4 py-2 lg:px-3 lg:py-2.5 rounded-md transition-colors duration-150 ${isActive ? 'bg-accent/20 border-accent' : 'hover:bg-background-muted lg:border-transparent hover:border-border-hover'} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1`}
                            >
                                <div className="flex w-full flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3">
                                    <item.icon
                                        size={20}
                                        strokeWidth={1.2}
                                        className={isActive ? 'text-accent' : ''}
                                        aria-hidden="true"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <div className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'} truncate`}>
                                            {item.label}
                                        </div>
                                        <div className="hidden lg:block text-xs text-foreground-muted truncate">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:pl-6 py-6 lg:border-l">{children}</main>
        </div>
    )
}

const navigationItems = [
    {
        id: "profile",
        label: "Profile",
        icon: UserRound,
        href: "/account/profile",
        description: "Personal information",
    },
    {
        id: "addresses",
        label: "Addresses",
        icon: BookUser,
        href: "/account/addresses",
        description: "Shipping addresses",
    },
    {
        id: "orders",
        label: "Orders",
        icon: Package,
        href: "/account/orders",
        description: "Order history",
    },
    {
        id: "wishlist",
        label: "Wishlist",
        icon: Heart,
        href: "/account/wishlist",
        description: "Saved items",
    },
    {
        id: "measurement",
        label: "Measure",
        icon: PencilRuler,
        href: "/account/measurement",
        description: "Custom sizing",
    },
]

type DashLayoutProp = {
    customer: StoreCustomer
} & React.PropsWithChildren