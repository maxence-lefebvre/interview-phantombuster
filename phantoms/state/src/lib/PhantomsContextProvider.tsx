import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { useLocalStorageState } from '@phantombuster/ext/react/hooks';
import { IPhantom, zPhantom } from '@phantombuster/phantoms/types';

import { PhantomsContext } from './phantoms.context';

const LOCAL_STORAGE_KEY = 'phantombuster::phantoms-map';

export const PhantomsContextProvider = memo(function PhantomsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [shouldInit, setShouldInit] = useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_KEY) === null,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [phantoms, setPhantoms, resetPhantoms] = useLocalStorageState<
    Record<string, IPhantom>
  >(
    LOCAL_STORAGE_KEY,
    {},
    {
      zSchema: z.record(z.string(), zPhantom),
    },
  );

  const renamePhantom = useCallback(
    (id: string, newName: string) => {
      setPhantoms((prevPhantoms) => ({
        ...prevPhantoms,
        [id]: {
          ...prevPhantoms[id],
          name: newName,
        },
      }));
    },
    [setPhantoms],
  );

  const duplicatePhantom = useCallback(
    (id: string) => {
      setPhantoms((prevPhantoms) => {
        const newId = uuid();
        return {
          ...prevPhantoms,
          [newId]: {
            ...prevPhantoms[id],
            id: newId,
          },
        };
      });
    },
    [setPhantoms],
  );

  const deletePhantom = useCallback(
    (id: string) => {
      setPhantoms((prevPhantoms) => {
        const { [id]: _, ...rest } = prevPhantoms;
        return rest;
      });
    },
    [setPhantoms],
  );

  const resetPhantomsProxy = useCallback(() => {
    resetPhantoms();
    setShouldInit(true);
  }, [resetPhantoms]);

  // Fetch phantoms from server
  useEffect(() => {
    if (!shouldInit) {
      return;
    }

    const abortController = new AbortController();

    setIsLoading(true);

    fetch('/api/phantoms', { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => z.object({ phantoms: zPhantom.array() }).parse(data))
      .then((data) => data.phantoms)
      .then((phantoms) => {
        // keyBy id
        const phantomsMap = phantoms.reduce<Record<string, IPhantom>>(
          (acc, phantom) => {
            acc[phantom.id] = phantom;
            return acc;
          },
          {},
        );

        setPhantoms(phantomsMap);
        setShouldInit(false);
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          throw error;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => abortController.abort();
  }, [shouldInit, setPhantoms]);

  const context = useMemo(
    () => ({
      phantoms,
      renamePhantom,
      duplicatePhantom,
      deletePhantom,
      resetPhantoms: resetPhantomsProxy,
      isLoading,
    }),
    [
      phantoms,
      renamePhantom,
      duplicatePhantom,
      deletePhantom,
      resetPhantomsProxy,
      isLoading,
    ],
  );

  return (
    <PhantomsContext.Provider value={context}>
      {children}
    </PhantomsContext.Provider>
  );
});
