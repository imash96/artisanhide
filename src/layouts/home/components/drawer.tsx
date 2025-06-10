import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function Drawer({ state, onClose, direction = "left", type, children }: DrawerProps) {

    return (
        <Dialog open={state} onClose={onClose} className="relative z-10">
            <DialogBackdrop transition className="fixed inset-0 bg-black/40 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
            <div className="fixed inset-0">
                <DialogPanel transition className={`fixed flex h-full w-11/12 sm:w-5/6 max-w-md bg-white shadow-2xl transform transition duration-300 ease-in-out ${direction === "left" ? "data-closed:-translate-x-full" : "data-closed:translate-x-full top-0 right-0"}`} >
                    {children}
                </DialogPanel>
            </div>
        </Dialog >
    )
}

type DrawerProps = {
    state: boolean
    onClose: () => void
    direction: "left" | "right"
    type?: "cart" | undefined
} & React.PropsWithChildren