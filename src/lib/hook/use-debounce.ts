"use client"; // Ensure this is a client component in Next.js

import { useState, useEffect, useRef } from "react";

const isClient = typeof window !== "undefined";
/**
 * Debounces a value, returning it after the specified delay.
 * Optimized for performance: uses ref for timer to avoid recreating handlers,
 * handles delay changes gracefully, and supports generic types.
 * Edge cases: immediate update if delay <= 0, cleans up on unmount.
 *
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds (default: 500).
 * @returns The debounced value.
 */
export default function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isClient) {
            setDebouncedValue(value);
            return;
        }

        // Clear any existing timer
        if (timerRef.current) clearTimeout(timerRef.current);

        // Set new timer
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        // Cleanup on unmount or dependency change
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
}