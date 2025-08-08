"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@modules/common/custom-modal"
import { useState } from "react"
import { X } from "lucide-react"
import MeasurementForm from "./measurement-form"
import { Measurement } from "@/types/measurement"

export default function MeasurementModal({ measurement, children }: MeasurementModalProps) {
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
                            {"Edit Measurement"}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600">
                            {"Update the measurement and save your changes."}
                        </DialogDescription>
                    </div>
                    <DialogClose
                        className="text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-1 transition-colors"
                        aria-label="Close dialog"
                    >
                        <X className="w-5 h-5" />
                    </DialogClose>
                </DialogHeader>

                <MeasurementForm
                    measurement={measurement}
                    onClose={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

type MeasurementModalProps = {
    measurement: Measurement
} & React.PropsWithChildren