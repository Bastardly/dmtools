import {  useRef } from "react";
import { useEventListener, IHandleEvent } from "./useEventListener";

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const inputRef = useRef<T>(null);
  const handleEvent = ({ target }: { target: T }) => {
    const refElement = inputRef.current;

    if (refElement && !refElement.contains(target as T)) {
      callback();
    }
  };

  useEventListener({
    keyType: "mousedown",
    handleEvent: handleEvent as IHandleEvent,
  });

  return inputRef;
}
