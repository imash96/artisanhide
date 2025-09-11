"use client"

import Drawer from "@/layout/home/components/drawer"
import { useToggleState } from "@lib/hook/use-toggle-state"
import { ChevronDown, FilterIcon, FunnelIcon, X } from "lucide-react"
import DropdownMenu from "./dropdown-menu-del"
import { useState } from "react"
import { useFilter } from "@lib/hook/useFilter"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./custom-accordion"
import { filterList } from "@/JSON/filter"

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
    { label: "Most Popular", value: "popular" },
];

export default function SortnFilter() {
    const [sort, setSort] = useState("newest");
    const { state, toggle } = useToggleState()
    const { filters, toggleFilter, clearFilters, hasSelectedFilters, removeSingleFilter, } = useFilter();
    return (
        <section className="flex items-center justify-between px-4 border-b border-t">
            <div className="py-1">
                <button className="inline-flex rounded-md items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-background-muted focus:outline-none focus:ring-1 focus:ring-offset-1" onClick={toggle}>
                    <FunnelIcon aria-hidden="true" className="h-4 w-4 text-foreground-muted" />
                    Filters
                </button>

                <FilterDrawer toggle={toggle} state={state}>
                    {hasSelectedFilters && (
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([category, values]) =>
                                Array.from(values).map((value) => (
                                    <div
                                        key={`${category}-${value}`}
                                        className="flex items-center text-xs bg-gray-100 rounded-full px-3 py-1"
                                    >
                                        <span className="mr-1 text-gray-700">{value}</span>
                                        <button
                                            onClick={() => removeSingleFilter(category, value)}
                                            className="text-gray-500 hover:text-black"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <Accordion type="single" className="w-full">
                        {filterList.map((item, index) => (
                            <AccordionItem
                                value={item.label}
                                key={index}
                                className="border-none"
                            >
                                <AccordionTrigger className="hover:no-underline font-light tracking-wide text-sm">
                                    {item.label}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {item.list.map((value, idx) => {
                                            const checked = filters[item.label]?.has(value) || false;
                                            return (
                                                <label
                                                    key={idx}
                                                    htmlFor={`${item.label}-${value}`}
                                                    className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer select-none"
                                                >
                                                    <div
                                                        className={`w-4 h-4 rounded border flex items-center justify-center text-white text-[10px] font-bold transition ${checked
                                                            ? "bg-black border-black"
                                                            : "border-gray-400"
                                                            }`}
                                                    >
                                                        {checked && <span>✔</span>}
                                                    </div>
                                                    <span>{value}</span>
                                                    <input
                                                        id={`${item.label}-${value}`}
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => toggleFilter(item.label, value)}
                                                        className="sr-only"
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </FilterDrawer>
            </div>
            <div className="">
                <DropdownMenu
                    options={sortOptions}
                    value={sort}
                    onChange={setSort}
                >
                    <button
                        className="inline-flex rounded-md items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-background-muted focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sort
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </DropdownMenu>
            </div>
        </section>
    )
}

const FilterDrawer = ({ children, state, toggle }: FilterDrawerProps) => {

    return (
        <Drawer state={state} onClose={toggle} direction="right" isCart >
            <div className="flex flex-col h-full w-full bg-background">
                <div className="flex items-center px-4 py-3 border-b justify-between">
                    <FilterIcon />
                    <h2 className="ml-2">Filter & Sort</h2>
                    <button className="p-2 hover:bg-accent rounded-full" onClick={toggle}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}

type FilterDrawerProps = {
    state: boolean,
    toggle: () => void,
} & React.PropsWithChildren