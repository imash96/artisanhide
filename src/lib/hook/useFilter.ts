"use client";

import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterState {
  filters: Record<string, Set<string>>;
  page: number;
  sort: string;
}

export const useFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Use ref to avoid unnecessary re-renders during URL updates
  const isUpdatingRef = useRef(false);

  // Parse initial state from URL
  const initialState = useMemo((): FilterState => {
    const filters: Record<string, Set<string>> = {};
    let page = 1;
    let sort = "newest";

    // Group multiple values for same key
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

  // Debounced URL update to prevent excessive navigation
  const updateURLDebounced = useCallback((newState: Partial<FilterState>) => {
    if (isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    startTransition(() => {
      const params = new URLSearchParams();

      const finalState = { ...state, ...newState };

      // Add filters
      Object.entries(finalState.filters).forEach(([category, values]) => {
        if (values.size > 0) values.forEach((value) => params.append(category, value));
      });

      // Add pagination
      if (finalState.page > 1) params.set("page", finalState.page.toString());

      // Add sort
      if (finalState.sort && finalState.sort !== "newest") params.set("sort", finalState.sort);

      const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;

      router.replace(newURL, { scroll: false });

      // Reset the updating flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    });
  }, [router, state]);

  // Optimized toggle filter with batch updates
  const toggleFilter = useCallback((category: string, value: string) => {
    setState(prevState => {
      const currentValues = prevState.filters[category] || new Set();
      const newValues = new Set(currentValues);

      if (newValues.has(value)) newValues.delete(value);
      else newValues.add(value);


      const newFilters = { ...prevState.filters };
      if (newValues.size === 0) delete newFilters[category];
      else newFilters[category] = newValues;


      const newState = {
        ...prevState,
        filters: newFilters,
        page: 1 // Reset to page 1 when filters change
      };

      // Update URL
      updateURLDebounced(newState);

      return newState;
    });
  }, [updateURLDebounced]);

  // Optimized clear all filters
  const clearFilters = useCallback(() => {
    const newState = {
      ...state,
      filters: {},
      page: 1
    };

    setState(newState);
    updateURLDebounced(newState);
  }, [state, updateURLDebounced]);

  // Optimized remove single filter
  const removeSingleFilter = useCallback((category: string, value: string) => {
    setState(prevState => {
      const currentValues = prevState.filters[category];
      if (!currentValues || !currentValues.has(value)) return prevState; // No change needed

      const newValues = new Set(currentValues);
      newValues.delete(value);

      const newFilters = { ...prevState.filters };
      if (newValues.size === 0) delete newFilters[category];
      else newFilters[category] = newValues;

      const newState = {
        ...prevState,
        filters: newFilters,
        page: 1
      };

      updateURLDebounced(newState);

      return newState;
    });
  }, [updateURLDebounced]);

  // Handle page change
  const changePage = useCallback((newPage: number) => {
    if (newPage === state.page || newPage < 1) return;

    const newState = {
      ...state,
      page: newPage
    };

    setState(newState);
    updateURLDebounced(newState);
  }, [state, updateURLDebounced]);

  // Handle sort change
  const changeSort = useCallback((newSort: string) => {
    if (newSort === state.sort) return;

    const newState = {
      ...state,
      sort: newSort,
      page: 1 // Reset to page 1 when sort changes
    };

    setState(newState);
    updateURLDebounced(newState);
  }, [state, updateURLDebounced]);

  // Batch filter updates
  const batchUpdateFilters = useCallback((updates: Record<string, string[]>) => {
    setState(prevState => {
      const newFilters = { ...prevState.filters };

      Object.entries(updates).forEach(([category, values]) => {
        if (values.length === 0) delete newFilters[category];
        else newFilters[category] = new Set(values);
      });

      const newState = {
        ...prevState,
        filters: newFilters,
        page: 1
      };

      updateURLDebounced(newState);

      return newState;
    });
  }, [updateURLDebounced]);

  // Computed properties with memoization
  const hasSelectedFilters = useMemo(() => {
    return Object.values(state.filters).some(set => set.size > 0);
  }, [state.filters]);

  const totalActiveFilters = useMemo(() => {
    return Object.values(state.filters).reduce((sum, set) => sum + set.size, 0);
  }, [state.filters]);

  const activeFiltersByCategory = useMemo(() => {
    return Object.fromEntries(
      Object.entries(state.filters).map(([key, values]) => [key, Array.from(values)])
    );
  }, [state.filters]);

  return {
    // State
    filters: state.filters,
    page: state.page,
    sort: state.sort,
    isPending,

    // Actions
    toggleFilter,
    clearFilters,
    removeSingleFilter,
    changePage,
    changeSort,
    batchUpdateFilters,

    // Computed
    hasSelectedFilters,
    totalActiveFilters,
    activeFiltersByCategory,
  };
};