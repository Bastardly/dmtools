import { useCallback, useState } from "react";

export function useIsActive(initialValue: boolean) {
  const [isActive, setIsActive] = useState<boolean>(initialValue || false);
  const setActive = useCallback(() => setIsActive(true), []);
  const setInactive = useCallback(() => setIsActive(false), []);
  const toggleIsActive = useCallback(() => setIsActive(!isActive), [isActive]);

  return { isActive, setActive, setInactive, toggleIsActive };
}
