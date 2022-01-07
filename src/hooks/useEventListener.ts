import { DependencyList, useEffect } from "react";

export type IHandleEvent = EventListener & ((e: EventModifierInit) => void);

interface IUseEventListener {
  keyType: keyof WindowEventMap;
  handleEvent: IHandleEvent;
  dependencies?: DependencyList;
  target?: HTMLElement | Window;
  options?: boolean | AddEventListenerOptions;
}

export function useEventListener({
  keyType,
  handleEvent,
  target = window,
  dependencies,
  options,
}: IUseEventListener): void {
  useEffect(() => {
    target.addEventListener(keyType, handleEvent, options);

    return () => target.removeEventListener(keyType, handleEvent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);
}
