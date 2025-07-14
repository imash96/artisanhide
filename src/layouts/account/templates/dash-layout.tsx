"use client"

import { User, MapPin, Package, Heart, Ruler, LogOut, ArrowLeft } from "lucide-react";
import { StoreCustomer } from "@medusajs/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import Button from "@modules/common/custom-button";
import { signout } from "@libs/actions/customer";
import clx from "@libs/util/clx";

export default function DashLayout({ customer, children }: DashLayoutProp) {
    const pathname = usePathname()
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b border-neutral-700 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Home</span>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                                    <span className="text-black font-bold text-sm">LJ</span>
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-white">My Account</h1>
                                    <p className="text-xs text-neutral-400">Welcome back, {customer.first_name}</p>
                                    <span>{customer.email}</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={signout}
                            variant="outline"
                            className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Navigation */}
                    <aside className="lg:w-80 flex-shrink-0">
                        {/* Single Navigation Container - Responsive Styling */}
                        <div className="bg-neutral-800/30 border-neutral-700 rounded-lg p-6 lg:p-0 lg:border-none lg:bg-transparent">
                            <h2 className="text-lg font-semibold text-white mb-6 hidden lg:block">Account Menu</h2>
                            <nav className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar lg:flex-col lg:space-x-0 lg:space-y-2 lg:pb-0">
                                {navigationItems.map((item) => {
                                    const isActive = pathname === item.href
                                    const Icon = item.icon

                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={clx(
                                                // Base styles for mobile (card-like default)
                                                "flex-shrink-0 w-32 p-4 border rounded-lg text-center space-y-2 transition-all",
                                                isActive
                                                    ? "bg-amber-600/20 border-amber-600/50 text-amber-400"
                                                    : "bg-neutral-800/30 border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white",

                                                // Desktop overrides (lg:)
                                                "lg:w-full lg:flex lg:items-center lg:justify-between lg:p-3 lg:text-left lg:space-y-0 lg:space-x-3 lg:bg-transparent lg:border-none lg:hover:bg-neutral-700/50",
                                                isActive && "lg:bg-amber-600/20 lg:border lg:border-amber-600/30 lg:text-amber-400",
                                            )}
                                        >
                                            <div className="relative lg:flex lg:items-center lg:space-x-3 lg:flex-1">
                                                <Icon
                                                    className={clx("w-6 h-6 mx-auto lg:mx-0", isActive ? "text-amber-400" : "text-neutral-400")}
                                                />
                                                <div className="lg:flex-1">
                                                    <div
                                                        className={clx(
                                                            "text-sm font-medium",
                                                            isActive ? "text-amber-400" : "text-neutral-300 lg:text-white",
                                                        )}
                                                    >
                                                        {item.label}
                                                    </div>
                                                    <div className="hidden lg:block text-xs text-neutral-500">{item.description}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content remains the same */}
                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </div>
        </div>
    )
}

const navigationItems = [
    {
        id: "profile",
        label: "Profile",
        icon: User,
        href: "/account/profile",
        description: "Personal information",
    },
    {
        id: "addresses",
        label: "Addresses",
        icon: MapPin,
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
        label: "Measurements",
        icon: Ruler,
        href: "/account/measurements",
        description: "Custom sizing",
    },
];

type DashLayoutProp = {
    customer: StoreCustomer;
} & React.PropsWithChildren