export type Type = "Jacket" | "Pant" | "Suit" | "Shorts" | "Vest" | "T-Shirt" | "Skirt" | "Flare Skirt" | "Coat" | "Kid";
export type Gender = "Male" | "Female" | "Other"
export type Role = "Body" | "Garment";
export type MeasurementKey = "Chest" | "Sleeve" | "Shoulder" | "Front Length" | "Waist" | "Bottom" | "Bicep" | "Thighs" | "Knees" | "Leg Bottom" | "Length" | "Front Rise" | "Back Rise" | "Shorts Length" | "Vest Length" | "Half Sleeve" | "Skirt Length" | "Skirt Flare";

export type MeasurementInfo = {
    label: string;
    name: MeasurementKey;
    min: string;
    max: string;
    imgsrc: Record<Gender, string>
    info: string;
};

export type Measurement = {
    id: string;
    customer_id: string;
    type: string;
    name: string;
    role: Role;
    gender: Gender
    height: number | null;
    weight: number | null;
    info: string | null;
    measurements: Record<string, number> | null;
    metadata: Record<string, unknown> | null;
    raw_height: Record<string, unknown> | null;
    raw_weight: Record<string, unknown> | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type StoreMeasurementResponse = Measurement

export type StoreUpdateMeasurementDTO = Pick<Measurement, "name" | "role" | "height" | "weight" | "info" | "measurements" | "metadata">;

export type StoreCreateMeasurementDTO = Pick<Measurement, "name" | "type" | "gender">;