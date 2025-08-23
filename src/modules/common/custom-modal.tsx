"use client"

import { Dialog, DialogPortal, DialogTrigger, DialogClose as DialogClosePri, DialogOverlay as DialogOverlayPri, DialogContent as DialogContentPri, DialogTitle as DialogTitlePri, DialogDescription as DialogDescriptionPri } from "@radix-ui/react-dialog"
import { X } from "lucide-react"

function DialogOverlay(props: React.ComponentPropsWithoutRef<typeof DialogOverlayPri>) {
    return (
        <DialogOverlayPri
            className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
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
                className={`fixed flex flex-col m-auto bg-background-elevated border-border ${position === "bottom" ? "bottom-0" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} z-50 w-full sm:w-11/12 max-w-lg max-h-[85vh] border shadow-xl ${rounded && "rounded-lg sm:rounded-xl"} outline-none focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 ${className}`}
                {...props}
            >
                {children}
            </DialogContentPri>
        </DialogPortal>
    )
}

function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-start justify-between p-4 ${className}`} {...props} />
}

function DialogTitle({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof DialogTitlePri>) {
    return <DialogTitlePri className={`text-lg sm:text-xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}

function DialogDescription({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof DialogDescriptionPri>) {
    return <DialogDescriptionPri className={`text-sm  text-foreground-muted ${className}`} {...props} />
}

function DialogClose({ className = "", children, ...props }: React.ComponentPropsWithoutRef<typeof DialogClosePri>) {
    return <DialogClosePri aria-label="Close dialog" className={`text-btn-destructive hover:bg-background-muted hover:text-btn-destructive-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-destructive-hover rounded p-1 transition-colors ${className}`} {...props} >
        {children ? children : <X className="w-5 h-5" />}
    </DialogClosePri>
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
