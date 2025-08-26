"use client"

import { FormState } from "@/type/common"
import { createMeasurement } from "@lib/action/measurement"
import Button from "@module/common/custom-button"
import CustomInput from "@module/common/custom-input"
import CustomSelect from "@module/common/custom-select"
import { PlusIcon } from 'lucide-react'
import { useActionState, useId } from "react"

// Move constants to separate object for better organization
const FORM_OPTIONS = {
    genderTypes: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ],
    garmentTypes: [
        { value: "Jacket", label: "Jacket" },
        { value: "Pant", label: "Pant" },
        { value: "Suit", label: "Suit" },
        { value: "Shorts", label: "Shorts" },
        { value: "Vest", label: "Vest" },
        { value: "T-Shirt", label: "T-Shirt" },
        { value: "Skirt", label: "Skirt" },
        { value: "Flare Skirt", label: "Flare Skirt" },
        { value: "Coat", label: "Coat" },
        { value: "Kid", label: "Kid" },
    ]
}

export default function MeasurementAdd() {
    const [state, formAction, isPending] = useActionState(createMeasurement, {
        success: false,
        error: null,
    } as FormState)

    const formId = useId()

    return (
        <form
            id={formId}
            aria-labelledby={`${formId}-title`}
            className="bg-background-elevated border border-border rounded-xl p-4 mb-4"
            action={formAction}
        >
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                {/* Name Input */}
                <div className="md:col-span-4">
                    <CustomInput
                        label="Name"
                        name="name"
                        maxLength={50}
                        required
                        autoComplete="name"
                        state={state.error?.includes('name') ? 'error' : 'default'}
                        helperText={state.error?.includes('name') ? 'Please enter a valid name' : undefined}
                    />
                </div>

                {/* Garment Type Select */}
                <div className="md:col-span-4">
                    <CustomSelect
                        name="type"
                        options={FORM_OPTIONS.garmentTypes}
                        label="Garment Type"
                        required
                        state={state.error?.includes('type') ? 'error' : 'default'}
                        helperText={state.error?.includes('type') ? 'Please select a garment type' : undefined}
                    />
                </div>

                {/* Gender Select */}
                <div className="md:col-span-3">
                    <CustomSelect
                        name="gender"
                        options={FORM_OPTIONS.genderTypes}
                        label="Gender"
                        required
                        state={state.error?.includes('gender') ? 'error' : 'default'}
                        helperText={state.error?.includes('gender') ? 'Please select a gender' : undefined}
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-1">
                    <Button pill variant="icon" Icon={PlusIcon} iconClassName="w-6 h-6" isLoading={isPending} className="h-11 px-4 mx-auto w-full" />
                </div>
            </div>
        </form>
    )
}
