"use client"

import { useToggleStore } from "libs/store/use-toggle-drawer"
import { Search, X } from "lucide-react"
import Drawer from "./drawer"

export default function MobileDrawerClient({ children }: React.PropsWithChildren) {
    const { isMenuDrawerOpen, toggleMenuDrawer } = useToggleStore()

    return (
        <Drawer state={isMenuDrawerOpen} onClose={toggleMenuDrawer} direction="left" >
            <div className="flex flex-col justify-between text-gray-900 bg-gray-50 w-full">
                <div className="flex justify-between px-4 py-3 border-b border-gray-300 z-10 bg-gray-100">
                    <button className="rounded-md button-sec" onClick={toggleMenuDrawer}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>
                {children}
                <div className="flex justify-between px-4 py-3 border-t border-gray-300 z-10 bg-gray-100" onClick={toggleMenuDrawer}>
                    <button className="rounded-md button-sec">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </Drawer>
    )
}