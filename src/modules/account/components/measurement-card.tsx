"use client"

import { Edit, LoaderCircle, Trash2 } from "lucide-react"
import { useTransition } from "react"
import AddressesEdit from "../components/addresses-edit"
import { deleteCustomerAddress } from "@libs/actions/customer"
import { Measurement } from "@/types/measurement"

export default function MeasurementCard({ measurement }: MeasurementCardProps) {
    const [isRemoving, startTransition] = useTransition();
    return (
        <div className="border rounded-lg p-5 flex flex-col bg-white shadow-sm">
            <div className="mt-1 flex-1">
                <h3 className="text-base font-semibold mb-1">
                    {measurement.name}
                </h3>
                {measurement.info && (
                    <div className="text-sm font-light text-gray-600 mb-1">{measurement.info}</div>
                )}
                <div className="text-sm leading-relaxed space-y-1">
                    {measurement.measurements ? Object.entries(measurement.measurements).map(([key, value]) => (
                        <span key={key}>{key}: {value} in</span>
                    )) : <span>Measurement not available</span>}
                </div>
            </div>
            <div className="flex justify-between items-start mt-2">
                <div className="flex flex-wrap gap-2">

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-amber-700 text-xs font-medium rounded-full border border-amber-300">
                        {measurement.type}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                        {measurement.gender}
                    </span>

                </div>
                <div className="flex gap-2">
                    {/* <AddressesEdit address={address} countryOptions={countryOptions}>
                        <button
                            aria-label="Edit address"
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brown"
                        >
                            <Edit size={16} />
                        </button>
                    </AddressesEdit> */}
                    <button
                        aria-label="Delete address"
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-400"
                        onClick={() => startTransition(() => deleteCustomerAddress(measurement.id))}
                    >
                        {isRemoving ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

type MeasurementCardProps = {
    measurement: Measurement;
};