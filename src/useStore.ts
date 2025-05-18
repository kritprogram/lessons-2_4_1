import { useState } from "react";

export function useStore<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  return {
    getState: () => state,
    updateState: <K extends keyof T>(fieldName: K, newValue: T[K]) => {
      setState({
        ...state,
        [fieldName]: newValue,
      });
    },
  };
}
