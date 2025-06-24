import { useCallback } from 'react';

export function useRipple() {
    return useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');

        const rect = button.getBoundingClientRect();
        const size = Math.max(button.clientWidth, button.clientHeight);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.className = 'ripple';
        Object.assign(ripple.style, {
            top: `${y}px`,
            left: `${x}px`,
            width: `${size}px`,
            height: `${size}px`,
        });

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 500);
    }, []);
}
