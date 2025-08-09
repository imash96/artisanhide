import { FormState } from "@/types/common";
import { addCustomerAddress, updateCustomerAddress } from "@libs/actions/customer";
import { StoreCustomerAddress } from "@medusajs/types";
import Button from "@modules/common/custom-button";
import CustomInput from "@modules/common/custom-input";
import { DialogClose } from "@modules/common/custom-modal";
import CustomSelect from "@modules/common/custom-select";
import { useActionState, useEffect } from "react";

export default function AddressForm({ mode, address, countryOptions, isDefaultShipping, onClose }: AddressFormProps) {
    const action = mode === "create" ? addCustomerAddress : updateCustomerAddress
    const [state, formAction, isPending] = useActionState(action, {
        addressId: address?.id,
        isDefaultShipping,
        success: false,
        error: null
    } as AddressFormState)

    useEffect(() => {
        if (state.success) {
            setTimeout(() => onClose(false), 100)
        }
    }, [state.success])

    return (
        <form action={formAction} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto space-y-3 p-4 border-t">
                <div className="grid grid-cols-2 gap-3">
                    <CustomInput
                        label="First name"
                        name="first_name"
                        defaultValue={address?.first_name || ""}
                        required
                        autoComplete="given-name"
                        autoFocus
                    />
                    <CustomInput
                        label="Last name"
                        name="last_name"
                        defaultValue={address?.last_name || ""}
                        required
                        autoComplete="family-name"
                    />
                </div>

                <CustomInput
                    label="Company"
                    name="company"
                    defaultValue={address?.company || ""}
                    autoComplete="organization"
                />
                <CustomInput
                    label="Address"
                    name="address_1"
                    defaultValue={address?.address_1 || ""}
                    required
                    autoComplete="address-line1"
                />
                <CustomInput
                    label="Apartment, suite, etc."
                    name="address_2"
                    defaultValue={address?.address_2 || ""}
                    autoComplete="address-line2"
                />

                <div className="grid grid-cols-[144px_1fr] gap-4">
                    <CustomInput
                        label="Postal code"
                        name="postal_code"
                        defaultValue={address?.postal_code || ""}
                        required
                        autoComplete="postal-code"
                    />
                    <CustomInput
                        label="City"
                        name="city"
                        defaultValue={address?.city || ""}
                        required
                        autoComplete="locality"
                    />
                </div>

                <div className="grid grid-cols-[1fr_144px] gap-4">
                    <CustomSelect
                        options={countryOptions}
                        defaultValue={address?.country_code || undefined}
                        label="Country"
                        name="country_code"
                        required
                        autoComplete="country"
                        disabled={countryOptions.length === 0}
                    />
                    <CustomInput
                        label="Province / State"
                        name="province"
                        defaultValue={address?.province || ""}
                        autoComplete="address-level1"
                    />
                </div>

                <CustomInput
                    label="Phone"
                    name="phone"
                    defaultValue={address?.phone || ""}
                    autoComplete="phone"
                />

                <fieldset className="space-y-2">
                    <legend className="text-xs tracking-wide font-light">
                        Save this address as (optional)
                    </legend>
                    <div className="flex flex-wrap gap-2">
                        {["Home", "Office", "Other"].map((type) => (
                            <span key={type}>
                                <input type="radio" id={type} name="address_name" defaultChecked={type === address?.address_name} value={type} className="sr-only peer" />
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
                        defaultChecked={address?.is_default_shipping}
                    />
                    <label htmlFor="is_default_shipping" className="text-xs tracking-wide">
                        Set as default address
                    </label>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                        {state.error && (
                            <div
                                className="text-rose-500 text-sm py-2"
                                role="alert"
                                aria-live="polite"
                            >
                                {state.error}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10"
                                disabled={isPending}
                                pill
                            >
                                Cancel
                            </Button>
                        </DialogClose>
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
    )
}

export type AddressFormState = {
    data?: any
} & FormState

type AddressFormProps = {
    mode: "create" | "edit",
    address?: StoreCustomerAddress,
    onClose: React.Dispatch<React.SetStateAction<boolean>>,
    isDefaultShipping?: boolean
    countryOptions: {
        label: string,
        value: string
    }[];
}