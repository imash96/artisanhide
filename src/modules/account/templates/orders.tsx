import { StoreOrder } from "@medusajs/types";
import { Heart, Package } from "lucide-react";
import OrderCard from "../components/order-card";

export default function Orders({ orders }: { orders: StoreOrder[] | undefined }) {
    return (
        <section aria-labelledby="order-history-title" className="space-y-4">
            <header className="space-y-2">
                <div className="flex items-center gap-2">
                    <Package size={20} className="text-brown" />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium text-brown">
                        Order history
                    </h2>
                </div>
                <p className="text-sm text-gray-600 max-w-prose">
                    Check the status of recent orders. Track shipping progress, manage returns, and discover similar products.
                </p>
            </header>
            {/* Wishlist Items */}
            {orders && orders.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-gray-300 rounded-lg">
                    <Package size={36} className="mb-2 text-gray-400" />
                    <p className="text-lg">No orders found.</p>
                    <p className="text-gray-500 text-sm">Start shopping to see your order history here!</p>
                </div>
            )}
        </section>
    )
}