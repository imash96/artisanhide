"use client"

import {
    User,
    MapPin,
    Package,
    Heart,
    Ruler,
    LogOut,
    UserRound,
} from "lucide-react"
import { StoreCustomer } from "@medusajs/types"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clx from "@libs/util/clx"
import { signout } from "@libs/actions/customer"

export default function DashLayout({ customer, children }: DashLayoutProp) {
    const pathname = usePathname()

    const handleLogout = async () => {
        await signout()
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <aside className="lg:col-span-4 lg:border-r sticky top-24 bg-white">
                <div className="flex items-center gap-2 pb-6">
                    <div className="min-w-[60px] min-h-[60px] flex items-center justify-center rounded-full border border-[#c17345]">
                        <UserRound size={25} className="text-[#c17345]" strokeWidth={1} />
                    </div>
                    <div>
                        <h3 className="text-lg">{customer.first_name} {customer.last_name}</h3>
                        <p className="text-[13px] text-gray-600 tracking-wide font-light">{customer.email}</p>
                        <button type="button" onClick={handleLogout} className="flex items-center gap-2 text-[13px] font-light underline underline-offset-2">
                            Logout
                            <LogOut size={14} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                <nav className="flex overflow-x-auto no-scrollbar border-y border-gray-200 space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2 lg:border-b-0">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={clx(
                                    isActive ? "border-brown text-brown" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                    "inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium",

                                    // Desktop styles
                                    "lg:w-full lg:flex lg:items-center lg:justify-between lg:p-3 lg:bg-transparent lg:border-none lg:hover:bg-neutral-700/50",
                                    isActive &&
                                    "lg:bg-brown lg:border lg:border-brown lg:text-brown"
                                )}
                            >
                                <div className="lg:flex lg:items-center lg:space-x-3 lg:flex-1">
                                    <item.icon className={clx(
                                        "w-6 h-6 mx-auto lg:mx-0",
                                        isActive ? "text-brown" : "text-neutral-400"
                                    )} />
                                    <div className="lg:flex-1">
                                        <div className={clx(
                                            "text-sm font-medium",
                                            isActive ? "text-brown" : "text-brown"
                                        )}>
                                            {item.label}
                                        </div>
                                        <div className="hidden text-xs text-neutral-500 lg:block">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            <main className="lg:col-span-8 min-h-[200vh]">{children}</main>
        </div>
    )
}

const navigationItems = [
    {
        id: "profile",
        label: "Profile",
        icon: User,
        href: "/account-new/profile",
        description: "Personal information",
    },
    {
        id: "addresses",
        label: "Addresses",
        icon: MapPin,
        href: "/account-new/addresses",
        description: "Shipping addresses",
    },
    {
        id: "orders",
        label: "Orders",
        icon: Package,
        href: "/account-new/orders",
        description: "Order history",
    },
    {
        id: "wishlist",
        label: "Wishlist",
        icon: Heart,
        href: "/account-new/wishlist",
        description: "Saved items",
    },
    {
        id: "measurements",
        label: "Measure",
        icon: Ruler,
        href: "/account-new/measurements",
        description: "Custom sizing",
    },
]

type DashLayoutProp = {
    customer: StoreCustomer
} & React.PropsWithChildren
