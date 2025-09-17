"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";

interface FilterState {
    filters: Record<string, Set<string>>;
    page: number;
    sort: string;
}

export const useFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // A tiny ref/timeout to coalesce repeated URL updates
    const pendingReplaceRef = useRef<number | null>(null);

    // parse initial state from URL search params
    const initialState = useMemo((): FilterState => {
        const filters: Record<string, Set<string>> = {};
        let page = 1;
        let sort = "newest";

        const paramGroups: Record<string, string[]> = {};

        searchParams.forEach((value, key) => {
            if (!paramGroups[key]) paramGroups[key] = [];
            paramGroups[key].push(value);
        });

        Object.entries(paramGroups).forEach(([key, values]) => {
            if (key === "page") {
                page = Math.max(1, parseInt(values[0], 10) || 1);
            } else if (key === "sort") {
                sort = values[0] || "newest";
            } else {
                filters[key] = new Set(values);
            }
        });

        return { filters, page, sort };
    }, [searchParams]);

    const [state, setState] = useState<FilterState>(initialState);

    // Helper: schedule router.replace AFTER render (defers to microtask), coalesced via setTimeout
    const scheduleReplace = useCallback((qs: string) => {
        // clear previous if any
        if (pendingReplaceRef.current) {
            clearTimeout(pendingReplaceRef.current);
            pendingReplaceRef.current = null;
        }

        // small debounce to coalesce many rapid updates (50ms)
        pendingReplaceRef.current = window.setTimeout(() => {
            // defer actual router.replace to microtask (ensures not during render)
            Promise.resolve().then(() => {
                try {
                    const href = qs ? `?${qs}` : window.location.pathname;
                    router.replace(href as Route, { scroll: false });
                } catch (e) {
                    // swallow (safety) — in practice router.replace should work in client hooks
                    // console.warn("router.replace failed", e);
                }
            });
            pendingReplaceRef.current = null;
        }, 50);
    }, [router]);

    const updateURLFromState = useCallback((nextState: FilterState) => {
        const params = new URLSearchParams();

        // Add filters
        Object.entries(nextState.filters).forEach(([category, values]) => {
            if (!values || values.size === 0) return;
            values.forEach((v) => params.append(category, v));
        });

        // Add page only if > 1
        if (nextState.page > 1) params.set("page", String(nextState.page));

        // Add sort if not default to keep URLs tidy
        if (nextState.sort && nextState.sort !== "newest") params.set("sort", nextState.sort);

        const qs = params.toString();
        scheduleReplace(qs);
    }, [scheduleReplace]);

    // toggle multi-select filters
    const toggleFilter = useCallback((category: string, value: string) => {
        setState((prev) => {
            const current = prev.filters[category] ?? new Set<string>();
            const nextSet = new Set(current);

            if (nextSet.has(value)) nextSet.delete(value);
            else nextSet.add(value);

            const nextFilters = { ...prev.filters };
            if (nextSet.size === 0) delete nextFilters[category];
            else nextFilters[category] = nextSet;

            const nextState: FilterState = { ...prev, filters: nextFilters, page: 1 };
            updateURLFromState(nextState);
            return nextState;
        });
    }, [updateURLFromState]);

    const clearFilters = useCallback(() => {
        setState((prev) => {
            const nextState: FilterState = { ...prev, filters: {}, page: 1 };
            updateURLFromState(nextState);
            return nextState;
        });
    }, [updateURLFromState]);

    const removeSingleFilter = useCallback((category: string, value: string) => {
        setState((prev) => {
            const current = prev.filters[category];
            if (!current || !current.has(value)) return prev;

            const nextSet = new Set(current);
            nextSet.delete(value);

            const nextFilters = { ...prev.filters };
            if (nextSet.size === 0) delete nextFilters[category];
            else nextFilters[category] = nextSet;

            const nextState: FilterState = { ...prev, filters: nextFilters, page: 1 };
            updateURLFromState(nextState);
            return nextState;
        });
    }, [updateURLFromState]);

    const changePage = useCallback((page: number) => {
        setState((prev) => {
            if (page === prev.page || page < 1) return prev;
            const nextState: FilterState = { ...prev, page };
            updateURLFromState(nextState);
            return nextState;
        });
    }, [updateURLFromState]);

    const changeSort = useCallback((newSort: string) => {
        setState((prev) => {
            if (newSort === prev.sort) return prev;
            const nextState: FilterState = { ...prev, sort: newSort, page: 1 };
            updateURLFromState(nextState);
            return nextState;
        });
    }, [updateURLFromState]);

    const batchUpdateFilters = useCallback((updates: Record<string, string[]>) => {
        setState((prev) => {
            const nextFilters: Record<string, Set<string>> = { ...prev.filters };
            Object.entries(updates).forEach(([k, vals]) => {
                if (!vals || vals.length === 0) delete nextFilters[k];
                else nextFilters[k] = new Set(vals);
            });
            const nextState: FilterState = { ...prev, filters: nextFilters, page: 1 };
            updateURLFromState(nextState);
            return nextState;
        });
    }, [updateURLFromState]);

    const hasSelectedFilters = useMemo(() => {
        return Object.values(state.filters).some((s) => s.size > 0);
    }, [state.filters]);

    const totalActiveFilters = useMemo(() => {
        return Object.values(state.filters).reduce((acc, s) => acc + s.size, 0);
    }, [state.filters]);

    const activeFiltersByCategory = useMemo(() => {
        return Object.fromEntries(Object.entries(state.filters).map(([k, v]) => [k, Array.from(v)]));
    }, [state.filters]);

    // NOTE: we removed useTransition to avoid calling startTransition during render.
    // If you want to show a loading state during router navigation, we can implement
    // a small boolean that toggles true before scheduling router.replace and false after,
    // but do it outside of render (e.g., in the scheduled callback).
    const isPending = false;

    return {
        // state
        filters: state.filters,
        page: state.page,
        sort: state.sort,
        isPending,

        // actions
        toggleFilter,
        clearFilters,
        removeSingleFilter,
        changePage,
        changeSort,
        batchUpdateFilters,

        // computed
        hasSelectedFilters,
        totalActiveFilters,
        activeFiltersByCategory,
    };
};
