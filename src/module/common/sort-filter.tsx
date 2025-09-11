"use client"

import Drawer from "@/layout/home/components/drawer"
import { useToggleState } from "@lib/hook/use-toggle-state"
import { FilterIcon, FunnelIcon, X } from "lucide-react"
import { useCallback, useMemo } from "react"
import { useFilter } from "@lib/hook/useFilter"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./custom-accordion"
import { filterList } from "@/JSON/filter"

export default function SortFilter() {
    const { state: drawerOpen, toggle: toggleDrawer } = useToggleState();
    const { filters, sort, toggleFilter, clearFilters, removeSingleFilter, changeSort, hasSelectedFilters, totalActiveFilters, isPending } = useFilter();

    const filterChips = useMemo(() => {
        if (!hasSelectedFilters) return null;

        return (
            <div className="flex flex-wrap gap-2 p-4 bg-background-elevated rounded-lg">
                <div className="flex items-center gap-2 w-full mb-2">
                    <span className="text-sm font-medium">Active filters:</span>
                    <button onClick={clearFilters} className="text-xs text-link font-medium cursor-pointer" >
                        Clear all ({totalActiveFilters})
                    </button>
                </div>
                {Object.entries(filters).map(([category, values]) =>
                    Array.from(values).map((value) => (
                        <FilterChip
                            key={`${category}-${value}`}
                            category={category}
                            value={value}
                            onRemove={removeSingleFilter}
                        />
                    ))
                )}
            </div>
        );
    }, [filters, hasSelectedFilters, totalActiveFilters, clearFilters, removeSingleFilter]);

    return (
        <section className="border-b border-t border-border">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="text-sm font-light">Total 20 Products</div>
                {/* Filter Button */}
                <button
                    onClick={toggleDrawer}
                    disabled={isPending}
                    className="relative inline-flex rounded-md items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-background-muted focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FunnelIcon className="h-4 w-4" />
                    <span>Filters</span>
                    {totalActiveFilters > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {totalActiveFilters}
                        </span>
                    )}
                </button>

                {/* <div className="flex items-center gap-2">
                    <DropdownMenu
                        options={sortOptions}
                        value={sort}
                        onChange={changeSort}
                    >
                        <button
                            disabled={isPending}
                            className="inline-flex rounded-md items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-background-muted focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sort
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </DropdownMenu>
                </div> */}
            </div>

            {/* Filter Drawer */}
            <FilterDrawer state={drawerOpen} toggle={toggleDrawer}>
                {filterChips}
                <div className="flex-1 px-4 my-4 ">
                    <Accordion type="single" collapsible className="w-full space-y-2 border-t-0">
                        {filterList.map((item, index) => {
                            const categoryFilters = filters[item.label] || new Set();
                            const hasActiveFilters = categoryFilters.size > 0;

                            return (
                                <AccordionItem value={item.label} key={index} className={`border rounded-lg ${hasActiveFilters ? 'border-link bg-secondary/10' : 'border-border'}`}>
                                    <AccordionTrigger className="hover:no-underline font-medium text-sm px-4 py-3">
                                        <div className="flex items-center justify-between w-full">
                                            <span>{item.label}</span>
                                            {/* {hasActiveFilters && (
                                                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                                                    {categoryFilters.size}
                                                </span>
                                            )} */}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="space-y-1 max-h-64 overflow-y-auto">
                                            {item.list.map((value, idx) => {
                                                const checked = categoryFilters.has(value);
                                                return (
                                                    <FilterOption
                                                        key={idx}
                                                        category={item.label}
                                                        value={value}
                                                        checked={checked}
                                                        onToggle={toggleFilter}
                                                    // You can add count prop here if you have product counts
                                                    // count={getProductCount(item.label, value)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </FilterDrawer>
        </section>
    );
}

function FilterDrawer({ children, state, toggle }: FilterDrawerProps) {
    return (
        <Drawer state={state} onClose={toggle} direction="right" isCart>
            <div className="flex flex-col h-full w-full bg-background">
                {/* Header */}
                <div className="flex items-center px-4 py-3 border-b justify-between">
                    <FilterIcon className="h-5 w-5" />
                    <h2 className="ml-2">Filter & Sort</h2>
                    <button onClick={toggle} className="ml-auto p-2 hover:bg-accent rounded-full" aria-label="Close filter menu">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </Drawer>
    );
};

function FilterOption({ category, value, checked, onToggle }: FilterOptionProps) {
    const handleToggle = useCallback(() => {
        onToggle(category, value);
    }, [category, value, onToggle]);

    return (
        <label htmlFor={`${category}-${value}`} className="group flex items-center justify-between gap-2 text-sm cursor-pointer select-none p-2 rounded-md hover:bg-background-elevated" >
            <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border flex items-center justify-center text-accent-foreground text-[10px] font-bold ${checked ? "bg-accent border-accent shadow-sm" : "border-accent group-hover:border-accent"}`} >
                    {checked && <span className="animate-in zoom-in-50 duration-150">✔</span>}
                </div>
                <span className="font-medium">{value}</span>
            </div>
            {/* {count !== undefined && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {count}
                </span>
            )} */}
            <input
                id={`${category}-${value}`}
                type="checkbox"
                checked={checked}
                onChange={handleToggle}
                className="sr-only"
            />
        </label>
    );
};

const FilterChip = ({ category, value, onRemove }: FilterChipProps) => {
    const handleRemove = useCallback(() => {
        onRemove(category, value);
    }, [category, value, onRemove]);

    return (
        <div className="flex items-center text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            <span className="mr-1 font-medium">{value}</span>
            <button
                onClick={handleRemove}
                className="hover:text-destructive p-0.5 rounded-full"
                aria-label={`Remove ${value} filter`}
            >
                <X size={12} />
            </button>
        </div>
    );
};

type FilterDrawerProps = {
    state: boolean;
    toggle: () => void;
} & React.PropsWithChildren

type FilterOptionProps = {
    category: string;
    value: string;
    checked: boolean;
    onToggle: (category: string, value: string) => void;
    // count?: number;
}

type FilterChipProps = {
    category: string;
    value: string;
    onRemove: (category: string, value: string) => void;
}