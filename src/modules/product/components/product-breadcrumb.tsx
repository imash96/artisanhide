import { ChevronRight, Home, Slash } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
    name: string
    href: string
}

type BreadcrumbProps = {
    items: BreadcrumbItem[] | undefined;
    href: string
}

export default function Breadcrumb({ items, href }: BreadcrumbProps) {

    return (
        <nav aria-label="Breadcrumb" className="flex mb-2">
            <ol role="list" className="flex items-center gap-x-1">
                <li>
                    <Link href={href} className="hover:text-gray-700">
                        <Home aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                        <span className="sr-only">Category</span>
                    </Link>
                </li>
                {items?.map((item) => (
                    <li key={item.name}>
                        <div className="flex items-center">
                            <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
                            <Link href={item.href} className="ml-1 text-sm font-medium hover:text-gray-700">
                                {item.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}