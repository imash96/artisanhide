import { Package } from "lucide-react";

export default function Orders() {
    return (
        <>
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                    <Package size={20} className="text-brown" />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium text-brown">
                        Orders
                    </h2>
                </div>
                <p className="text-sm text-gray-600 max-w-prose">
                    Review your recent and past orders in one place. Track shipping progress, view order details, and reorder your favorite items with ease.
                </p>
            </div>
        </>
    )
}