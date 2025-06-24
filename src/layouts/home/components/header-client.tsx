"use client"

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const HOME_REGEX = /^\/?$/

export default function HeaderClient({ children }: React.PropsWithChildren) {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    const isHome = useMemo(() => HOME_REGEX.test(pathname), [pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 35);

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Trigger scroll detection on mount (in case page is already scrolled)
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const baseClasses = "group/nav sticky top-0 z-10 transition-colors ease-in-out duration-300 hover:text-brown hover:bg-gray-100";
    const scrolledClasses = isScrolled || !isHome ? "bg-gray-100 shadow-md text-brown" : "bg-transparent text-gray-50 group-hover/nav:text-brown";

    return (
        <div className={`${baseClasses} ${scrolledClasses}`}>
            {children}
        </div>
    )
}