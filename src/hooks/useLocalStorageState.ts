import { useState } from "react";

function getStoredState<T>(name: string): Partial<T> {
  const dataStr = localStorage.getItem(name);

  if (dataStr) {
    try {
      return JSON.parse(dataStr);
    } catch {
      return {};
    }
  }

  return {};
}

export function useLocalStorageState<T extends Record<string, any>>(
  name: string,
  initialState: T
) {
  const combinedState = {
    ...initialState,
    ...getStoredState<T>(name),
  };

  const [state, setRawState] = useState<T>({
    ...combinedState,
    tabNames: initialState.tabNames,
    data: {
      ...initialState.data,
      ...combinedState.data,
      tabs: initialState.data.tabs,
    },
  });

  return {
    state,
    setState: (newState: T) => {
      localStorage.setItem(name, JSON.stringify(newState));
      setRawState(newState);
    },
  };
}
