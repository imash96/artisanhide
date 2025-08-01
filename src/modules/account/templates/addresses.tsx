import { StoreCustomer, StoreRegion } from "@medusajs/types"
import { BookUser } from "lucide-react"
import AddressesAdd from "../components/addresses-add"

export default function Addresses({ customer, region }: AddressBookProps) {
    const { addresses } = customer
    console.log(addresses)
    return (
        <>
            <div className="space-y-2 mb-4">
                <h2 className="text-lg text-brown lg:text-xl uppercase tracking-wide font-medium flex items-center gap-2">
                    <BookUser size={20} /> Addresses
                </h2>
                <p className="text-xs font-light">
                    View and update your shipping addresses, you can add as many as you
                    like. Saving your addresses will make them available during checkout.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-6">
                <AddressesAdd region={region} addresses={addresses} />
                {/* {addresses.map((address) => {
                    return (
                        <EditAddress region={region} address={address} key={address.id} />
                    )
                })} */}
            </div>
        </>
    )
}

type AddressBookProps = {
    customer: StoreCustomer
    region: StoreRegion
}