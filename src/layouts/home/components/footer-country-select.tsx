"use client"

import { StoreRegion } from "@medusajs/types";
import { updateRegion } from "libs/actions/cart";
import { useToggleState } from "libs/hooks/use-toggle-state";
import { ChevronDown, Loader } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { createElement, useMemo, useTransition } from "react";

type Country = {
    code: string;
    label: string;
};

type HeaderCountrySelectProps = {
    regions: StoreRegion[]
    className?: string
}

export default function HeaderCountrySelect({ regions, className = "" }: HeaderCountrySelectProps) {
    const { state, open, close, toggle } = useToggleState()
    const [isPending, startTransition] = useTransition();
    const { countryCode } = useParams()
    const currentPath = usePathname().split(`/${countryCode}`)[1]

    const options = useMemo(() => {
        return regions.flatMap((region) =>
            region.countries!.map((country) => ({
                code: country.iso_2!,
                label: country.display_name!,
            })),
        ).sort((a, b) => a.label.localeCompare(b.label)).filter(Boolean) as Country[];
    }, [regions])

    const current = useMemo(() => options.find((o) => o.code === countryCode), [options, countryCode])

    if (!current) return null

    const handleChange = (option: Country) => {
        startTransition(() => updateRegion(option.code, currentPath))
        close()
    }

    return (
        <div className={`group relative select-none w-fit ${className}`} onMouseEnter={open} onMouseLeave={close}>
            <button className="flex items-center header-btn py-1 lg:py-2 cursor-pointer" onClick={toggle} aria-haspopup="listbox" aria-expanded={state} aria-label="Select country">
                <CountryFlag countryCode={current.code} alt={current.label} aria-hidden="true" className="w-6 h-4" />
                <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-300 group-hover:rotate-180`} />
            </button>

            {state &&
                <>
                    <ul className="absolute left-0 bottom-full z-20 w-52 bg-gray-200 shadow-lg max-h-72 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm" role="listbox" aria-activedescendant={current?.code}>
                        {options.map((option) => (
                            <li key={option.code} className={`${countryCode === option.code ? 'pointer-events-none text-white bg-indigo-600' : 'text-gray-900 active:bg-indigo-200 hover:bg-indigo-50'} select-none relative py-2 px-3`} onClick={() => handleChange(option)} role="option" aria-selected={countryCode === option.code}>
                                <div className="flex items-center">
                                    <CountryFlag countryCode={option.code} alt={option.label} loading="lazy" aria-hidden="true" />
                                    <span className={`ml-3 truncate ${countryCode === option.code ? 'font-semibold' : 'font-normal'}`}>
                                        {option.label}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            }

            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-bgPrimary bg-opacity-50 rounded-md">
                    <Loader strokeWidth={2} className='h-6 w-6 text-gray-500 animate-spin' />
                </div>
            )}
        </div>
    )
}

type CountryFlagProps = React.ComponentPropsWithoutRef<'img'> & { countryCode: string; }

const CountryFlag = ({ countryCode, alt, className = "w-5", ...props }: CountryFlagProps) => {
    const flagUrl = `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode.toLowerCase()}.svg`
    return createElement("img", { src: flagUrl, className: `inline-block align-middle h-auto ${className}`, ...props });
}