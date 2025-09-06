"use client"

import Button from "@module/common/custom-button";
import CustomInput from "@module/common/custom-input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogTrigger,
} from "@module/common/custom-modal";
import CustomSelect from "@module/common/custom-select";
import { createElement, useMemo, useState, useTransition } from "react"
import { regions } from "../../../region";
import { X } from "lucide-react";
import { updateRegion } from "@lib/action/cart";

export default function RegionModal({ countryCode, className = "" }: RegionModalProps) {
    const [showModal, setShowModal] = useState(!countryCode)
    const [isPending, startTransition] = useTransition();

    // build all countries list
    const countryOptions = useMemo(() => regions.flatMap(region =>
        region.countries.map(country => ({
            value: country.iso_2.toLowerCase(),
            label: country.display_name,
            currency: region.currency_code.toUpperCase(),
        }))
    ).sort((a, b) => a.label.localeCompare(b.label)), [])

    const fallback = {
        value: "us",
        label: "United States",
        currency: "USD",
    }

    const current = useMemo(() => countryOptions.find(o => o.value === countryCode) ?? fallback, [countryOptions, countryCode])

    const [selected, setSelected] = useState<CurrentRegion>(current)

    const handleChange = (formData: FormData) => {
        const code = formData.get("code") as string
        if (!code) return

        startTransition(() => updateRegion(code))
        setShowModal(false)
    }

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
                <button
                    className="border rounded-md px-3 py-2 text-left hover:bg-background-muted/30 transition"
                    aria-haspopup="listbox"
                    aria-expanded={showModal}
                    aria-label="Select country"
                >
                    <CountryFlag
                        countryCode={current.value}
                        alt={current.label}
                        aria-hidden="true"
                        className="w-6 h-4"
                    />
                    <span className="ml-2">{current.label}</span>
                </button>
            </DialogTrigger>
            <DialogContent
                rounded={false}
                className="space-y-6 max-w-xl w-full px-6 lg:px-10 pt-6 pb-10"
            >
                <DialogHeader>
                    <div className="space-y-1">
                        <DialogTitle>Welcome to Artisan Hide</DialogTitle>
                        <DialogDescription className="tracking-wide text-foreground-muted font-light">
                            Please confirm or select correct country and currency.
                        </DialogDescription>
                    </div>
                    <DialogClose className="absolute top-3 right-3">
                        <X className="w-5 h-5" />
                    </DialogClose>
                </DialogHeader>

                <form className="space-y-6 px-4" action={handleChange}>
                    <CustomSelect
                        label="COUNTRY"
                        name="code"
                        options={countryOptions}
                        defaultValue={selected.value}
                        onChange={(e) => {
                            const selected = countryOptions.find(o => o.value === e.currentTarget.value)
                            if (selected) setSelected(selected)
                        }}
                    />
                    <CustomInput
                        label="CURRENCY"
                        value={selected.currency}
                        disabled
                    />
                    <Button type="submit" isLoading={isPending}>
                        CONFIRM
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const CountryFlag = ({ countryCode, alt, className = "w-5", ...props }: CountryFlagProps) => {
    const flagUrl = `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode?.toLowerCase()}.svg`
    return createElement("img", {
        src: flagUrl,
        alt,
        className: `inline-block align-middle h-auto ${className ?? ""}`,
        loading: "lazy", // ✅ performance
        ...props,
    })
}

type CountryFlagProps = React.ComponentPropsWithoutRef<"img"> & { countryCode?: string }

type RegionModalProps = {
    className?: string
    countryCode?: string
}

type CurrentRegion = {
    value: string
    label: string
    currency: string
}