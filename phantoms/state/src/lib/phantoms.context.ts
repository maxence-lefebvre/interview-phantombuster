import { createContext } from 'react';

import { IPhantom } from '@phantombuster/phantoms/types';

export type PhantomsContext = {
  phantoms: Record<string, IPhantom>;
  renamePhantom: (id: string, newName: string) => void;
  duplicatePhantom: (id: string) => void;
  deletePhantom: (id: string) => void;
  resetPhantoms: () => void;
  isLoading: boolean;
};

export const PhantomsContext = createContext<PhantomsContext | null>(null);
