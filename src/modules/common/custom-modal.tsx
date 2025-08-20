"use client"

import { Dialog, DialogPortal, DialogTrigger, DialogClose, DialogOverlay as DialogOverlayPri, DialogContent as DialogContentPri, DialogTitle as DialogTitlePri, DialogDescription as DialogDescriptionPri } from "@radix-ui/react-dialog"

function DialogOverlay(props: React.ComponentPropsWithoutRef<typeof DialogOverlayPri>) {
    return (
        <DialogOverlayPri
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            {...props}
        />
    )
}

function DialogContent({ className = "", children, position = "default", rounded = true, ...props }: React.ComponentPropsWithoutRef<typeof DialogContentPri> & { position?: "default" | "bottom", rounded?: boolean }) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogContentPri
                aria-modal="true"
                className={`fixed flex flex-col m-auto ${position === "bottom" ? "bottom-0" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} z-50 w-full sm:w-11/12 max-w-lg max-h-[85vh] bg-white border border-gray-200 shadow-xl ${rounded && "rounded-lg sm:rounded-xl"} outline-none focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 ${className ?? ""}`}
                {...props}
            >
                {children}
            </DialogContentPri>
        </DialogPortal>
    )
}

function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-start justify-between p-4 ${className ?? ""}`} {...props} />
}

function DialogTitle({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof DialogTitlePri>) {
    return <DialogTitlePri className={`text-lg sm:text-xl font-semibold leading-none tracking-tight", ${className ?? ""}`} {...props} />
}

function DialogDescription({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof DialogDescriptionPri>) {
    return <DialogDescriptionPri className={`text-sm text-gray-500", ${className ?? ""}`} {...props} />
}

export {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
}
