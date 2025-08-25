import { ArrowRight } from "lucide-react"
import Link, { LinkProps } from "next/link"

type InteractiveLinkProps = LinkProps & {
    onClick?: () => void
} & React.PropsWithChildren

export default function InteractiveLink({ href, children, onClick, ...props }: InteractiveLinkProps) {
    return (
        <Link className="flex gap-x-1 items-center group" href={href} onClick={onClick} {...props} >
            <span>{children}</span>
            <ArrowRight className="w-4 h-4 group-hover:-rotate-45 ease-in-out duration-150" />
        </Link>
    )
}