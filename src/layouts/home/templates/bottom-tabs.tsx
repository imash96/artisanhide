"use client";

import { usePathname } from "next/navigation";
import { Home, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useDrawer } from "@libs/context/drawer-context";
import Link from "next/link"

export default function BottomTabs() {
  const pathname = usePathname();
  const { toggleCartDrawer, toggleMenuDrawer } = useDrawer();
  if (pathname.includes("/product")) return null;

  const isActive = (path: string) => pathname === path;
  const tabs = [
    { type: "link", href: "/", label: "Home", Icon: Home, },
    { type: "button", onClick: toggleMenuDrawer, label: "Menu", Icon: Menu, },
    { type: "button", onClick: toggleMenuDrawer, label: "Search", Icon: Search },
    { type: "button", onClick: toggleCartDrawer, label: "Cart", Icon: ShoppingBag, },
    { type: "link", href: "/account", label: "Account", Icon: User, }
  ];
  const commonClasses = "grid gap-1 place-content-center place-items-center transition active:scale-95 active:bg-accent/20 focus:outline-none focus:ring-0";
  return (
    <nav className="lg:hidden h-[65px] fixed bottom-0 left-0 z-20 w-full border-t border-border bg-background-elevated shadow-lg rounded-t-2xl grid grid-cols-5 select-none">
      {tabs.map(({ type, href, onClick, label, Icon }) => {
        const active = href ? isActive(href) : false;
        return type === "link" ?
          <Link key={label} href={href!} aria-label={label} className={`${commonClasses} ${active && "text-primary font-medium"}`} >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} className={active ? "text-primary" : "text-foreground-muted"} />
            <span className="text-xs font-light tracking-wide">{label}</span>
          </Link> :
          <button key={label} onClick={onClick} aria-label={label} className={commonClasses} >
            <Icon size={22} strokeWidth={1.5} className="text-foreground-muted" />
            <span className="text-xs font-light tracking-wide">{label}</span>
          </button>
      })}
    </nav>
  )
}