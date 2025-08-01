import { retrieveCustomer } from "@libs/actions/customer"
import { getRegion, listRegions } from "@libs/actions/region"
import Addresses from "@modules/account/templates/addresses"
import Measurements from "@modules/account/templates/measurements"
import Orders from "@modules/account/templates/orders"
import Profile from "@modules/account/templates/profile"
import Wishlist from "@modules/account/templates/wishlist"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export default async function Page({ params }: DashPageProps) {
    const customer = await retrieveCustomer()
    const regions = await listRegions()
    const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
    const region = await getRegion(countryCode)

    if (!customer || !regions || !region) {
        notFound()
    }

    const renderContent = async () => {
        switch ((await params).tab) {
            case "profile":
                return <Profile customer={customer} regions={regions} />
            case "addresses":
                return <Addresses customer={customer} region={region} />
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