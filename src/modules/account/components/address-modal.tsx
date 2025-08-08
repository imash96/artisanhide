"use client"

import { StoreCustomerAddress } from "@medusajs/types"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@modules/common/custom-modal"
import { useState } from "react"
import AddressForm from "./address-form"
import { X } from "lucide-react"

export default function AddressModal({ mode = "create", children, address, countryOptions, isDefaultShipping }: AddressModalProps) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="space-y-1">
                        <DialogTitle className="text-xl font-semibold">
                            {mode === "create" ? "Add New Address" : "Edit Address"}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600">
                            {mode === "create" ? "Enter the shipping address you’d like to save to your account." : "Update the shipping address and save your changes."}
                        </DialogDescription>
                    </div>
                    <DialogClose
                        className="text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-1 transition-colors"
                        aria-label="Close dialog"
                    >
                        <X className="w-5 h-5" />
                    </DialogClose>
                </DialogHeader>

                <AddressForm
                    mode={mode}
                    address={address}
                    countryOptions={countryOptions}
                    isDefaultShipping
                    onClose={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

type AddressModalProps = {
    mode: "create" | "edit"
    address?: StoreCustomerAddress
    countryOptions: {
        value: string;
        label: string;
    }[],
    isDefaultShipping?: boolean
} & React.PropsWithChildren