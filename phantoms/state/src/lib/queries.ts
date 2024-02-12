import { useMemo } from 'react';

import { useNonNullableContext } from '@phantombuster/ext/react/hooks';

import { PhantomsContext } from './phantoms.context';

export const usePhantoms = () => {
  const { phantoms, isLoading } = useNonNullableContext(PhantomsContext);
  const values = useMemo(() => Object.values(phantoms), [phantoms]);

  return { data: values, isLoading };
};

export const usePhantom = (id: string) => {
  const { phantoms, isLoading } = useNonNullableContext(PhantomsContext);

  return { data: phantoms[id], isLoading };
};

export const usePhantomCategories = () => {
  const { data: phantoms, isLoading } = usePhantoms();

  const categories = useMemo(
    () =>
      phantoms.reduce((acc, phantom) => {
        phantom.manifest.tags.categories.forEach((category) => {
          acc.add(category);
        });

        return acc;
      }, new Set<string>()),
    [phantoms],
  );

  return { data: categories, isLoading };
};

export const useIsFetchingPhantoms = () => {
  const { isLoading } = useNonNullableContext(PhantomsContext);

  return isLoading;
};

export const useRenamePhantomMutation = () => {
  const { renamePhantom } = useNonNullableContext(PhantomsContext);

  return {
    mutate: renamePhantom,
  };
};

export const useDuplicatePhantomMutation = () => {
  const { duplicatePhantom } = useNonNullableContext(PhantomsContext);

  return {
    mutate: duplicatePhantom,
  };
};

export const useDeletePhantomMutation = () => {
  const { deletePhantom } = useNonNullableContext(PhantomsContext);

  return {
    mutate: deletePhantom,
  };
};
