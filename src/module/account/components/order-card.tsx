import { StoreOrder } from "@medusajs/types";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function OrderCard({ order }: { order: StoreOrder }) {
    return (
        <section aria-labelledby={`order-${order.id}-title`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            {/* Header */}
            <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
                <h3 id={`order-${order.id}-title`} className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    Order placed on{" "}
                    <time dateTime={order.created_at.toString()} className="font-semibold">
                        {order.created_at.toString()}
                    </time>
                </h3>

                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Facts */}
                    <dl className="grid grid-cols-2 xs:grid-cols-3 gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-700 w-full sm:w-auto">
                        <div className="min-w-0">
                            <dt className="font-medium text-gray-500">Order number</dt>
                            <dd className="font-semibold text-gray-900 break-all">{order.display_id}</dd>
                        </div>
                        <div className="min-w-0">
                            <dt className="font-medium text-gray-500">Date placed</dt>
                            <dd className="font-semibold text-gray-900">
                                <time dateTime={order.created_at.toString()}>{order.created_at.toString()}</time>
                            </dd>
                        </div>
                        <div className="min-w-0">
                            <dt className="font-medium text-gray-500">Total amount</dt>
                            <dd className="font-semibold text-gray-900">${order.total}</dd>
                        </div>
                    </dl>

                    {/* Actions */}
                    <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                        <a
                            href="#"
                            className="w-full xs:w-auto inline-flex justify-center items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            <span>View Order</span>
                            <span className="sr-only"> {order.display_id}</span>
                        </a>
                        <a
                            href="#"
                            className="w-full xs:w-auto inline-flex justify-center items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            <span>View Invoice</span>
                            <span className="sr-only"> for order {order.display_id}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Items */}
            <h4 className="text-sm sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Items</h4>
            <ul role="list" className="divide-y divide-gray-200">
                {order.items?.map((product) => (
                    <li key={product.id} className="py-4 sm:py-6 lg:py-8 grid grid-cols-[88px,1fr] gap-3 sm:flex sm:flex-row sm:items-start sm:gap-5 border-b border-gray-100 last:border-b-0">
                        {/* Image */}
                        <div className="w-[88px] h-[88px] sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <Image
                                src={product.thumbnail || "/svg/placeholder.svg?height=128&width=128&query=product-image"}
                                alt={product.title}
                                loading="lazy"
                                decoding="async"
                                sizes="(min-width: 768px) 8rem, (min-width: 640px) 7rem, 5.5rem"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 flex flex-col justify-between">
                            {/* Title + Price */}
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h5 className="text-sm sm:text-base font-medium text-gray-900 truncate">{product.title}</h5>
                                    <p className="text-sm sm:text-base font-semibold text-gray-900 flex-shrink-0">
                                        ${product.total}
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">{product.product_description}</p>
                            </div>

                            {/* Status + Actions */}
                            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                                    <p>
                                        Delivered on <time dateTime={product.updated_at.toString()}>{product.updated_at.toString()}</time>
                                    </p>
                                </div>

                                <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                                    <a
                                        href="#"
                                        className="w-full xs:w-auto inline-flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        View product
                                    </a>
                                    <a
                                        href="#"
                                        className="w-full xs:w-auto inline-flex justify-center items-center px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        Buy again
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}