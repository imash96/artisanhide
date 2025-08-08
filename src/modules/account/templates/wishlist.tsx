import { Heart } from "lucide-react";


export default function Wishlist() {
    return (
        <>
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                    <Heart size={20} className="text-brown" />
                    <h2 className="text-lg lg:text-xl uppercase tracking-wide font-medium text-brown">
                        Wishlist
                    </h2>
                </div>
                <p className="text-sm text-gray-600 max-w-prose">
                    View and manage the products you’ve saved for later. Your wishlist helps you keep track of items you love and makes it easy to add them to your cart.
                </p>
            </div>
        </>
    )
}