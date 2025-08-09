import { StoreProduct } from "@medusajs/types";

export type ProductWishlist = {
    id: string;
    customer_id: string;
    product_id: string;
    product: StoreProduct
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}