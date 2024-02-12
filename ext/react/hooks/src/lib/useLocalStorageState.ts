import { useCallback, useState } from 'react';
import { ZodSchema } from 'zod';

export type UseLocalStorageStateProps<TState> = {
  zSchema: ZodSchema<TState>;
  serialize?: (state: TState) => string;
  deserialize?: (state: string) => TState;
};

export const useLocalStorageState = <TState>(
  key: string,
  initialState: TState,
  {
    zSchema,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseLocalStorageStateProps<TState>,
) => {
  const [state, setState] = useState<TState>(() => {
    const value = localStorage.getItem(key);

    return value !== null ? zSchema.parse(deserialize(value)) : initialState;
  });

  const setLocalStorageState = useCallback(
    (newState: TState | ((prevState: TState) => TState)) => {
      const nextState =
        typeof newState === 'function'
          ? (newState as (prevState: TState) => TState)(state)
          : newState;

      setState(nextState);
      localStorage.setItem(key, serialize(nextState));
    },
    [key, serialize, state],
  );

  const resetLocalStorageState = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return [state, setLocalStorageState, resetLocalStorageState] as const;
};
