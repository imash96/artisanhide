"use client"

import { User, MapPin, Package, Heart, Ruler, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { signout } from "@libs/actions/customer"

const menuItems = [
    { title: "Profile", href: "/account/profile", icon: User },
    { title: "Addresses", href: "/account/addresses", icon: MapPin },
    { title: "Orders", href: "/account/orders", icon: Package },
    { title: "Wishlist", href: "/account/wishlist", icon: Heart },
    { title: "Measure", href: "/account/measurements", icon: Ruler },
    { title: "Logout", href: null, icon: LogOut },
]

export default function Layout({ children }: React.PropsWithChildren) {
    const pathname = usePathname()

    const handleLogout = async () => await signout()

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-10 gap-4 py-6 md:py-10 lg:py-12">
            {/* Make sure this parent allows space and has no overflow restriction */}
            <div className="lg:col-span-3 relative">
                <div className="lg:sticky top-20">
                    <nav className="p-1 lg:px-4">
                        <div className="flex gap-1 bg-gray-100 rounded-md lg:bg-transparent lg:flex-col lg:space-y-2 lg:gap-0 lg:rounded-none">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href
                                const classNames = `flex items-center gap-1 py-2 px-1 rounded-md transition-all duration-200 font-medium flex-1 flex-col text-xs lg:flex-none lg:flex-row lg:gap-3 lg:px-4 lg:py-3 lg:text-base lg:text-left lg:w-full lg:justify-start ${isActive
                                        ? "bg-white text-brown shadow-sm lg:bg-brown/10 lg:border lg:border-brown"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50 lg:hover:bg-gray-100"
                                    }`

                                if (item.href) {
                                    return (
                                        <Link key={item.title} href={item.href} className={classNames}>
                                            <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                                            <span className="lg:text-gray-900">{item.title}</span>
                                        </Link>
                                    )
                                }

                                return (
                                    <button
                                        key={item.title}
                                        onClick={handleLogout}
                                        className={classNames}
                                        type="button"
                                    >
                                        <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                                        <span className="lg:text-gray-900">{item.title}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </nav>
                </div>
            </div>
            <div className="lg:col-span-7">{children}</div>
        </div>
    )
}
