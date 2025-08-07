import { StoreCustomer, StoreCustomerAddress, StoreRegion } from "@medusajs/types"
import { BookUser } from "lucide-react"
import AddressesAdd from "../components/addresses-add"
import { useMemo } from "react"
import AddressCard from "../components/address-card"

export default function Addresses({ customer, regions }: AddressBookProps) {
    const { addresses = [] } = customer
    const isNoAddress = addresses.length === 0

    const countryOptions = useMemo(() => regions.flatMap((region) => (region.countries ?? []).map((country) => {
        if (!country?.iso_2) return null;
        return {
            value: country.iso_2,
            label: country.display_name ?? country.iso_2,
        };
    }).filter((opt): opt is { value: string; label: string } => opt !== null)), [regions]);

    const formatAddress = (address: StoreCustomerAddress) => {
        const lines = [];
        const line1 = [address.address_1, address.address_2].filter(Boolean).join(", ");
        if (line1) lines.push(line1);

        const cityLine = [address.city, address.province, address.postal_code].filter(Boolean).join(", ");
        if (cityLine) lines.push(cityLine);

        if (address.country_code) lines.push(address.country_code.toUpperCase());

        return lines;
    };

    return (
        <>
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                    <BookUser size={20} className="text-brown" />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium text-brown">
                        Addresses
                    </h2>
                </div>
                <p className="text-sm text-gray-600 max-w-prose">
                    View and update your shipping addresses. You can add as many as you like.
                    Saving your addresses makes them available during checkout.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Add new address card */}
                <AddressesAdd countryOptions={countryOptions} isDefaultShipping={isNoAddress} />

                {isNoAddress && (
                    <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-base font-medium mb-2">No saved addresses</p>
                        <p className="text-sm text-gray-500">
                            Add a shipping address to speed up future checkouts.
                        </p>
                    </div>
                )}

                {addresses.map((address) => {
                    const addrLines = formatAddress(address);
                    return <AddressCard key={address.id} address={address} addressLines={addrLines} countryOptions={countryOptions} />
                })}
            </div>
        </>
    )
}

type AddressBookProps = {
    customer: StoreCustomer
    regions: StoreRegion[]
}