import { Measurement, MeasurementInfo, Type, Role, StoreUpdateMeasurementDTO } from "@/type/measurement";
import CustomInput from "@module/common/custom-input";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import Button from "@module/common/custom-button";
import { updateMeasurement } from "@lib/action/measurement";
import { FormState } from "@/type/common";
import CustomSelect from "@module/common/custom-select";
import { measurementData, measurementInfo } from "@/JSON/measurement-data";

export default function MeasurementForm({ measurement, onClose }: MeasurementFormProps) {
    const TYPE = measurement.type as Type
    const [selectedImage, setSelectedImage] = useState<MeasurementInfo>(measurementInfo[measurementData[TYPE][0]]);
    const dynamicFields = TYPE ? measurementData[TYPE] : [];

    const handleSubmit = async (currentState: Record<string, any>, formData: FormData) => {
        const measurementId = measurement.id

        if (!measurementId) return { success: false, error: "Measurement ID is required" }

        const measurements = dynamicFields.reduce((result, key) => {
            const value = Number(formData.get(key));
            result[key] = value || null;
            return result;
        }, {} as Record<string, number | null>);

        const measurementData = {
            type: formData.get("type") as string,
            role: formData.get("role") as Role,
            name: formData.get("name") as string,
            height: Number(formData.get("height")),
            weight: Number(formData.get("weight")),
            info: formData.get("info") as string,
            measurements,
            metadata: null
        } as StoreUpdateMeasurementDTO
        return await updateMeasurement(measurementId, measurementData)
    }

    const [state, formAction, isPending] = useActionState(handleSubmit, {
        success: false,
        error: null
    } as MeasurementFormState)

    useEffect(() => {
        if (state.success) {
            setTimeout(() => onClose(false), 100)
        }
    }, [state.success, onClose])

    return (
        <form className="flex flex-col flex-1 min-h-0" action={formAction}>
            <div className="flex-1 overflow-y-auto space-y-3 p-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                        name="name"
                        type="text"
                        defaultValue={measurement.name}
                        label="Measurement name"
                        autoFocus
                        required
                    />
                    <CustomSelect
                        name="role"
                        label="Measurement Type"
                        options={RoleSelect}
                        defaultValue={measurement.role || undefined}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                        name="height"
                        type="number"
                        step={0.1}
                        defaultValue={measurement.height || ""}
                        label="Height in inches"
                        min={30}
                        max={96}
                    />
                    <CustomInput
                        name="weight"
                        type="number"
                        step={0.1}
                        defaultValue={measurement.weight || ""}
                        label="Weight in kg"
                        min={15}
                        max={150}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                        name="type"
                        type="text"
                        defaultValue={TYPE}
                        readOnly
                        state="disabled"
                        label="Garment type"
                    />
                    <CustomInput
                        name="gender"
                        type="text"
                        defaultValue={measurement.gender}
                        readOnly
                        state="disabled"
                        label="Gender"
                    />
                </div>
                <CustomInput
                    name="info"
                    defaultValue={measurement.info || ""}
                    type="text"
                    label="Info"
                />

                {dynamicFields.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
                        {/* Left: Inputs */}
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                            {dynamicFields.map((field) => {
                                const info = measurementInfo[field as keyof typeof measurementInfo];
                                const measurements = measurement.measurements || {}
                                return (
                                    <CustomInput
                                        key={field}
                                        name={field}
                                        type="number"
                                        step="0.1"
                                        defaultValue={measurements[field]?.toString() || ''}
                                        onFocus={() => setSelectedImage(info)}
                                        label={field}
                                        min={Number(info?.min)}
                                        max={Number(info?.max)}
                                    />
                                );
                            })}
                        </div>

                        {/* Right: Help Box */}
                        {selectedImage && (
                            <div className="self-start h-full p-4 border rounded-lg bg-background-muted space-y-2 text-sm">
                                <p className="tracking-wide font-medium">{selectedImage.label}</p>
                                <p className="font-light text-sm leading-tight tracking-wide">
                                    {selectedImage.info}
                                </p>
                                <Image
                                    src={selectedImage.imgsrc[measurement.gender]}
                                    height={600}
                                    width={600}
                                    alt={selectedImage.info}
                                    className="w-full h-auto rounded-md mt-2"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-destructive">
                        No measurements available for this type.
                    </p>
                )}
            </div>
            {/* Footer */}
            <div className="border-t p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                        {state.error && (
                            <div
                                className="text-destructive-foreground text-sm py-2"
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

export type MeasurementFormState = {
    data?: any
} & FormState

const RoleSelect = [
    { value: "Garment", label: "Garment" },
    { value: "Body", label: "Body" }
]

type MeasurementFormProps = {
    measurement: Measurement
    onClose: React.Dispatch<React.SetStateAction<boolean>>,
}