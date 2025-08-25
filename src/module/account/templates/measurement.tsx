import { StoreCustomer } from "@medusajs/types";
import { PencilRuler } from "lucide-react";
import MeasurementAdd from "../components/measurement-add";
import MeasurementCard from "../components/measurement-card";

export default function Measurement({ customer }: { customer: StoreCustomer }) {
    const { measurements } = customer
    return (
        <section className="space-y-4">
            <header className="space-y-2">
                <div className="flex items-center gap-2">
                    <PencilRuler size={20} />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium">
                        Measurements
                    </h2>
                </div>
                <p className="text-sm text-foreground-muted max-w-prose">
                    View and update your measurement. You can add as many as you like. Saving your measurements makes them available during checkout.
                </p>
            </header>
            {/* Add new address card */}
            <MeasurementAdd />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {measurements && measurements.length > 0 ?
                    measurements?.map((measurement) => {
                        // const addrLines = formatAddress(address);
                        return <MeasurementCard key={measurement.id} measurement={measurement} />
                    }) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-10 text-center border border-dashed border-foreground-muted rounded-lg">
                            <PencilRuler size={36} className="mb-2 text-foreground-muted" />
                            <p className="text-lg">No saved measurements</p>
                            <p className="text-foreground-muted text-sm">Add a measurement to speed up future checkouts for custom jackets.</p>
                        </div>
                    )}
            </div>
        </section>
    )
}