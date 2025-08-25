"use client"

import { Edit, Loader2, Trash2, Ruler, User, Shirt, Info, Scale, Maximize2, } from "lucide-react"
import { useTransition } from "react"
import { deleteCustomerMeasurement } from "@lib/action/measurement"
import MeasurementModal from "./measurement-modal"
import { Measurement } from "@/type/measurement"
import Tag from "./tag"

type MeasurementCardProps = {
    measurement: Measurement
}

export default function MeasurementCard({ measurement }: MeasurementCardProps) {
    const [isRemoving, startTransition] = useTransition()

    const typeColors: Record<Measurement["type"], string> = {
        Jacket: "bg-info/80 text-info-foreground border-info",
        Suit: "bg-info/80 text-info-foreground border-info",
        Coat: "bg-info/80 text-info-foreground border-info",
        "Flare Skirt": "bg-secondary/80 text-secondary-foreground border-secondary",
        Shorts: "bg-secondary/80 text-secondary-foreground border-secondary",
        Skirt: "bg-secondary/80 text-secondary-foreground border-secondary",
        Vest: "bg-success/80 text-success-foreground border-success",
        "T-Shirt": "bg-success/80 text-success-foreground border-success",
        Pant: "bg-destructive/80 text-destructive-foreground border-destructive",
        Kid: "bg-accent/80 text-accent-foreground border-accent",
    }

    const genderColors: Record<Measurement["gender"], string> = {
        Male: "bg-warning/80 text-warning-foreground border-warning",
        Female: "bg-destructive/80 text-destructive-foreground border-destructive",
        Other: "bg-background text-foreground border-foreground-muted",
    }

    return (
        <article
            className="border border-border rounded-xl p-4 sm:p-5 flex flex-col bg-background-elevated shadow-sm hover:shadow-md transition-shadow"
            role="article"
            aria-labelledby={`measurement-${measurement.name}-title`}
        >
            {/* Header */}
            <header className="mb-3">
                <h3 id={`measurement-${measurement.name}-title`}
                    className="text-lg sm:text-xl font-semibold flex items-center gap-2"
                >
                    <User className="w-5 h-5 flex-shrink-0" />
                    {measurement.name}
                </h3>

                {measurement.info && (
                    <p className="mt-1 text-sm flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{measurement.info}</span>
                    </p>
                )}
            </header>

            {/* Body */}
            <dl className="text-sm space-y-1.5 flex-1">
                {measurement.height && (
                    <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 flex-shrink-0" />
                        <span>Height: {measurement.height} cm</span>
                    </div>
                )}
                {measurement.weight && (
                    <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 flex-shrink-0" />
                        <span>Weight: {measurement.weight} kg</span>
                    </div>
                )}
                {measurement.measurements && Object.keys(measurement.measurements).length > 0 ? (
                    <div className="flex items-start gap-2">
                        <Ruler className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {Object.entries(measurement.measurements).map(([key, value]) => (
                                <span key={key}>
                                    <span className="font-medium capitalize">{key}</span>: {value} in
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 flex-shrink-0" />
                        <span>No specific measurements available</span>
                    </div>
                )}
            </dl>

            {/* Footer */}
            <footer className="flex justify-between items-start pt-4 border-t border-border mt-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <Tag icon={Shirt} text={measurement.type} className={typeColors[measurement.type] || "bg-btn-secondary text-btn-secondary-foreground border-btn-secondary-hover"} />
                    <Tag icon={User} text={measurement.gender} className={genderColors[measurement.gender] || "bg-accent text-accent-foreground border-border"} />
                    {measurement.role && <Tag text={measurement.role} className={"bg-btn-primary/50 text-btn-primary-foreground border-btn-primary-hover"} />}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                    <MeasurementModal measurement={measurement}>
                        <button
                            aria-label={`Edit measurement for ${measurement.name}`}
                            className="p-2 text-foreground-muted hover:text-warning-foreground hover:bg-warning/20 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-warning"
                        >
                            <Edit size={16} />
                        </button>
                    </MeasurementModal>
                    <button
                        aria-label={`Delete measurement for ${measurement.name}`}
                        className="p-2 text-foreground-muted hover:text-destructive-foreground hover:bg-destructive/20 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-destructive"
                        onClick={() => {
                            startTransition(() => deleteCustomerMeasurement(measurement.id))
                        }}
                        disabled={isRemoving}
                    >
                        {isRemoving ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Trash2 size={16} />
                        )}
                    </button>
                </div>
            </footer>
        </article>
    )
}
