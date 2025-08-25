import { StoreCustomerAddress, StoreRegion } from "@medusajs/types"
import { BookUser, PlusIcon } from "lucide-react"
import { useMemo } from "react"
import AddressCard from "../components/address-card"
import AddressModal from "../components/address-modal"

export default function Addresses({ addresses, regions }: AddressBookProps) {
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
        <section className="space-y-4">
            <header className="space-y-2">
                <div className="flex items-center gap-2">
                    <BookUser size={20} />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium">
                        Addresses
                    </h2>
                </div>
                <p className="text-sm text-foreground-muted max-w-prose">
                    View and update your shipping addresses. You can add as many as you like. Saving your addresses makes them available during checkout.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AddressModal mode="create" countryOptions={countryOptions} isDefaultShipping={isNoAddress}>
                    <button
                        className="border border-border rounded-lg bg-background-elevated p-5 min-h-60 w-full flex flex-col justify-center items-center gap-2 hover:bg-background-muted transition"
                        aria-label="Add new address"
                    >
                        <PlusIcon className="w-8 h-8" />
                        <span className="text-base font-semibold">New Address</span>
                    </button>
                </AddressModal>

                {isNoAddress && (
                    <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-base font-medium mb-2">No saved addresses</p>
                        <p className="text-sm text-foreground-muted">
                            Add a shipping address to speed up future checkouts.
                        </p>
                    </div>
                )}

                {addresses.map(address => {
                    const addrLines = formatAddress(address);
                    return <AddressCard key={address.id} address={address} addressLines={addrLines} countryOptions={countryOptions} />

                })}
            </div>
        </section>
    )
}

type AddressBookProps = {
    addresses: StoreCustomerAddress[]
    regions: StoreRegion[]
}