import { Measurement } from "@/types/measurement"

export declare module "@medusajs/types/dist/http/customer/store" {
    declare interface StoreUpdateCustomer {
        measurements?: Measurement[]
    }
}

export declare module "@medusajs/types/dist/http/customer/store" {
    declare interface StoreCustomer {
        measurements?: Measurement[]
    }
}