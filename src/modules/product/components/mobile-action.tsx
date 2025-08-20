import { StoreProductOption } from '@medusajs/types'
import { useToggleState } from '@libs/hooks/use-toggle-state'
import Button from '@modules/common/custom-button'
import { ChevronDown, X } from 'lucide-react'
import OptionSelect from './option-select'
import { useProduct } from '@libs/context/product-context'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@modules/common/custom-modal"
import AddToCartButton from './add-to-cart'

export default function MobileActions({ pOption, show }: MobileActionsProps) {
    const { isPending, selectedVariant, options } = useProduct()

    return (
        <div className={`lg:hidden inset-x-0 bottom-0 fixed z-40 transition-opacity duration-300 ease-in-out ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="bg-gray-50 flex flex-col gap-y-3 justify-center text-base font-normal p-4 border-t border-gray-200">
                {/* Actions */}
                <div className="grid grid-cols-2 w-full gap-x-4">
                    <MobileModalNew options={pOption} isPending={isPending}>
                        <Button variant="outline" className="w-full" >
                            <div className="flex items-center justify-between w-full">
                                <span className='text-[13px]'>{selectedVariant ? Object.values(options).join(" / ") : "Select Options"}</span>
                                <ChevronDown className="h-5 w-5" />
                            </div>
                        </Button>
                    </MobileModalNew>
                    <AddToCartButton />
                </div>
            </div>
        </div>
    )
}

const MobileModalNew = ({ children, options, isPending }: MobileModalProps) => {

    const { state, toggle } = useToggleState()
    return (
        <Dialog open={state} onOpenChange={toggle}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent position='bottom' rounded={false} >
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

                <div className="px-6 py-6">
                    <div className="flex flex-col gap-y-6">
                        {options?.map((option) => (
                            <OptionSelect
                                key={option.id}
                                option={option}
                                title={option.title ?? ""}
                                disabled={isPending}
                            />
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

type MobileModalProps = {
    isPending: boolean,
    options: StoreProductOption[] | null
} & React.PropsWithChildren


type MobileActionsProps = {
    pOption: StoreProductOption[] | null
    show: boolean
}