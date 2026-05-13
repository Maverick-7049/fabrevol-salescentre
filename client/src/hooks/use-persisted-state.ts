import { useState, useEffect, useRef } from "react";

/**
 * Exactly like useState, but the value survives page navigation and refreshes
 * via localStorage. On first mount the stored value is restored; on every
 * change it is written back.
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Skip the very first write so we never overwrite a freshly-read value
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage quota exceeded or private browsing — silently ignore
    }
  }, [key, state]);

  return [state, setState];
}
