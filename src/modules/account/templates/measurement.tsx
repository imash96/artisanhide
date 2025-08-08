import { StoreCustomer } from "@medusajs/types";
import { PencilRuler } from "lucide-react";
import MeasurementAdd from "../components/measurement-add";
import MeasurementCard from "../components/measurement-card";


export default function Measurement({ customer }: { customer: StoreCustomer }) {
    const { measurements } = customer
    return (
        <>
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                    <PencilRuler size={20} className="text-brown" />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium text-brown">
                        Measurements
                    </h2>
                </div>
                <p className="text-sm text-gray-600 max-w-prose">
                    View and update your measurement. You can add as many as you like. Saving your measurements makes them available during checkout.
                </p>
            </div>
            {/* Add new address card */}
            <MeasurementAdd />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {measurements?.length === 0 && (
                    <div className="col-span-full border rounded-lg p-6 min-h-48 flex flex-col items-center justify-center text-center">
                        <p className="text-base font-medium mb-2">No saved measurements</p>
                        <p className="text-sm text-gray-500">
                            Add a measurement to speed up future checkouts for custom jackets.
                        </p>
                    </div>
                )}

                {measurements?.map((measurement) => {
                    // const addrLines = formatAddress(address);
                    return <MeasurementCard key={measurement.id} measurement={measurement} />
                })}
            </div>
        </>
    )
}