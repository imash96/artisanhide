import { Measurement } from "@/types/measurement"
import { ProductWishlist } from "@/types/wishlist"
import { StoreOrder } from "@medusajs/types"

export declare module "@medusajs/types/dist/http/customer/store" {
    declare interface StoreUpdateCustomer {
        measurements?: Measurement[]
    }
}

export declare module "@medusajs/types/dist/http/customer/store" {
    declare interface StoreCustomer {
        measurements?: Measurement[]
        wishlists?: ProductWishlist[]
        orders?: StoreOrder[]
    }
}