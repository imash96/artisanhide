"use client";

import Drawer from "@/layout/home/components/drawer";
import { useToggleState } from "@lib/hook/use-toggle-state";
import { FilterIcon, FunnelIcon, X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "./custom-accordion";
import { filterList } from "@/JSON/filter";
import { useFilter } from "@lib/hook/use-filter";

export default function SortFilter({ totalProduct }: { totalProduct: number }) {
    const { state: drawerOpen, toggle: toggleDrawer } = useToggleState();
    const {
        filters,
        sort,
        toggleFilter,
        clearFilters,
        removeSingleFilter,
        changeSort,
        hasSelectedFilters,
        totalActiveFilters,
        isPending,
    } = useFilter();

    // maps for friendly labels (param key -> display label)
    const categoryLabelMap = useMemo(() => {
        const m: Record<string, string> = {};
        filterList.forEach((f) => (m[f.value] = f.label));
        return m;
    }, []);

    // display filter chips (only for non-sort params)
    const filterChips = useMemo(() => {
        if (!hasSelectedFilters) return null;

        // sort is single param stored in `sort`, not in `filters` map
        const chipNodes: React.ReactNode[] = [];

        Object.entries(filters).forEach(([paramKey, valueSet]) => {
            // skip if empty set
            if (!valueSet || valueSet.size === 0) return;
            const labelForCategory = categoryLabelMap[paramKey] || paramKey;
            Array.from(valueSet).forEach((optValue) => {
                // find display label for the option
                const category = filterList.find((f) => f.value === paramKey);
                const optLabel =
                    category?.options.find((o) => o.value === optValue)?.label ?? optValue;
                chipNodes.push(
                    <FilterChip
                        key={`${paramKey}-${optValue}`}
                        category={paramKey}
                        categoryLabel={labelForCategory}
                        value={optValue}
                        display={optLabel}
                        onRemove={removeSingleFilter}
                    />
                );
            });
        });

        return (
            <div className="flex flex-wrap gap-2 p-4 rounded-lg bg-surface-elevated">
                <div className="flex items-center gap-2 w-full mb-2">
                    <span className="text-sm font-medium">Active filters:</span>
                    <button
                        onClick={clearFilters}
                        className="text-xs font-medium underline underline-offset-2"
                    >
                        Clear all ({totalActiveFilters})
                    </button>
                </div>
                {chipNodes}
            </div>
        );
    }, [filters, hasSelectedFilters, totalActiveFilters, clearFilters, removeSingleFilter, categoryLabelMap]);

    return (
        <section className="border-b border-t border-border">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="text-sm font-light">Total {totalProduct} Products</div>

                <button
                    onClick={toggleDrawer}
                    disabled={isPending}
                    className="relative inline-flex rounded-md items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-muted focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Open filters"
                >
                    <FunnelIcon className="h-4 w-4" />
                    <span>Filters</span>
                    {totalActiveFilters > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {totalActiveFilters}
                        </span>
                    )}
                </button>
            </div>

            <FilterDrawer state={drawerOpen} toggle={toggleDrawer}>
                {filterChips}
                <div className="flex-1 px-4 my-4">
                    <Accordion type="single" collapsible className="w-full space-y-2 border-t-0">
                        {filterList.map((item) => {
                            const categoryValues = filters[item.value] || new Set<string>();
                            const hasActive = categoryValues.size > 0;
                            return (
                                <AccordionItem
                                    value={item.value}
                                    key={item.value}
                                    className={`border rounded-lg ${hasActive ? "border-accent/80 bg-accent/5" : "border-border"}`}
                                >
                                    <AccordionTrigger className="hover:no-underline font-medium text-sm px-4 py-3">
                                        <div className="flex items-center justify-between w-full">
                                            <span>{item.label}</span>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-4 pb-4">
                                        <fieldset className="space-y-1 max-h-64 overflow-y-auto">
                                            {item.options.map((opt) => {
                                                // For Sort (single select) use radios, otherwise checkboxes
                                                const isSort = item.value === "sort";
                                                const checked = isSort ? sort === opt.value : categoryValues.has(opt.value);

                                                // handler selects appropriate action
                                                const onChange = isSort
                                                    ? () => changeSort(opt.value)
                                                    : () => toggleFilter(item.value, opt.value);

                                                return (
                                                    <FilterOption
                                                        key={`${item.value}-${opt.value}`}
                                                        id={`${item.value}-${opt.value}`}
                                                        label={opt.label}
                                                        checked={checked}
                                                        inputType={isSort ? "radio" : "checkbox"}
                                                        onChange={onChange}
                                                        name={item.value}
                                                    />
                                                );
                                            })}
                                        </fieldset>
                                    </AccordionContent>
                                </AccordionItem>
                            );
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
                <div className="flex items-center px-4 py-3 border-b justify-between">
                    <div className="flex items-center gap-2">
                        <FilterIcon className="h-5 w-5" />
                        <h2 className="ml-2 text-lg font-semibold">Filter & Sort</h2>
                    </div>
                    <button onClick={toggle} className="ml-auto p-2 hover:bg-accent rounded-full" aria-label="Close filter menu">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="px-4 py-3 space-y-3">{children}</div>
            </div>
        </Drawer>
    );
}

type FilterDrawerProps = {
    state: boolean;
    toggle: () => void;
} & React.PropsWithChildren;

type FilterOptionProps = {
    id: string;
    name: string;
    label: string;
    checked: boolean;
    inputType: "radio" | "checkbox";
    onChange: () => void;
};

function FilterOption({ id, name, label, checked, inputType, onChange }: FilterOptionProps) {
    // accessible label container
    return (
        <label htmlFor={id} className="group flex items-center justify-between gap-2 text-sm cursor-pointer select-none p-2 rounded-md hover:bg-surface-elevated">
            <div className="flex items-center gap-2">
                <div
                    aria-hidden
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${checked ? "bg-accent border-accent shadow-sm text-on-accent" : "border-muted group-hover:border-accent"}`}
                >
                    {checked && <span className="animate-in zoom-in-50 duration-150">✔</span>}
                </div>
                <span className="font-medium">{label}</span>
            </div>

            <input
                id={id}
                name={name}
                type={inputType}
                checked={checked}
                onChange={onChange}
                className="sr-only"
                aria-checked={checked}
            />
        </label>
    );
};

type FilterChipProps = {
    category: string;
    categoryLabel: string;
    value: string;
    display: string;
    onRemove: (category: string, value: string) => void;
};

const FilterChip = ({ category, categoryLabel, value, display, onRemove }: FilterChipProps) => {
    const handleRemove = useCallback(() => onRemove(category, value), [category, value, onRemove]);
    return (
        <div className="flex items-center text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            <span className="mr-1 font-medium">{display}</span>
            <button onClick={handleRemove} className="hover:text-destructive p-0.5 rounded-full" aria-label={`Remove ${display} filter`}>
                <X size={12} />
            </button>
        </div>
    );
};