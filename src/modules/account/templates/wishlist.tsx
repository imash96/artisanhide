import { ProductWishlist } from "@/types/wishlist";
import ProductCard from "@modules/home/components/product-card";
import { Heart } from "lucide-react";

export default function Wishlist({ wishlists }: { wishlists?: ProductWishlist[] }) {
    return (
        <section className="space-y-4">
            {/* Header */}
            <header className="space-y-2">
                <div className="flex items-center gap-2">
                    <Heart size={20} className="text-brown" />
                    <h2 className="text-lg lg:text-xl font-medium tracking-wide uppercase text-brown">
                        Wishlist
                    </h2>
                </div>
                <p className="text-sm text-gray-600 max-w-prose">
                    View and manage the products you’ve saved for later. Your wishlist helps you keep track of items you love and makes it easy to add them to your cart.
                </p>
            </header>

            {/* Wishlist Items */}
            {wishlists && wishlists.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlists.map(({ id, product }) => (
                        <ProductCard key={id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-gray-300 rounded-lg">
                    <Heart size={36} className="mb-2 text-gray-400" />
                    <p className="text-lg">No product found.</p>
                    <p className="text-gray-500 text-sm">Start exploring to see your wishlist items here!</p>
                </div>
            )}
        </section>
    );
}
