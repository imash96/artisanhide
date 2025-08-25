"use client"

export default function TestPayment({ className = "" }: { className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-md bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 ring-1 ring-inset ring-orange-300 shadow-sm ${className ?? ""}`}
        >
            <span className="font-semibold mr-1">Attention:</span> For testing purposes only.
        </span>
    )
}


