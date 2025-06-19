"use client"

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const HOME_REGEX = /^\/?$/

export default function HeaderClient({ children }: React.PropsWithChildren) {
    const [isScrolled, setIsScrolled] = useState(false)

    const detectScrollY = useCallback(() => setIsScrolled(window.scrollY > 35), [])
    const pathname = usePathname()
    const isHome = useMemo(() => HOME_REGEX.test(pathname), [pathname]);

    useEffect(() => {
        document.addEventListener("scroll", detectScrollY, { passive: true });
        return () => document.removeEventListener("scroll", detectScrollY);
    }, [detectScrollY]);
    return (
        <div className={`group/nav sticky top-0 z-10 transition-colors ease-in-out duration-300 hover:text-brown hover:bg-gray-100 ${isScrolled ? "bg-gray-100 shadow-md text-brown" : "bg-transparent text-gray-50 group-hover/nav:text-brown"} ${!isHome && "shadow-md"}`}>
            {children}
        </div>
    )
}