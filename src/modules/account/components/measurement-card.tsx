"use client"

import {
    Edit,
    Loader2,
    Trash2,
    Ruler,
    User,
    Shirt,
    Info,
    Scale,
    Maximize2,
} from "lucide-react"
import { useTransition } from "react"
import { deleteCustomerMeasurement } from "@libs/actions/measurement"
import MeasurementModal from "./measurement-modal"
import { Measurement } from "@/types/measurement"
import Tag from "./tag"

type MeasurementCardProps = {
    measurement: Measurement
}

export default function MeasurementCard({ measurement }: MeasurementCardProps) {
    const [isRemoving, startTransition] = useTransition()

    const typeColors: Record<Measurement["type"], string> = {
        Jacket: "bg-blue-100 text-blue-800 border-blue-300",
        Suit: "bg-blue-100 text-blue-800 border-blue-300",
        Coat: "bg-blue-100 text-blue-800 border-blue-300",
        Pant: "bg-purple-100 text-purple-800 border-purple-300",
        Shorts: "bg-purple-100 text-purple-800 border-purple-300",
        Skirt: "bg-purple-100 text-purple-800 border-purple-300",
        Vest: "bg-green-100 text-green-800 border-green-300",
        "T-Shirt": "bg-green-100 text-green-800 border-green-300",
        "Flare Skirt": "bg-pink-100 text-pink-800 border-pink-300",
        Kid: "bg-yellow-100 text-yellow-800 border-yellow-300",
    }

    const genderColors: Record<Measurement["gender"], string> = {
        Male: "bg-blue-50 text-blue-700 border-blue-200",
        Female: "bg-pink-50 text-pink-700 border-pink-200",
        Other: "bg-gray-50 text-gray-700 border-gray-200",
    }

    const handleDelete = () => {
        startTransition(() => deleteCustomerMeasurement(measurement.id))
    }

    return (
        <article
            className="border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-blue-400"
            role="region"
            aria-labelledby={`measurement-${measurement.id}-title`}
        >
            {/* Header */}
            <header className="mb-3">
                <h3 id={`measurement-${measurement.id}-title`}
                    className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2"
                >
                    <User className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    {measurement.name}
                </h3>

                {measurement.info && (
                    <p className="mt-1 text-sm text-gray-600 flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500" />
                        <span className="line-clamp-2">{measurement.info}</span>
                    </p>
                )}
            </header>

            {/* Body */}
            <dl className="text-sm text-gray-700 space-y-1.5 flex-1">
                {measurement.height && (
                    <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span>Height: {measurement.height} cm</span>
                    </div>
                )}
                {measurement.weight && (
                    <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span>Weight: {measurement.weight} kg</span>
                    </div>
                )}
                {measurement.measurements && Object.keys(measurement.measurements).length > 0 ? (
                    <div className="flex items-start gap-2">
                        <Ruler className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {Object.entries(measurement.measurements).map(([key, value]) => (
                                <span key={key}>
                                    <span className="font-medium capitalize">{key}</span>: {value} in
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                        <Ruler className="w-4 h-4 flex-shrink-0" />
                        <span>No specific measurements available</span>
                    </div>
                )}
            </dl>

            {/* Footer */}
            <footer className="flex flex-row justify-between items-start xs:items-center gap-3 pt-4 border-t border-gray-100 mt-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <Tag icon={Shirt} text={measurement.type} color={typeColors[measurement.type] || "bg-gray-100 text-gray-800 border-gray-300"} />
                    <Tag icon={User} text={measurement.gender} color={typeColors[measurement.gender] || "bg-gray-100 text-gray-800 border-gray-300"} />
                    {measurement.role && <Tag text={measurement.role} color={"bg-orange-100 text-amber-700 border-amber-300"} />}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                    <MeasurementModal measurement={measurement}>
                        <button
                            aria-label={`Edit measurement for ${measurement.name}`}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-400"
                        >
                            <Edit size={16} />
                        </button>
                    </MeasurementModal>
                    <button
                        aria-label={`Delete measurement for ${measurement.name}`}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-400"
                        onClick={handleDelete}
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
