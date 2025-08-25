"use client"

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDrawer } from "@lib/context/drawer-context";

const HOME_REGEX = /^\/?$/

export default function HeaderClient({ children }: React.PropsWithChildren) {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    const { activeCategory } = useDrawer();

    const isHome = useMemo(() => HOME_REGEX.test(pathname), [pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 35);

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Trigger scroll detection on mount (in case page is already scrolled)
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${"group/nav sticky top-0 z-10 transition-colors ease-out duration-300 hover:text-foreground hover:bg-background"} ${isScrolled || !isHome || activeCategory ? "bg-background shadow-md shadow-border text-foreground" : "bg-transparent text-same-white group-hover/nav:text-foreground"}`}>
            {children}
        </div>
    )
}