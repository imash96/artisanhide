import InteractiveLink from "@modules/common/interactive-link"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "404",
    description: "Something went wrong",
}

export default async function NotFound() {
    return (
        <div className="col-span-full flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p className="text-sm">
                The page you tried to access does not exist.
            </p>
            <InteractiveLink href="/">Go to frontpage</InteractiveLink>
        </div>
    )
}