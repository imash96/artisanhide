"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"

type LocalizedClientLinkProps = LinkProps & {
    className?: string
} & React.PropsWithChildren

export default function LocalizedClientLink({ children, href, ...props }: LocalizedClientLinkProps) {
    const { countryCode } = useParams()

    return (
        <Link href={`/${countryCode}${href}`} {...props}>
            {children}
        </Link>
    )
}