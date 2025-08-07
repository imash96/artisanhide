'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon, X } from "lucide-react";
import Button from '@modules/common/custom-button';
import Input from '@modules/common/custom-input';
import Select from '@modules/common/custom-select';
import { useActionState, useEffect, useState } from 'react';
import { addCustomerAddress } from '@libs/actions/customer';

export default function AddressesAdd({ isDefaultShipping, countryOptions }: AddAddressProps) {
    const [state, setState] = useState(false)

    const [formState, formAction, isPending] = useActionState(addCustomerAddress, {
        isDefaultShipping,
        success: false,
        error: null,
    });

    useEffect(() => { if (formState.success) setState(false) }, [formState.success]);

    return (
        <Dialog.Root open={state} onOpenChange={setState} modal>
            <Dialog.Trigger
                className="border border-gray-300 rounded-lg bg-gray-100 p-5 min-h-[220px] w-full flex flex-col justify-center items-center gap-2 hover:bg-gray-200 transition"
                aria-label="Add new address"
            >
                <PlusIcon className="w-8 h-8" />
                <span className="text-base font-semibold">New Address</span>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

                <Dialog.Content
                    className="fixed m-auto top-1/2 left-1/2 max-w-lg w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-[110] focus:outline-none flex flex-col"
                    aria-describedby="add-address-description"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 py-4 border-b">
                        <div className="space-y-1">
                            <Dialog.Title className="text-xl font-semibold">
                                Add address
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-gray-600">
                                Enter the shipping address you’d like to save to your account.
                            </Dialog.Description>
                        </div>
                        <Dialog.Close asChild>
                            <button aria-label="Close" className="text-gray-500 hover:text-gray-700 rounded-full p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Form */}
                    <form action={formAction} className="flex-1 overflow-y-scroll">
                        <div className="px-6 py-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="First name"
                                    name="first_name"
                                    required
                                    autoComplete="given-name"
                                    autoFocus
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

                            <div className="grid grid-cols-[144px_1fr] gap-4">
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

                            <div className="grid grid-cols-[1fr_144px] gap-4">
                                <Select
                                    options={countryOptions}
                                    label="Country"
                                    name="country_code"
                                    required
                                    autoComplete="country"
                                    disabled={countryOptions.length === 0}
                                />
                                <Input
                                    label="Province / State"
                                    name="province"
                                    autoComplete="address-level1"
                                />
                            </div>

                            <Input
                                label="Phone"
                                name="phone"
                                autoComplete="phone"
                            />

                            <fieldset className="space-y-2">
                                <legend className="text-xs tracking-wide font-light">
                                    Save this address as (optional)
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {["Home", "Office", "Other"].map((type) => (
                                        <span key={type}>
                                            <input type="radio" id={type} name="address_name" value={type} className="sr-only peer" />
                                            <label htmlFor={type} className="relative cursor-pointer flex items-center px-4 py-2 text-xs border rounded-full transition-all select-none peer-checked:bg-brown peer-checked:text-white">
                                                {type}
                                            </label>
                                        </span>
                                    ))}
                                </div>
                            </fieldset>

                            <div className="flex items-center gap-2">
                                <input
                                    id="is_default_shipping"
                                    type="checkbox"
                                    name="is_default_shipping"
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="is_default_shipping" className="text-xs tracking-wide">
                                    Set as default address
                                </label>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t px-6 py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex-1">
                                    {formState.error && (
                                        <div
                                            className="text-rose-500 text-sm py-2"
                                            role="alert"
                                            aria-live="polite"
                                        >
                                            {formState.error}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    <Dialog.Close asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-10"
                                            disabled={isPending}
                                            pill
                                        >
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Button
                                        isLoading={isPending}
                                        className="w-[100px] h-10"
                                        type="submit"
                                        pill
                                        disabled={isPending}
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
    );
}

export type AddAddressProps = {
    countryOptions: {
        label: string,
        value: string
    }[];
    isDefaultShipping: boolean;
};