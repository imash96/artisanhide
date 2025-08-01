"use client"

import { UserRound, BookUser, Package, Heart, PencilRuler, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signout } from "@libs/actions/customer"
import { StoreCustomer } from "@medusajs/types"

export default function DashLayout({ customer, children }: DashLayoutProp) {
    const pathname = usePathname()

    const handleLogout = async () => await signout()

    const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer';

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="lg:mx-4 lg:sticky top-16 h-fit space-y-4 divide-y border-b lg:border-b-0 lg:pr-0">
                {/* Customer Info */}
                <div className="flex items-center gap-4 py-4 px-4">
                    <div className="min-w-[60px] h-[60px] flex items-center justify-center rounded-full border border-[#c17345]">
                        <UserRound size={26} className="text-[#c17345]" strokeWidth={1.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold truncate">{fullName}</h3>
                        <p className="text-sm text-gray-600 truncate">{customer.email}</p>
                        <button
                            onClick={handleLogout}
                            className="mt-1 inline-flex items-center gap-1 text-xs font-light underline underline-offset-2 text-red-600 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-500"
                            aria-label="Logout"
                        >
                            Logout <LogOut size={14} strokeWidth={1.5} />
                        </button>
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
                                className={`flex items-center m-1 gap-3 border-b-4 lg:border-b-0 lg:border-l-4 px-4 py-2 lg:px-3 lg:py-2.5 rounded-md transition-colors duration-150 ${isActive ? 'bg-[#f7f3ef] border-[#c17345] text-[#c17345]' : 'hover:bg-gray-100 lg:border-transparent hover:border-gray-300'} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1`}
                            >
                                <div className="flex w-full flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3">
                                    <item.icon
                                        size={20}
                                        strokeWidth={1.2}
                                        className={isActive ? 'text-[#c17345]' : 'text-gray-400'}
                                        aria-hidden="true"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <div className={`text-sm ${isActive ? 'font-semibold' : 'font-medium text-gray-700'} truncate`}>
                                            {item.label}
                                        </div>
                                        <div className="hidden lg:block text-xs text-gray-500 truncate">
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
        id: "measurements",
        label: "Measure",
        icon: PencilRuler,
        href: "/account/measurements",
        description: "Custom sizing",
    },
]

type DashLayoutProp = {
    customer: StoreCustomer
} & React.PropsWithChildren