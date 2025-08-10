import { StoreProduct } from "@medusajs/types";

export type ProductWishlist = {
    id: string;
    customer_id: string;
    items: ProductWishlistItem[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

type ProductWishlistItem = {
    id: string;
    product_id: string;
    product: StoreProduct;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    product_wishlist_id: string;
}