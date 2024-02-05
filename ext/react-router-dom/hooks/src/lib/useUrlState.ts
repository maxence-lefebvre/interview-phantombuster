import { parse, stringify } from 'qs';
import { useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type TUrlState = string | undefined | null;

export type UseUrlStateOptions = {
  navigateMode?: 'push' | 'replace';
};

export const useUrlState = (
  key: string,
  defaultValue?: TUrlState | (() => TUrlState),
  { navigateMode = 'push' }: UseUrlStateOptions = {},
): [
  TUrlState,
  (newValue: TUrlState | ((prev: TUrlState) => TUrlState)) => void,
] => {
  const { search, hash, state: locationState } = useLocation();
  const navigate = useNavigate();

  const initialStateRef = useRef(
    typeof defaultValue === 'function' ? defaultValue() : defaultValue,
  );

  const parsedQs = useMemo(
    () => parse(search, { ignoreQueryPrefix: true }),
    [search],
  );

  const urlState = useMemo(
    () => ({
      [key]: initialStateRef.current,
      ...parsedQs,
    }),
    [key, parsedQs],
  );

  const setState = useCallback(
    (newValue: TUrlState | ((prev: TUrlState) => TUrlState)) => {
      const newUrlState = {
        ...urlState,
        [key]:
          (typeof newValue === 'function'
            ? newValue(urlState[key] as TUrlState)
            : newValue) ?? undefined,
      };

      navigate(
        {
          hash,
          search: stringify(newUrlState),
        },
        {
          replace: navigateMode === 'replace',
          state: locationState,
        },
      );
    },
    [navigate, navigateMode, hash, locationState, key, urlState],
  );

  return [urlState[key] as TUrlState, setState];
};
