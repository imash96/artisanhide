"use client"

import { Edit, LoaderCircle, LocateFixed, MapPinCheckInside, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { deleteCustomerAddress } from "@libs/actions/customer"
import { StoreCustomer } from "@medusajs/types";
import AddressModal from "./address-modal"
import Tag from "./tag";

export default function AddressCard({ address, addressLines, countryOptions }: AddressCardProps) {
    const [isRemoving, startTransition] = useTransition();
    return (
        <div className="border rounded-lg p-5 min-h-60 flex flex-col bg-white shadow-sm">
            <div className="mt-1 flex-1">
                <h3 className="text-base font-semibold mb-1">
                    {address.first_name} {address.last_name}
                </h3>
                {address.company && (
                    <div className="text-sm font-light text-gray-600 mb-1">{address.company}</div>
                )}
                <div className="text-sm leading-relaxed space-y-1">
                    {addressLines.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-start mt-2">
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                    {address.address_name && <Tag icon={LocateFixed} text={address.address_name} color={"bg-orange-100 text-amber-700 border-amber-300"} />}
                    {address.is_default_shipping && <Tag icon={MapPinCheckInside} text={"Default"} color={"bg-green-50 text-green-700 border-green-200"} />}
                </div>
                <div className="flex gap-2">
                    <AddressModal mode="edit" address={address} countryOptions={countryOptions}>
                        <button
                            aria-label="Edit address"
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brown"
                        >
                            <Edit size={16} />
                        </button>
                    </AddressModal>
                    <button
                        aria-label="Delete address"
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-400"
                        onClick={() => startTransition(() => deleteCustomerAddress(address.id))}
                    >
                        {isRemoving ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

type AddressCardProps = {
    address: NonNullable<StoreCustomer["addresses"]>[number];
    addressLines: string[];
    countryOptions: {
        label: string,
        value: string
    }[];
};