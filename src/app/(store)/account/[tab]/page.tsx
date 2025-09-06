export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/action/customer"
import { listRegions } from "@lib/action/region"
import Addresses from "@module/account/templates/addresses"
import Measurement from "@module/account/templates/measurement"
import Orders from "@module/account/templates/orders"
import Profile from "@module/account/templates/profile"
import Wishlist from "@module/account/templates/wishlist"

export default async function Page({ params }: { params: Promise<{ tab: string }> }) {
    const [customer, regions] = await Promise.all([retrieveCustomer("+measurements.*,wishlist.items.product.*"), listRegions()]);
    if (!customer || !regions) notFound()

    const renderContent = async () => {
        switch ((await params).tab) {
            case "profile":
                return <Profile customer={customer} regions={regions} />
            case "addresses":
                return <Addresses addresses={customer.addresses} regions={regions} />
            case "orders":
                return <Orders />
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