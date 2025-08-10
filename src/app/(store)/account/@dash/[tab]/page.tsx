import { retrieveCustomer } from "@libs/actions/customer"
import { listRegions } from "@libs/actions/region"
import Addresses from "@modules/account/templates/addresses"
import Measurement from "@modules/account/templates/measurement"
import Orders from "@modules/account/templates/orders"
import Profile from "@modules/account/templates/profile"
import Wishlist from "@modules/account/templates/wishlist"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ tab: string }> }) {
    const [customer, regions] = await Promise.all([retrieveCustomer("+*orders,*measurements,wishlist.items.product.*"), listRegions()]);
    if (!customer || !regions) notFound()

    const renderContent = async () => {
        switch ((await params).tab) {
            case "profile":
                return <Profile customer={customer} regions={regions} />
            case "addresses":
                return <Addresses addresses={customer.addresses} regions={regions} />
            case "orders":
                return <Orders orders={customer.orders} />
            case "wishlist":
                return <Wishlist wishlist={customer.wishlist} />
            case "measurement":
                return <Measurement customer={customer} />
            default:
                return notFound()
        }
    }
    return renderContent()
}