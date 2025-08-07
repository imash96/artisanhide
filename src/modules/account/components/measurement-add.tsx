"use client"

import { createMeasurement } from "@libs/actions/measurement"
import CustomInput from "@modules/common/custom-input"
import CustomSelect from "@modules/common/custom-select"
import { LoaderCircle, PlusIcon, AlertCircle, CheckCircle } from 'lucide-react'
import { useActionState, useId, useEffect } from "react"

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

type MeasurementFormState = {
    success: boolean
    error: string | null
    message?: string
}

export default function MeasurementAdd() {
    const [state, formAction, isPending] = useActionState(createMeasurement, {
        success: false,
        error: null,
    } as MeasurementFormState)

    const formId = useId()

    // Auto-hide success message after 3 seconds
    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => {
                // You might want to reset the state here if your action supports it
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [state.success])

    return (
        <form
            id={formId}
            aria-labelledby={`${formId}-title`}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4"
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
                    <button
                        type="submit"
                        disabled={isPending}
                        aria-label={isPending ? "Adding measurement..." : "Add new measurement"}
                        className={`w-full h-[52px] flex items-center justify-center gap-2 rounded-full border border-transparent font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800'} text-white shadow-sm`}
                    >
                        {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <PlusIcon className="h-4 w-4" aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Feedback Messages
                <div className="mt-6 space-y-3">
                    // Success Message 
                    {state.success && (
                        <div
                            role="status"
                            className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                        >
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                            <div>
                                <p className="font-medium">Measurement added successfully!</p>
                                {state.message && (
                                    <p className="text-sm text-green-700 mt-1">{state.message}</p>
                                )}
                            </div>
                        </div>
                    )}

                    // Error Message 
                    {state.error && !state.success && (
                        <div
                            role="alert"
                            className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                        >
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="font-medium">Unable to add measurement</p>
                                <p className="text-sm text-red-700 mt-1">{state.error}</p>
                            </div>
                        </div>
                    )}
                </div> */}

            {/* Form Instructions
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        All fields marked with <span className="text-red-500">*</span> are required.
                        Customer names are limited to 50 characters.
                    </p>
                </div> */}
        </form>
    )
}
