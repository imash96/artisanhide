// utils/debounce.ts

/**
 * Creates a debounced function that delays invoking the provided function until after
 * the specified wait time has elapsed since the last time the debounced function was invoked.
 * 
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param immediate Optional: Trigger the function on the leading edge instead of the trailing.
 * @returns The debounced function.
 */
export default function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate: boolean = false): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(this, args);
            }
        };

        const callNow = immediate && !timeout;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(this, args);
        }
    };
}