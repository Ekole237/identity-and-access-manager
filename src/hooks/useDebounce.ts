import { useEffect, useState } from "react";

/**
 * Hook pour débouncer une valeur
 * @param value La valeur à débouncer
 * @param delay Le délai en ms
 * @returns La valeur après le délai
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
