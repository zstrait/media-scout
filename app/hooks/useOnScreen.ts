import { useEffect, useState, useRef } from 'react';

export function useOnScreen() {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentElement = elementRef.current;
        if (!currentElement) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        observer.observe(currentElement);

        return () => observer.disconnect();
    }, []);

    return { elementRef, isVisible };
}