'use client';
import { StoreCustomerAddress, StoreRegion } from '@medusajs/types';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon, X } from "lucide-react";
import Button from '@modules/common/custom-button';
import Input from '@modules/common/custom-input';
import Select from '@modules/common/custom-select';
import { useActionState, useEffect, useMemo } from 'react';
import { addCustomerAddress } from '@libs/actions/customer';

export default function AddressesAdd({ region, addresses }: AddAddressProps) {
    const [formState, formAction, isPending] = useActionState(addCustomerAddress, {
        isDefaultShipping: addresses?.length === 0,
        success: false,
        error: null,
    })

    useEffect(() => {
        if (formState.success) {
            close()
            formState.success = false;
            formState.error = null;
        }
    }, [formState.success]);

    const countryOptions = useMemo(() => {
        if (!region?.countries) {
            return []
        }

        return region.countries.map((country) => ({
            value: country.iso_2!,
            label: country.display_name!,
        }))
    }, [region])

    return (
        <Dialog.Root modal>
            <Dialog.Trigger className="border border-gray-300 rounded-lg bg-gray-100 p-5 min-h-[220px] h-full w-full flex flex-col justify-between">
                <span className="text-base font-semibold">New address</span>
                <PlusIcon className="w-6 h-6 shrink-0" />
            </Dialog.Trigger>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

                {/* Content */}
                <Dialog.Content
                    className="fixed top-1/2 left-1/2 max-w-lg w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-[110] focus:outline-none"
                    aria-describedby="add-address-description"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between p-6 border-b">
                        <div>
                            <Dialog.Title className="text-xl font-semibold">
                                Add address
                            </Dialog.Title>
                        </div>
                        <Dialog.Close aria-label="Close" className="text-gray-500 hover:text-gray-700 rounded-full p-1">
                            <X className="w-5 h-5" />
                        </Dialog.Close>
                    </div>

                    {/* Form */}
                    <form action={formAction}>
                        <div className="p-6 space-y-4">
                            <div className="flex flex-col gap-y-2">
                                <div className="grid grid-cols-2 gap-x-2">
                                    <Input
                                        label="First name"
                                        name="first_name"
                                        required
                                        autoComplete="given-name"
                                    />
                                    <Input
                                        label="Last name"
                                        name="last_name"
                                        required
                                        autoComplete="family-name"
                                    />
                                </div>
                                <Input
                                    label="Company"
                                    name="company"
                                    autoComplete="organization"
                                />
                                <Input
                                    label="Address"
                                    name="address_1"
                                    required
                                    autoComplete="address-line1"
                                />
                                <Input
                                    label="Apartment, suite, etc."
                                    name="address_2"
                                    autoComplete="address-line2"
                                />
                                <div className="grid grid-cols-[144px_1fr] gap-x-2">
                                    <Input
                                        label="Postal code"
                                        name="postal_code"
                                        required
                                        autoComplete="postal-code"
                                    />
                                    <Input
                                        label="City"
                                        name="city"
                                        required
                                        autoComplete="locality"
                                    />
                                </div>
                                <Input
                                    label="Province / State"
                                    name="province"
                                    autoComplete="address-level1"
                                />
                                <Select
                                    options={countryOptions}
                                    label='Country'
                                    name="country_code"
                                    required
                                    autoComplete="country"
                                />
                                <Input
                                    label="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t px-6 py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex-1">
                                    {formState.error && (
                                        <div className="text-rose-500 text-sm py-2">
                                            {formState.error}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <Dialog.Close asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-10"
                                        >
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Button
                                        isLoading={isPending}
                                        className="w-[100px] h-10"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
    // return (
    //     <Dialog.Root>
    //         <Dialog.Trigger asChild>
    //             <button className="border border-gray-300 rounded-lg bg-gray-100 p-5 min-h-[220px] h-full w-full flex flex-col justify-between">
    //                 <span className="text-base font-semibold">New address</span>
    //                 <PlusIcon className="w-6 h-6 shrink-0" />
    //             </button>
    //         </Dialog.Trigger>
    //         <Dialog.Portal>
    //             <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
    //             <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
    //                 <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
    //                     Edit profile
    //                 </Dialog.Title>
    //                 <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
    //                     Make changes to your profile here. Click save when you're done.
    //                 </Dialog.Description>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="name"
    //                     >
    //                         Name
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="name"
    //                         defaultValue="Pedro Duarte"
    //                     />
    //                 </fieldset>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="name"
    //                     >
    //                         Name
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="name"
    //                         defaultValue="Pedro Duarte"
    //                     />
    //                 </fieldset>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="name"
    //                     >
    //                         Name
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="name"
    //                         defaultValue="Pedro Duarte"
    //                     />
    //                 </fieldset>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="name"
    //                     >
    //                         Name
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="name"
    //                         defaultValue="Pedro Duarte"
    //                     />
    //                 </fieldset>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="name"
    //                     >
    //                         Name
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="name"
    //                         defaultValue="Pedro Duarte"
    //                     />
    //                 </fieldset>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="name"
    //                     >
    //                         Name
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="name"
    //                         defaultValue="Pedro Duarte"
    //                     />
    //                 </fieldset>
    //                 <fieldset className="mb-[15px] flex items-center gap-5">
    //                     <label
    //                         className="w-[90px] text-right text-[15px] text-violet11"
    //                         htmlFor="username"
    //                     >
    //                         Username
    //                     </label>
    //                     <input
    //                         className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
    //                         id="username"
    //                         defaultValue="@peduarte"
    //                     />
    //                 </fieldset>
    //                 <div className="mt-[25px] flex justify-end">
    //                     <Dialog.Close asChild>
    //                         <button className="inline-flex h-[35px] items-center justify-center rounded bg-green-600 px-[15px] font-medium leading-none text-green-300 outline-none outline-offset-1 hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-green-900 select-none">
    //                             Save changes
    //                         </button>
    //                     </Dialog.Close>
    //                 </div>
    //                 <Dialog.Close asChild>
    //                     <button
    //                         className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet-200 bg-gray-600 hover:bg-violet-800 focus:shadow-[0_0_0_2px] focus:shadow-violet-600 focus:outline-none"
    //                         aria-label="Close"
    //                     >
    //                         <X />
    //                     </button>
    //                 </Dialog.Close>
    //             </Dialog.Content>
    //         </Dialog.Portal>
    //     </Dialog.Root>
    // )
}

export type AddAddressProps = {
    region: StoreRegion;
    addresses: StoreCustomerAddress[]
}