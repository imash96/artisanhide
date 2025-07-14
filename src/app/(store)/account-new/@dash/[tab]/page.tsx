import Addresses from "@modules/account/templates/addresses"
import Measurements from "@modules/account/templates/measurements"
import Orders from "@modules/account/templates/orders"
import Profile from "@modules/account/templates/profile"
import Wishlist from "@modules/account/templates/wishlist"
import { notFound } from "next/navigation"

export default function Page({ params }: DashPageProps) {
    const renderContent = async () => {
        switch ((await params).tab) {
            case "profile":
                return <Profile />
            case "addresses":
                return <Addresses />
            case "orders":
                return <Orders />
            case "wishlist":
                return <Wishlist />
            case "measurements":
                return <Measurements />
            default:
                return notFound()
        }
    }
    return renderContent()
}

type DashPageProps = {
    params: Promise<{ tab: string }>
}